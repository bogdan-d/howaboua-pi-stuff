import type { UnifiedExecResult } from "./session-manager.ts";

export function formatUnifiedExecResult(result: UnifiedExecResult, command?: string): string {
	const sections: string[] = [];

	if (command) {
		sections.push(`Command: ${command}`);
	}
	if (result.chunk_id) {
		sections.push(`Chunk ID: ${result.chunk_id}`);
	}
	sections.push(`Wall time: ${result.wall_time_seconds.toFixed(4)} seconds`);

	if (result.exit_code !== undefined) {
		sections.push(`Process exited with code ${result.exit_code}`);
	}
	if (result.session_id !== undefined) {
		sections.push(`Session ${result.session_id} still running. Resume near completion with write_stdin and an appropriate yield_time_ms`);
	}
	if (result.original_token_count !== undefined) {
		sections.push(`Original token count: ${result.original_token_count}`);
	}
	if (result.output_truncated && result.output_truncation) {
		const truncation = result.output_truncation;
		const recovery = result.output_recovery;
		sections.push(
			`Output truncated: showing UTF-8 bytes [${truncation.shown_start_byte}, ${truncation.shown_end_byte}) (${truncation.shown_bytes} bytes)${truncation.omitted_bytes === undefined ? "" : `; ${truncation.omitted_bytes} bytes omitted`}`,
		);
		if (recovery) {
			const retained = recovery.total_bytes === undefined
				? `${recovery.available_bytes} bytes retained; later bytes unavailable`
				: recovery.complete
					? `${recovery.total_bytes} bytes retained`
					: `${recovery.available_bytes} of ${recovery.total_bytes} bytes retained; later bytes unavailable`;
			sections.push(`Recovery: ${retained}${recovery.reason ? ` (${recovery.reason})` : ""}`);
			if (recovery.offset < recovery.available_bytes)
				sections.push(`Call write_stdin({ session_id: ${recovery.session_id}, output_offset: ${recovery.offset}, max_output_tokens: ... }) to page retained output`);
		}
	}

	sections.push("Output:");
	sections.push(result.output);

	return sections.join("\n");
}
