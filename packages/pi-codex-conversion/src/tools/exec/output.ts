import { randomBytes } from "node:crypto";

const DEFAULT_MAX_OUTPUT_TOKENS = 10_000;
export const OUTPUT_TRUNCATION_MARKER = "[Output truncated: beginning omitted; showing tail]\n";

export interface ExecOutputSessionState {
	buffer: string;
	bufferStartOffset: number;
	emittedOffset: number;
}

export interface OutputTruncationState {
	shownStartChar: number;
	shownEndChar: number;
}

export interface OutputSnapshot {
	output: string;
	original_token_count?: number | undefined;
	truncation?: OutputTruncationState | undefined;
}

export function maxCharsForTokens(maxOutputTokens = DEFAULT_MAX_OUTPUT_TOKENS): number {
	return Math.max(256, maxOutputTokens * 4);
}

function stripTerminalControlSequences(text: string): string {
	const withoutOscAndDcs = text
		.replace(/\u001B\][^\u0007\u001B]*(?:\u0007|\u001B\\)/g, "")
		.replace(/\u001B[P_X^][\s\S]*?\u001B\\/g, "");
	return withoutOscAndDcs
		.replace(/\u001B\[[0-?]*[ -/]*[@-~]/g, "")
		.replace(/\u001B[@-_]/g, "")
		.replaceAll("\u001B", "");
}

function sanitizeBinaryOutput(text: string): string {
	return Array.from(text).filter((char) => {
		const code = char.codePointAt(0);
		if (code === undefined) return false;
		if (code === 0x09 || code === 0x0a || code === 0x0d) return true;
		if (code <= 0x1f) return false;
		if (code >= 0xfff9 && code <= 0xfffb) return false;
		return true;
	}).join("");
}

export function normalizePipeOutput(text: string): string {
	return sanitizeBinaryOutput(stripTerminalControlSequences(text)).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function renderTerminalOutput(text: string): string {
	let committed = "";
	let line: string[] = [];
	let cursor = 0;

	for (const char of stripTerminalControlSequences(text)) {
		const code = char.codePointAt(0);
		if (code === undefined || (code < 0x20 && char !== "\t" && char !== "\n" && char !== "\r" && char !== "\b") || (code >= 0x7f && code <= 0x9f))
			continue;
		if (char === "\r") {
			cursor = 0;
			continue;
		}
		if (char === "\n") {
			committed += `${line.join("")}\n`;
			line = [];
			cursor = 0;
			continue;
		}
		if (char === "\b") {
			cursor = Math.max(0, cursor - 1);
			continue;
		}
		if (cursor > line.length)
			line.push(...Array.from({ length: cursor - line.length }, () => " "));
		line[cursor] = char;
		cursor += 1;
	}

	return committed + line.join("");
}

export function truncateToTail(text: string, maxChars: number): { output: string; removed: number } {
	let start = Math.max(0, text.length - maxChars);
	if (start > 0 && start < text.length && /[\uDC00-\uDFFF]/.test(text[start]!)) start += 1;
	return { output: text.slice(start), removed: start };
}

export function generateChunkId(): string {
	return randomBytes(3).toString("hex");
}

export function truncateOutput(text: string, maxOutputTokens?: number, originalCharCount = text.length): OutputSnapshot {
	if (text.length === 0 && originalCharCount === 0) return { output: "" };
	const maxChars = maxCharsForTokens(maxOutputTokens);
	const originalTokenCount = Math.ceil(Math.max(text.length, originalCharCount) / 4);
	if (text.length <= maxChars && originalCharCount <= text.length) return { output: text, original_token_count: originalTokenCount };
	let tail = truncateToTail(text, maxChars - OUTPUT_TRUNCATION_MARKER.length);
	// Prefer complete lines, but retain a marked fragment for a single long line.
	if (tail.removed > 0 || originalCharCount > text.length) {
		const newline = tail.output.indexOf("\n");
		if (newline >= 0 && newline < tail.output.length - 1 && (tail.removed === 0 || text[tail.removed - 1] !== "\n")) {
			tail = { output: tail.output.slice(newline + 1), removed: tail.removed + newline + 1 };
		}
	}
	const shownStartChar = Math.max(0, originalCharCount - text.length) + tail.removed;
	const snapshot: OutputSnapshot = {
		output: OUTPUT_TRUNCATION_MARKER + tail.output,
		original_token_count: originalTokenCount,
	};
	Object.defineProperty(snapshot, "truncation", {
		value: {
			shownStartChar,
			shownEndChar: shownStartChar + tail.output.length,
		},
	});
	return snapshot;
}

function outputSince(session: ExecOutputSessionState, offset: number): { text: string; originalCharCount: number; endOffset: number } {
	const endOffset = session.bufferStartOffset + session.buffer.length;
	const startOffset = Math.max(offset, session.bufferStartOffset);
	return {
		text: session.buffer.slice(startOffset - session.bufferStartOffset),
		originalCharCount: Math.max(0, endOffset - offset),
		endOffset,
	};
}

export function consumeOutput(session: ExecOutputSessionState, maxOutputTokens?: number): OutputSnapshot {
	const output = outputSince(session, session.emittedOffset);
	session.emittedOffset = output.endOffset;
	return truncateOutput(output.text, maxOutputTokens, output.originalCharCount);
}

export function peekUnconsumedOutput(session: ExecOutputSessionState, maxOutputTokens?: number): OutputSnapshot {
	const output = outputSince(session, session.emittedOffset);
	return truncateOutput(output.text, maxOutputTokens, output.originalCharCount);
}

export function peekOutputSince(session: ExecOutputSessionState, baselineOffset: number, maxOutputTokens?: number): OutputSnapshot {
	const output = outputSince(session, baselineOffset);
	return truncateOutput(output.text, maxOutputTokens, output.originalCharCount);
}
