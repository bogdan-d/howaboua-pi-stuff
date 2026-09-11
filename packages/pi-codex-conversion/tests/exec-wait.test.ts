import assert from "node:assert/strict";
import test from "node:test";
import { createExecSessionManager } from "../src/tools/exec/session-manager.ts";
import { formatUnifiedExecResult } from "../src/tools/exec/format.ts";
import { boundRuntimeToolResult } from "../src/tools/code-mode/trace-values.ts";
import { makeExecResult } from "../src/tools/exec/results.ts";
import { OUTPUT_TRUNCATION_MARKER } from "../src/tools/exec/output.ts";
import { createRetainedOutputStore } from "../src/tools/retained-output.ts";
import { waitForExitOrInactivity, type WaitableSession } from "../src/tools/exec/wait.ts";

function emitOutput(session: WaitableSession): void {
	session.outputVersion += 1;
	for (const listener of session.listeners) listener();
}

function runningSession(): WaitableSession {
	return { exitCode: undefined, outputVersion: 0, listeners: new Set() };
}

function processIsRunning(pid: number): boolean {
	try {
		process.kill(pid, 0);
		return true;
	} catch {
		return false;
	}
}

test("exec waits through output activity but yields on silence or the hard limit", async (t) => {
	t.mock.timers.enable({ apis: ["Date", "setTimeout"] });

	const silent = runningSession();
	const silentWait = waitForExitOrInactivity(silent, 10, 30);
	t.mock.timers.tick(10);
	assert.equal(await silentWait, 10);

	const active = runningSession();
	const activeWait = waitForExitOrInactivity(active, 10, 30);
	for (let elapsed = 9; elapsed <= 27; elapsed += 9) {
		t.mock.timers.tick(9);
		emitOutput(active);
	}
	t.mock.timers.tick(3);
	assert.equal(await activeWait, 30);
});

test("sessions retain paged output through completion and ignore detached inherited stdio", async () => {
	const sessions = createExecSessionManager({
		minNonInteractiveExecYieldTimeMs: 250,
		minEmptyWriteYieldTimeMs: 250,
		maxEmptyWriteYieldTimeMs: 250,
	});
	let childId: number | undefined;
	try {
		const delayed = `${JSON.stringify(process.execPath)} -e ${JSON.stringify("setTimeout(() => {}, 750)")}`;
		const awaited = await sessions.exec(
			{
				cmd: delayed,
				yield_time_ms: 250,
				max_yield_time_ms: 250,
				wait_until_exit: true,
				login: false,
			},
			process.cwd(),
		);
		assert.equal(awaited.exit_code, 0);
		assert.equal(awaited.session_id, undefined);

		const traceOutput = "x".repeat(80_000);
		const traceCompleted = await sessions.exec({
			cmd: `${JSON.stringify(process.execPath)} -e ${JSON.stringify(`process.stdout.write(${JSON.stringify(traceOutput)});process.exit(7)`)}`,
			yield_time_ms: 1_000,
			max_yield_time_ms: 1_000,
			max_output_tokens: 20_000,
			login: false,
		}, process.cwd());
		assert.equal(
			(boundRuntimeToolResult({ content: [], details: traceCompleted }, 0).details as { exit_code?: number }).exit_code,
			7,
		);
		const traceLive = await sessions.exec({
			cmd: `${JSON.stringify(process.execPath)} -e ${JSON.stringify(`process.stdout.write(${JSON.stringify(traceOutput)});setTimeout(() => process.exit(0), 1_000)`)}`,
			yield_time_ms: 250,
			max_yield_time_ms: 250,
			max_output_tokens: 20_000,
			login: false,
		}, process.cwd());
		assert.equal(
			(boundRuntimeToolResult({ content: [], details: traceLive }, 0).details as { session_id?: number }).session_id,
			traceLive.session_id,
		);
		await sessions.write({ session_id: traceLive.session_id!, yield_time_ms: 1_000 });

		const first = `FIRST-SENTINEL\n${"a".repeat(600)}\n`;
		const middle = `${"😀".repeat(300)}\nMIDDLE-SENTINEL\n`;
		const last = "LAST-SENTINEL\n";
		const streamingScript = `process.stdout.write(${JSON.stringify(first)});setTimeout(()=>process.stdout.write(${JSON.stringify(middle)}),450);setTimeout(()=>{process.stdout.write(${JSON.stringify(last)});process.exit(7)},900)`;
		const started = await sessions.exec({
			cmd: `${JSON.stringify(process.execPath)} -e ${JSON.stringify(streamingScript)}`,
			yield_time_ms: 250,
			max_yield_time_ms: 250,
			max_output_tokens: 1,
			login: false,
		}, process.cwd());
		assert.equal(started.session_id !== undefined, true);
		assert.equal(started.output_truncated, true);
		assert.match(formatUnifiedExecResult(started), /write_stdin\(\{ session_id: \d+, output_offset: 0/);
		const sessionId = started.session_id!;
		const middlePoll = await sessions.write({ session_id: sessionId, yield_time_ms: 250, max_output_tokens: 1 });
		let streamCompleted = middlePoll;
		for (let attempt = 0; attempt < 4 && streamCompleted.exit_code === undefined; attempt += 1)
			streamCompleted = await sessions.write({ session_id: sessionId, yield_time_ms: 250, max_output_tokens: 1 });
		assert.equal(streamCompleted.exit_code, 7);
		const firstPage = sessions.readOutput(sessionId, 0, 1);
		assert.equal(firstPage.output_recovery?.complete, true);
		assert.equal(firstPage.output_recovery?.available_bytes, Buffer.byteLength(first + middle + last));
		assert.equal(firstPage.output_recovery?.total_bytes, Buffer.byteLength(first + middle + last));

		let offset = firstPage.output_recovery!.offset;
		let recovered = firstPage.output;
		do {
			const page = await sessions.write({
				session_id: sessionId,
				output_offset: offset,
				max_output_tokens: 1,
			});
			recovered += page.output;
			const next = page.output_recovery?.offset ?? Buffer.byteLength(recovered);
			assert.ok(next > offset || next === firstPage.output_recovery?.available_bytes);
			offset = next;
		} while (offset < firstPage.output_recovery!.available_bytes);
		assert.equal(recovered, first + middle + last);

		const script = "const {spawn}=require('node:child_process');const child=spawn(process.execPath,['-e','setTimeout(()=>{},60000)'],{stdio:'inherit',detached:true});console.log('child-id:'+child.pid);child.unref()";
		const command = `${JSON.stringify(process.execPath)} -e ${JSON.stringify(script)}`;
		const completed = await sessions.exec({ cmd: command, yield_time_ms: 1_500, max_yield_time_ms: 1_500, login: false }, process.cwd());
		childId = Number.parseInt(/child-id:(\d+)/.exec(completed.output)?.[1] ?? "", 10);
		assert.ok(Number.isFinite(childId));
		assert.equal(completed.exit_code, 0);
		assert.equal(completed.session_id, undefined);
		assert.equal(processIsRunning(childId), true);
	} finally {
		await sessions.shutdown();
		if (childId !== undefined && processIsRunning(childId)) process.kill(childId);
	}

	const capped = createExecSessionManager({
		minNonInteractiveExecYieldTimeMs: 250,
		maxRetainedOutputBytes: 1024,
	});
	try {
		const output = "CAP-FIRST\n" + "x".repeat(2_000) + "\nCAP-LAST\n";
		const result = await capped.exec({
			cmd: `${JSON.stringify(process.execPath)} -e ${JSON.stringify(`process.stdout.write(${JSON.stringify(output)});process.exit(9)`)}`,
			yield_time_ms: 1_000,
			max_yield_time_ms: 1_000,
			max_output_tokens: 1,
			login: false,
		}, process.cwd());
		assert.equal(result.exit_code, 9);
		assert.deepEqual(result.output_recovery, {
			session_id: result.output_recovery?.session_id,
			offset: 0,
			available_bytes: 1024,
			total_bytes: Buffer.byteLength(output),
			complete: false,
			reason: "limit",
		});
		await assert.rejects(
			capped.write({ session_id: result.output_recovery!.session_id, output_offset: 1025 }),
			/available only through byte 1024/,
		);
	} finally {
		await capped.shutdown();
	}

	const evicting = createExecSessionManager({
		minNonInteractiveExecYieldTimeMs: 250,
		maxRetainedOutputBytes: 1024,
	});
	try {
		const first = await evicting.exec({
			cmd: `${JSON.stringify(process.execPath)} -e ${JSON.stringify("process.stdout.write('a'.repeat(800))")}`,
			yield_time_ms: 1_000,
			max_yield_time_ms: 1_000,
			max_output_tokens: 1,
			login: false,
		}, process.cwd());
		await evicting.exec({
			cmd: `${JSON.stringify(process.execPath)} -e ${JSON.stringify("process.stdout.write('b'.repeat(800))")}`,
			yield_time_ms: 1_000,
			max_yield_time_ms: 1_000,
			max_output_tokens: 1,
			login: false,
		}, process.cwd());
		const replay = await evicting.write({ session_id: first.output_recovery!.session_id, max_output_tokens: 1 });
		const shownBytes = Buffer.byteLength(replay.output.slice(OUTPUT_TRUNCATION_MARKER.length));
		assert.deepEqual(replay.output_truncation, {
			shown_start_byte: 800 - shownBytes,
			shown_end_byte: 800,
			shown_bytes: shownBytes,
			omitted_bytes: 800 - shownBytes,
		});
		assert.deepEqual(replay.output_recovery, {
			session_id: first.output_recovery!.session_id,
			offset: 0,
			available_bytes: 0,
			total_bytes: 800,
			complete: false,
			reason: "expired",
		});
		await assert.rejects(
			evicting.write({ session_id: first.output_recovery!.session_id, output_offset: 0 }),
			/expired/,
		);
	} finally {
		await evicting.shutdown();
	}

	const store = createRetainedOutputStore({
		prefix: "pi-codex-retention-test-",
		maxEntryBytes: 10,
		maxTotalBytes: 20,
		maxCompletedEntries: 4,
	});
	try {
		store.append("completed", "12345678");
		store.markCompleted("completed");
		store.append("active", "abcdefgh");
		assert.deepEqual(store.append("active", "12345"), {
			availableBytes: 10,
			totalBytes: 13,
			complete: false,
			reason: "limit",
		});
		assert.equal(store.snapshot("completed")?.availableBytes, 8);
	} finally {
		store.clear();
	}

	const literalMarker = makeExecResult({
		id: 1,
		command: "literal",
		exitCode: 0,
		startedAt: 0,
		updatedAt: 0,
		terminating: false,
		buffer: `${OUTPUT_TRUNCATION_MARKER}literal`,
		bufferStartOffset: 0,
		emittedOffset: 0,
	}, 0, 1, () => {}, () => {});
	assert.equal(literalMarker.output_truncated, undefined);
	const clipped = makeExecResult({
		id: 2,
		command: "clipped",
		exitCode: 0,
		startedAt: 0,
		updatedAt: 0,
		terminating: false,
		buffer: "x".repeat(300),
		bufferStartOffset: 0,
		emittedOffset: 0,
	}, 0, 1, () => {}, () => {}, {
		availableBytes: 300,
		totalBytes: 300,
		complete: true,
	});
	assert.equal(clipped.output.startsWith(OUTPUT_TRUNCATION_MARKER), true);
	assert.deepEqual(clipped.output_truncation, {
		shown_start_byte: 300 - Buffer.byteLength(clipped.output.slice(OUTPUT_TRUNCATION_MARKER.length)),
		shown_end_byte: 300,
		shown_bytes: Buffer.byteLength(clipped.output.slice(OUTPUT_TRUNCATION_MARKER.length)),
		omitted_bytes: 300 - Buffer.byteLength(clipped.output.slice(OUTPUT_TRUNCATION_MARKER.length)),
	});
});
