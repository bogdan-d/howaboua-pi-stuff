import { closeSync, chmodSync, mkdtempSync, openSync, readSync, rmSync, writeSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

export interface RetainedOutputSnapshot {
	availableBytes: number;
	totalBytes?: number | undefined;
	complete: boolean;
	reason?: "limit" | "storage_error" | "source_limit" | "expired" | undefined;
}

export interface RetainedOutputPage extends RetainedOutputSnapshot {
	output: string;
	startByte: number;
	endByte: number;
}

interface RetainedOutputEntry {
	fd: number | undefined;
	path: string | undefined;
	availableBytes: number;
	totalBytes: number;
	totalKnown: boolean;
	storageComplete: boolean;
	reason?: RetainedOutputSnapshot["reason"];
	completed: boolean;
}

export interface RetainedOutputStore {
	append(id: string, text: string): RetainedOutputSnapshot;
	markIncomplete(id: string): RetainedOutputSnapshot;
	markCompleted(id: string): RetainedOutputSnapshot | undefined;
	snapshot(id: string): RetainedOutputSnapshot | undefined;
	read(id: string, offset: number, maxBytes: number): RetainedOutputPage;
	discard(id: string): void;
	clear(): void;
}

export function createRetainedOutputStore(options: {
	prefix: string;
	maxEntryBytes: number;
	maxTotalBytes: number;
	maxCompletedEntries: number;
}): RetainedOutputStore {
	const entries = new Map<string, RetainedOutputEntry>();
	const completedIds: string[] = [];
	const expiredIds = new Set<string>();
	let directory: string | undefined;
	let retainedBytes = 0;

	function createEntry(): RetainedOutputEntry {
		return {
			fd: undefined,
			path: undefined,
			availableBytes: 0,
			totalBytes: 0,
			totalKnown: true,
			storageComplete: true,
			completed: false,
		};
	}

	function ensureFile(entry: RetainedOutputEntry): number {
		if (entry.fd !== undefined) return entry.fd;
		directory ??= mkdtempSync(join(tmpdir(), options.prefix));
		if (process.platform !== "win32") chmodSync(directory, 0o700);
		entry.path = join(directory, `${randomUUID()}.txt`);
		entry.fd = openSync(entry.path, "wx+", 0o600);
		return entry.fd;
	}

	function result(entry: RetainedOutputEntry): RetainedOutputSnapshot {
		return {
			availableBytes: entry.availableBytes,
			...(entry.totalKnown ? { totalBytes: entry.totalBytes } : {}),
			complete: entry.totalKnown && entry.storageComplete,
			...(entry.reason ? { reason: entry.reason } : {}),
		};
	}

	function append(id: string, text: string): RetainedOutputSnapshot {
		const entry = entries.get(id) ?? createEntry();
		entries.set(id, entry);
		const bytes = Buffer.from(text, "utf8");
		entry.totalBytes += bytes.length;
		if (bytes.length === 0 || !entry.storageComplete) return result(entry);
		const incoming = utf8Prefix(bytes, Math.max(0, options.maxEntryBytes - entry.availableBytes));
		while (incoming.length > 0 && retainedBytes + incoming.length > options.maxTotalBytes && completedIds.length > 0) {
			const oldest = completedIds.shift();
			if (oldest === undefined || oldest === id) break;
			deleteEntry(oldest);
		}
		const capacity = Math.max(0, Math.min(
			options.maxEntryBytes - entry.availableBytes,
			options.maxTotalBytes - retainedBytes,
		));
		const accepted = utf8Prefix(bytes, capacity);
		try {
			if (accepted.length > 0) {
				const fd = ensureFile(entry);
				let written = 0;
				while (written < accepted.length)
					written += writeSync(fd, accepted, written, accepted.length - written);
				entry.availableBytes += written;
				retainedBytes += written;
			}
			if (accepted.length !== bytes.length) {
				entry.storageComplete = false;
				entry.reason = "limit";
			}
		} catch {
			entry.storageComplete = false;
			entry.reason = "storage_error";
		}
		return result(entry);
	}

	function deleteEntry(id: string): void {
		const entry = entries.get(id);
		if (!entry) return;
		entries.delete(id);
		retainedBytes -= entry.availableBytes;
		if (entry.fd !== undefined) {
			try { closeSync(entry.fd); } catch {}
		}
		if (entry.path) {
			try { rmSync(entry.path, { force: true }); } catch {}
		}
		expiredIds.add(id);
		while (expiredIds.size > options.maxCompletedEntries * 2) {
			const oldest = expiredIds.values().next().value;
			if (oldest === undefined) break;
			expiredIds.delete(oldest);
		}
	}

	return {
		append,
		markIncomplete(id) {
			const entry = entries.get(id) ?? createEntry();
			entries.set(id, entry);
			entry.totalKnown = false;
			entry.storageComplete = false;
			entry.reason = "source_limit";
			return result(entry);
		},
		markCompleted(id) {
			const entry = entries.get(id);
			if (!entry) return undefined;
			if (!entry.completed) {
				entry.completed = true;
				completedIds.push(id);
			}
			while (completedIds.length > options.maxCompletedEntries) {
				const oldest = completedIds.shift();
				if (oldest !== undefined) deleteEntry(oldest);
			}
			return result(entry);
		},
		snapshot(id) {
			const entry = entries.get(id);
			return entry ? result(entry) : undefined;
		},
		read(id, offset, maxBytes) {
			if (!Number.isSafeInteger(offset) || offset < 0)
				throw new Error("output offset must be a non-negative safe integer");
			if (!Number.isSafeInteger(maxBytes) || maxBytes < 1)
				throw new Error("output page size must be a positive safe integer");
			const entry = entries.get(id);
			if (!entry) {
				throw new Error(expiredIds.has(id)
					? `Retained output ${id} expired`
					: `Unknown retained output ${id}`);
			}
			if (offset > entry.availableBytes) {
				throw new Error(`Retained output ${id} is available only through byte ${entry.availableBytes}`);
			}
			let startByte = offset;
			let output = "";
			let endByte = offset;
			if (offset < entry.availableBytes && entry.fd !== undefined) {
				startByte = alignUtf8Start(entry.fd, offset, entry.availableBytes);
				const length = Math.min(maxBytes, entry.availableBytes - startByte);
				const buffer = Buffer.allocUnsafe(length);
				const read = readSync(entry.fd, buffer, 0, length, startByte);
				const accepted = trimIncompleteUtf8End(buffer.subarray(0, read));
				output = accepted.toString("utf8");
				endByte = startByte + accepted.length;
			}
			return { ...result(entry), output, startByte, endByte };
		},
		discard(id) {
			deleteEntry(id);
			const completedIndex = completedIds.indexOf(id);
			if (completedIndex >= 0) completedIds.splice(completedIndex, 1);
		},
		clear() {
			for (const id of [...entries.keys()]) deleteEntry(id);
			entries.clear();
			completedIds.length = 0;
			expiredIds.clear();
			retainedBytes = 0;
			if (directory) {
				try { rmSync(directory, { recursive: true, force: true }); } catch {}
				directory = undefined;
			}
		},
	};
}

function utf8Prefix(bytes: Buffer, maximum: number): Buffer {
	let end = Math.min(bytes.length, Math.max(0, maximum));
	if (end === bytes.length) return bytes;
	while (end > 0 && end < bytes.length && (bytes[end]! & 0xc0) === 0x80) end -= 1;
	return bytes.subarray(0, end);
}

function alignUtf8Start(fd: number, offset: number, availableBytes: number): number {
	let start = offset;
	const byte = Buffer.allocUnsafe(1);
	while (start < availableBytes) {
		readSync(fd, byte, 0, 1, start);
		if ((byte[0]! & 0xc0) !== 0x80) break;
		start += 1;
	}
	return start;
}

function trimIncompleteUtf8End(bytes: Buffer): Buffer {
	if (bytes.length === 0) return bytes;
	let lead = bytes.length - 1;
	while (lead >= 0 && (bytes[lead]! & 0xc0) === 0x80) lead -= 1;
	if (lead < 0) return bytes.subarray(0, 0);
	const first = bytes[lead]!;
	const expected = first < 0x80 ? 1 : first < 0xe0 ? 2 : first < 0xf0 ? 3 : 4;
	return bytes.length - lead < expected ? bytes.subarray(0, lead) : bytes;
}
