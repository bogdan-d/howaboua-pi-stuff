import type { ExecSessionSnapshot, UnifiedExecResult } from "./session-manager.ts";
import { consumeOutput, generateChunkId, OUTPUT_TRUNCATION_MARKER, peekOutputSince, peekUnconsumedOutput, truncateOutput, type ExecOutputSessionState, type OutputSnapshot, type OutputTruncationState } from "./output.ts";
import type { RetainedOutputSnapshot } from "../retained-output.ts";

export interface ExecResultSessionState extends ExecOutputSessionState {
	id: number;
	command: string;
	exitCode: number | null | undefined;
	startedAt: number;
	updatedAt: number;
	terminating: boolean;
	outputRetention?: RetainedOutputSnapshot | undefined;
}

function fromSnapshot(session: ExecResultSessionState, waitMs: number, snapshot: OutputSnapshot, retention: RetainedOutputSnapshot | undefined): UnifiedExecResult {
	const result: UnifiedExecResult = {
		chunk_id: generateChunkId(),
		wall_time_seconds: waitMs / 1000,
		...(snapshot.original_token_count === undefined ? {} : { original_token_count: snapshot.original_token_count }),
		...(session.exitCode === undefined || session.exitCode === null
			? { session_id: session.id }
			: { exit_code: session.exitCode }),
		output: snapshot.output,
		...(snapshot.truncated ? { truncated: true } : {}),
	};
	return attachOutputRecovery(result, session.id, retention, snapshot.truncation);
}

export function attachOutputRecovery(
	result: UnifiedExecResult,
	sessionId: number | undefined,
	retention: RetainedOutputSnapshot | undefined,
	truncation: OutputTruncationState | undefined,
): UnifiedExecResult {
	const {
		output,
		output_truncated: _outputTruncated,
		output_truncation: _outputTruncation,
		output_recovery: _outputRecovery,
		...metadata
	} = result;
	if (!truncation || sessionId === undefined) return { ...metadata, output };
	retention ??= {
		availableBytes: 0,
		...(result.output_recovery?.total_bytes === undefined ? {} : { totalBytes: result.output_recovery.total_bytes }),
		complete: false,
		reason: "expired",
	};
	const preview = output.slice(OUTPUT_TRUNCATION_MARKER.length);
	const shownBytes = Buffer.byteLength(preview, "utf8");
	const shownEndByte = retention.totalBytes ?? retention.availableBytes;
	return {
		...metadata,
		output_truncated: true,
		output_truncation: {
			shown_start_byte: Math.max(0, shownEndByte - shownBytes),
			shown_end_byte: shownEndByte,
			shown_bytes: shownBytes,
			...(retention.totalBytes === undefined
				? {}
				: { omitted_bytes: Math.max(0, retention.totalBytes - shownBytes) }),
		},
		output_recovery: {
			session_id: sessionId,
			offset: 0,
			available_bytes: retention.availableBytes,
			...(retention.totalBytes === undefined ? {} : { total_bytes: retention.totalBytes }),
			complete: retention.complete,
			...(retention.reason ? { reason: retention.reason } : {}),
		},
		output,
	};
}

export function makeExecResult<TSession extends ExecResultSessionState>(session: TSession, waitMs: number, maxOutputTokens: number | undefined, exposeSession: (session: TSession) => void, deleteSessionIfDrained: (sessionId: number) => void, retention?: RetainedOutputSnapshot | undefined): UnifiedExecResult {
	const consumed = consumeOutput(session, maxOutputTokens);
	const result = fromSnapshot(session, waitMs, consumed, retention);
	if (session.exitCode === undefined || session.exitCode === null) {
		exposeSession(session);
	} else if (session.emittedOffset === session.bufferStartOffset + session.buffer.length) {
		deleteSessionIfDrained(session.id);
	}
	return result;
}

export function snapshotSession(session: ExecResultSessionState, maxOutputChars = 8_000): ExecSessionSnapshot {
	return {
		id: session.id,
		command: session.command,
		running: session.exitCode === undefined || session.exitCode === null,
		exitCode: session.exitCode ?? undefined,
		startedAt: session.startedAt,
		updatedAt: session.updatedAt,
		outputTail: session.buffer.slice(-maxOutputChars),
		terminating: session.terminating,
	};
}

export function makeSnapshotResult(session: ExecResultSessionState, waitMs: number, maxOutputTokens?: number, unconsumedOnly = false, retention?: RetainedOutputSnapshot | undefined): UnifiedExecResult {
	const snapshot = unconsumedOnly ? peekUnconsumedOutput(session, maxOutputTokens) : truncateOutput(session.buffer, maxOutputTokens, session.bufferStartOffset + session.buffer.length);
	return fromSnapshot(session, waitMs, snapshot, retention);
}

export function makeSnapshotSince(session: ExecResultSessionState, waitMs: number, baselineOffset: number, maxOutputTokens?: number, retention?: RetainedOutputSnapshot | undefined): UnifiedExecResult {
	return fromSnapshot(session, waitMs, peekOutputSince(session, baselineOffset, maxOutputTokens), retention);
}
