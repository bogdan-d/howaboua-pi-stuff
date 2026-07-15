import { defineTool } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";
import { AskParameters, type AskPrompt } from "./contracts.js";
import {
	normalizeAskInput,
	normalizeResponses,
	summarizeResponses,
	textContent,
} from "./normalize.js";
import { askWithPiUi } from "./pi-ui.js";
import { askInTui } from "./tui.js";

type AskInComposer = (
	prompts: AskPrompt[],
	signal: AbortSignal | undefined,
) => Promise<unknown>;

export function createAskTool({
	askInComposer,
}: {
	askInComposer?: AskInComposer;
} = {}) {
	return defineTool({
		name: "ask",
		label: "Ask",
		description:
			"Request user input or action and return the response. Requires interactive UI.",
		parameters: AskParameters,
		promptSnippet: "ask: Request human input or action.",
		promptGuidelines: [
			"ask: Use for needed user decisions or input; set handoff true for a user-only action and state its completion signal.",
			"ask: For reviews, make each finding a prompt with disposition choices; do not report first.",
			"ask: Do not add Other/rephrase; it is automatic.",
		],
		executionMode: "sequential",
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const { handoff, prompts } = normalizeAskInput(params);
			if (prompts.length === 0) {
				throw new Error(
					"ask requires at least one prompt with a non-empty title.",
				);
			}
			if (!askInComposer && !ctx.hasUI)
				throw new Error("ask requires an interactive UI.");

			const rawResponses = askInComposer
				? await askInComposer(prompts, signal)
				: ctx.mode === "tui"
					? await askInTui(ctx, prompts, {
							handoff,
							...(signal ? { signal } : {}),
						})
					: await askWithPiUi(ctx, prompts, {
							handoff,
							...(signal ? { signal } : {}),
						});
			const responses = normalizeResponses(prompts, rawResponses);
			if (!responses) {
				return {
					content: [
						textContent(
							handoff ? "Handoff dismissed by user." : "Dismissed by user.",
						),
					],
					details: { dismissed: true, kind: handoff ? "handoff" : "prompt" },
				};
			}
			return {
				content: [textContent(summarizeResponses(prompts, responses))],
				details: { kind: handoff ? "handoff" : "prompt", responses },
			};
		},
		renderCall(args, theme) {
			const count = Array.isArray(args.prompts) ? args.prompts.length : 0;
			return new Text(
				theme.fg(
					"toolTitle",
					theme.bold(args.handoff === true ? "ask handoff " : "ask "),
				) + theme.fg("muted", `${count} prompt${count === 1 ? "" : "s"}`),
				0,
				0,
			);
		},
		renderResult(result, _options, theme) {
			const text =
				result.content[0]?.type === "text" ? result.content[0].text : "";
			return new Text(theme.fg("success", text), 0, 0);
		},
	});
}
