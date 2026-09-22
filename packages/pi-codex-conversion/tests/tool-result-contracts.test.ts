import test from "node:test";
import assert from "node:assert/strict";
import { registerApplyPatchResultEvent } from "../src/index.ts";
import { toCodeModeToolResult } from "../src/tools/code-mode/tool-result.ts";
import { SharedCodeModeRuntime } from "../src/tools/code-mode/shared-runtime.ts";

test("apply_patch partial mutations remain error results", () => {
	let handler: ((event: { toolName: string; details: unknown }) => unknown) | undefined;
	registerApplyPatchResultEvent({
		on(event: string, registered: (...args: never[]) => unknown) {
			if (event === "tool_result") handler = registered as typeof handler;
		},
	} as never);
	const result = {
		changedFiles: [],
		createdFiles: [],
		deletedFiles: [],
		movedFiles: [],
		fuzz: 0,
	};

	assert.deepEqual(handler?.({
		toolName: "apply_patch",
		details: { status: "partial_failure", result },
	}), { isError: true });
	assert.equal(handler?.({ toolName: "apply_patch", details: { status: "success", result } }), undefined);
});

test("Notebook results retain output, recovery and memory pressure without success boilerplate", async () => {
	const completed = toCodeModeToolResult({
		kind: "result", cellId: "complete",
		contentItems: [{ type: "input_text", text: "Script completed" }],
	});
	assert.deepEqual(completed.content, [{ type: "text", text: "Script completed" }]);
	const empty = toCodeModeToolResult({ kind: "result", cellId: "empty", contentItems: [] });
	assert.deepEqual(empty.content, [{ type: "text", text: "OK" }]);
	const result = toCodeModeToolResult({
		kind: "yielded",
		cellId: "notebook-1",
		contentItems: [],
		notebookMemory: {
			heapUsedBytes: 950,
			heapTotalBytes: 960,
			rssBytes: 1_200,
			externalBytes: 10,
			heapLimitBytes: 1_000,
		},
	});
	const text = result.content.map((item) => item.type === "text" ? item.text : "").join("\n");
	assert.match(text, /Notebook memory:/);
	assert.match(text, /CRITICAL:/);

	const failed = toCodeModeToolResult({
		kind: "result",
		cellId: "notebook-2",
		contentItems: [],
		errorText: "SyntaxError: Identifier 'patch' has already been declared",
	});
	assert.match(
		failed.content.map((item) => item.type === "text" ? item.text : "").join("\n"),
		/retry one-off code inside \{ \.\.\. \}/,
	);

	const runtime = new SharedCodeModeRuntime();
	try {
		const emitted = `FIRST-SENTINEL\n${"x".repeat(600)}\nMIDDLE-SENTINEL\n${"😀".repeat(200)}\nLAST-SENTINEL`;
		const response = {
			kind: "result" as const,
			cellId: "retained-cell",
			contentItems: [{ type: "input_text" as const, text: emitted }],
			traces: [{
				id: "nested-exec",
				name: "exec_command",
				input: { cmd: "synthetic" },
				status: "done" as const,
				result: {
					content: [{ type: "text" as const, text: "preview" }],
					details: {
						exit_code: 7,
						output_truncated: true,
						output_recovery: {
							session_id: 17,
							offset: 0,
							available_bytes: 42,
							total_bytes: 42,
							complete: true,
						},
						output: "preview",
					},
				},
			}],
		};
		const retention = runtime.retainOutput(response);
		const truncated = toCodeModeToolResult(response, 1, retention);
		const visible = truncated.content.map((item) => item.type === "text" ? item.text : "").join("\n");
		assert.equal(truncated.details.statusPrefix, false);
		assert.doesNotMatch(visible, /Script completed/);
		assert.match(visible, /Nested exec process exited with code 7/);
		assert.match(visible, /tools\.write_stdin\(\{ session_id: 17, output_offset: 0/);
		assert.match(visible, /wait\(\{ cell_id: "retained-cell", output_offset: 0/);

		let offset = 0;
		let recovered = "";
		do {
			const page = runtime.readOutput("retained-cell", offset, 8);
			recovered += page.output;
			offset = page.endByte;
		} while (offset < retention!.snapshot.availableBytes);
		assert.equal(recovered, emitted);

		const limitedResponse = {
			kind: "result" as const,
			cellId: "limited-notebook-cell",
			contentItems: [{ type: "input_text" as const, text: "retained prefix" }],
			outputComplete: false as const,
			traces: [{
				id: "limited-nested-exec",
				name: "exec_command",
				input: { cmd: "synthetic" },
				status: "done" as const,
				result: { content: [], details: { exit_code: 7 } },
			}],
		};
		const limited = toCodeModeToolResult(
			limitedResponse,
			100,
			runtime.retainOutput(limitedResponse),
		);
		assert.match(
			limited.content.map((item) => item.type === "text" ? item.text : "").join("\n"),
			/Only the first 15 bytes were retained \(source_limit\); later output is unavailable/,
		);
		assert.match(
			limited.content.map((item) => item.type === "text" ? item.text : "").join("\n"),
			/Nested exec process exited with code 7/,
		);
		for (let index = 0; index < 32; index += 1) {
			runtime.retainOutput({
				kind: "result",
				cellId: `completed-${index}`,
				contentItems: [{ type: "input_text", text: String(index) }],
			});
		}
		assert.throws(() => runtime.readOutput("retained-cell", 0, 1), /expired/);
	} finally {
		await runtime.shutdownHost();
	}
});
