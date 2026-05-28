import type { Message } from "@earendil-works/pi-ai";

export type ThinkingLevel =
	| "off"
	| "minimal"
	| "low"
	| "medium"
	| "high"
	| "xhigh";

export interface BtwConfig {
	model: string;
	thinking?: ThinkingLevel;
	provider?: string;
	command?: string;
	injectShortcut?: string;
	dismissShortcut?: string;
	composeShortcut?: string;
}

export interface BtwTurn {
	question: string;
	answer?: string;
	error?: string;
	startedAt: number;
	finishedAt?: number;
}

export interface ChildDetails {
	cwd: string;
	model: string;
	thinking?: ThinkingLevel;
	messages: Message[];
	stderr: string;
	usage: {
		turns: number;
		input: number;
		output: number;
		cacheRead: number;
		cacheWrite: number;
		cost: number;
		contextTokens: number;
	};
	stopReason?: string;
	errorMessage?: string;
}
