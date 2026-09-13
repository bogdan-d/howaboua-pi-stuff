import {
	DEFAULT_CODE_MODE_OUTPUT_TOKENS,
	MAX_CODE_MODE_OUTPUT_TOKENS,
} from "./host-protocol.js";
import type { RetainedOutputPage } from "../retained-output.ts";
import type { CodeModeOutputRetention } from "./shared-runtime.ts";
import type { NotebookMemoryUsage, RuntimeContentItem, RuntimeResponse } from "./types.js";

const MAX_OUTPUT_IMAGE_COUNT = 4;
const MAX_OUTPUT_IMAGE_CHARS = 16 * 1024 * 1024;

export function toCodeModeToolResult(
	response: RuntimeResponse,
	maxTokens?: number,
	retention?: CodeModeOutputRetention,
) {
	const scriptError =
		response.kind === "result" ? withScriptErrorRecovery(response.errorText) : undefined;
	const status = scriptError
		? `Script error: ${scriptError}`
		: response.kind === "yielded"
			? `Still running (exec cell "${response.cellId}"). Use wait once near expected completion; avoid short polling`
			: response.kind === "terminated"
				? "Script terminated"
				: "Script completed";
	let imageChars = 0;
	let imageCount = 0;
	let omittedImages = 0;
	const output = response.contentItems
		.map((item) => {
			const content = toPiContent(item);
			if (content?.type !== "image") return content;
			if (
				imageCount >= MAX_OUTPUT_IMAGE_COUNT ||
				imageChars + content.data.length > MAX_OUTPUT_IMAGE_CHARS
			) {
				omittedImages += 1;
				return undefined;
			}
			imageCount += 1;
			imageChars += content.data.length;
			return content;
		})
		.filter((item): item is NonNullable<typeof item> => Boolean(item));
	const memoryWarning = response.notebookMemory && formatNotebookMemoryWarning(response.notebookMemory);
	if (omittedImages > 0)
		output.push({
			type: "text",
			text: `[${omittedImages} code-mode image${omittedImages === 1 ? "" : "s"} omitted]`,
		});
	const outputTokens = Math.min(
		MAX_CODE_MODE_OUTPUT_TOKENS,
		Math.max(
			1,
			maxTokens ?? response.maxOutputTokens ?? DEFAULT_CODE_MODE_OUTPUT_TOKENS,
		),
	);
	const truncated = truncateTextContent(output, outputTokens * 4);
	const criticalText = [
		...(memoryWarning ? [memoryWarning] : []),
		...(response.execSessionIds ?? []).map(formatRunningExecSessionGuidance),
		...(truncated.truncated || response.outputComplete === false || retention?.snapshot.complete === false
			? nestedExecExitGuidance(response.traces ?? [])
			: []),
		...nestedExecRecoveryGuidance(response.traces ?? []),
		...outerRecoveryGuidance(response, retention, truncated),
	];
	return {
		content: [
			{ type: "text" as const, text: status },
			...criticalText.map((text) => ({ type: "text" as const, text })),
			...truncated.content,
		],
		details: {
			codeMode: true,
			cellId: response.cellId,
			status: response.kind,
			...(response.traces ? { traces: response.traces } : {}),
			...(response.droppedTraceCount
				? { droppedTraceCount: response.droppedTraceCount }
				: {}),
			...(response.notebookMemory ? { notebookMemory: response.notebookMemory } : {}),
			...(scriptError ? { scriptError } : {}),
		},
	};
}

export function toCodeModeOutputPageResult(cellId: string, page: RetainedOutputPage) {
	const total = page.totalBytes === undefined ? "unknown total" : `${page.totalBytes} total bytes`;
	const content = [
		{ type: "text" as const, text: `Retained exec output bytes [${page.startByte}, ${page.endByte}) (${total})` },
		...(page.output ? [{ type: "text" as const, text: page.output }] : []),
	];
	if (page.endByte < page.availableBytes) {
		content.push({
			type: "text",
			text: `Continue with wait({ cell_id: ${JSON.stringify(cellId)}, output_offset: ${page.endByte}, max_tokens: ... })`,
		});
	} else if (!page.complete) {
		content.push({
			type: "text",
			text: `Only the first ${page.availableBytes} bytes were retained${page.reason ? ` (${page.reason})` : ""}; later output is unavailable`,
		});
	}
	return {
		content,
		details: {
			codeMode: true,
			cellId,
			status: "result",
			output_range: { start_byte: page.startByte, end_byte: page.endByte },
			output_recovery: {
				offset: page.endByte,
				available_bytes: page.availableBytes,
				...(page.totalBytes === undefined ? {} : { total_bytes: page.totalBytes }),
				complete: page.complete,
				...(page.reason ? { reason: page.reason } : {}),
			},
		},
	};
}

function withScriptErrorRecovery(errorText: string | undefined): string | undefined {
	if (!errorText || !/Identifier ['"][^'"]+['"] has already been declared/.test(errorText)) return errorText;
	return `${errorText}\nRecovery: reuse the existing binding, choose a new name, or retry one-off code inside { ... }; restart only if the binding itself is unusable`;
}

export function formatNotebookMemoryWarning(memory: NotebookMemoryUsage): string | undefined {
	const ratio = memory.heapLimitBytes > 0 ? memory.heapUsedBytes / memory.heapLimitBytes : 0;
	const pressure = ratio >= 0.9
		? " · CRITICAL: finish essential work and release unneeded notebook state"
		: ratio >= 0.8
			? " · WARNING: release unneeded notebook state"
			: "";
	if (!pressure) return undefined;
	return `Notebook memory: heap ${formatBinaryBytes(memory.heapUsedBytes)} / ${formatBinaryBytes(memory.heapLimitBytes)} · RSS ${formatBinaryBytes(memory.rssBytes)}${pressure}`;
}

function formatBinaryBytes(bytes: number): string {
	const mib = bytes / (1024 * 1024);
	if (mib < 1024) return `${mib.toFixed(mib < 10 ? 1 : 0)} MiB`;
	const gib = mib / 1024;
	return `${gib.toFixed(gib < 10 ? 1 : 0)} GiB`;
}

export function formatRunningExecSessionGuidance(sessionId: number): string {
	return `Session ${sessionId} still running. Resume near completion with text(await tools.write_stdin({ session_id: ${sessionId}, yield_time_ms: ... })); do not use wait`;
}

function nestedExecRecoveryGuidance(
	traces: NonNullable<RuntimeResponse["traces"]>,
): string[] {
	const notices = new Map<number, string>();
	for (const trace of traces) {
		if (trace.status !== "done" || (trace.name !== "exec_command" && trace.name !== "write_stdin")) continue;
		const details = trace.result?.details;
		if (!details || typeof details !== "object" || !("output_recovery" in details)) continue;
		const recovery = details.output_recovery;
		if (!recovery || typeof recovery !== "object") continue;
		const sessionId = "session_id" in recovery && typeof recovery.session_id === "number"
			? recovery.session_id
			: undefined;
		const offset = "offset" in recovery && typeof recovery.offset === "number"
			? recovery.offset
			: undefined;
		const available = "available_bytes" in recovery && typeof recovery.available_bytes === "number"
			? recovery.available_bytes
			: undefined;
		if (sessionId === undefined || offset === undefined || available === undefined) continue;
		const complete = "complete" in recovery && recovery.complete === true;
		const retained = complete
			? `${available} bytes retained`
			: `only the first ${available} bytes retained; later output unavailable`;
		const next = offset < available
			? ` Use text(await tools.write_stdin({ session_id: ${sessionId}, output_offset: ${offset}, max_output_tokens: ... })) to page it.`
			: "";
		notices.set(sessionId, `Nested exec output truncated (${retained}).${next}`);
	}
	return [...notices.values()];
}

function nestedExecExitGuidance(
	traces: NonNullable<RuntimeResponse["traces"]>,
): string[] {
	return traces.flatMap((trace) => {
		if (trace.status !== "done" || (trace.name !== "exec_command" && trace.name !== "write_stdin")) return [];
		const details = trace.result?.details;
		if (!details || typeof details !== "object" || !("exit_code" in details) || typeof details.exit_code !== "number") return [];
		return [`Nested exec process exited with code ${details.exit_code}`];
	});
}

function outerRecoveryGuidance(
	response: RuntimeResponse,
	retention: CodeModeOutputRetention | undefined,
	truncation: TruncatedTextContent,
): string[] {
	if (!truncation.truncated && response.outputComplete !== false && retention?.snapshot.complete !== false) return [];
	if (!retention) return ["Exec output was truncated before retention; omitted text is unavailable"];
	const notices: string[] = [];
	if (truncation.truncated) {
		notices.push(`Emitted text truncated: showing ${truncation.shownBytes} of ${truncation.totalBytes} UTF-8 bytes`);
	}
	const snapshot = retention.snapshot;
	if (truncation.truncated && retention.segmentStartByte < snapshot.availableBytes) {
		notices.push(
			`Use wait({ cell_id: ${JSON.stringify(response.cellId)}, output_offset: ${retention.segmentStartByte}, max_tokens: ... }) to page retained cell output`,
		);
	}
	if (!snapshot.complete) {
		const total = snapshot.totalBytes === undefined ? "" : ` of ${snapshot.totalBytes}`;
		notices.push(`Only the first ${snapshot.availableBytes}${total} bytes were retained${snapshot.reason ? ` (${snapshot.reason})` : ""}; later output is unavailable`);
	}
	return notices;
}

function toPiContent(
	item: RuntimeContentItem,
):
	| { type: "text"; text: string }
	| { type: "image"; data: string; mimeType: string }
	| undefined {
	if (item.type === "input_text" && typeof item.text === "string")
		return { type: "text", text: item.text };
	if (item.type === "input_image" && typeof item.image_url === "string") {
		const match = item.image_url.match(/^data:([^;,]+);base64,(.+)$/s);
		if (match) return { type: "image", mimeType: match[1]!, data: match[2]! };
	}
	return undefined;
}

interface TruncatedTextContent<T extends { type: string; text?: string } = { type: string; text?: string }> {
	content: T[];
	truncated: boolean;
	shownBytes: number;
	totalBytes: number;
}

function truncateTextContent<T extends { type: string; text?: string }>(
	content: T[],
	maxChars: number,
): TruncatedTextContent<T> {
	let remaining = maxChars;
	let truncated = false;
	let shownBytes = 0;
	const totalBytes = content.reduce(
		(total, item) => total + (item.type === "text" && typeof item.text === "string" ? Buffer.byteLength(item.text, "utf8") : 0),
		0,
	);
	const output: T[] = [];
	for (const item of content) {
		if (item.type !== "text" || typeof item.text !== "string") {
			output.push(item);
			continue;
		}
		if (remaining <= 0) {
			if (!truncated) output.push({ ...item, text: "[Output truncated]" });
			truncated = true;
			continue;
		}
		if (item.text.length <= remaining) {
			remaining -= item.text.length;
			shownBytes += Buffer.byteLength(item.text, "utf8");
			output.push(item);
			continue;
		}
		const visible = unicodeSafeHead(item.text, remaining);
		shownBytes += Buffer.byteLength(visible, "utf8");
		const text = `${visible}\n[Output truncated]`;
		remaining = 0;
		truncated = true;
		output.push({ ...item, text });
	}
	return { content: output, truncated, shownBytes, totalBytes };
}

function unicodeSafeHead(text: string, maximum: number): string {
	let end = Math.min(text.length, Math.max(0, maximum));
	if (end > 0 && end < text.length && /[\uD800-\uDBFF]/.test(text[end - 1]!)) end -= 1;
	return text.slice(0, end);
}
