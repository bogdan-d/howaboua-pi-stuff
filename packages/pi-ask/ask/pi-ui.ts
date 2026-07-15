import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { OTHER_OPTION_LABEL } from "./constants.js";
import type { AskPrompt, AskResponse } from "./contracts.js";
import { customSelectionFor } from "./state.js";

async function askOther(
	ctx: ExtensionContext,
	prompt: AskPrompt,
): Promise<string | null> {
	const value = await ctx.ui.input(
		prompt.title,
		"Alternative; blank = rephrase",
	);
	return value === undefined ? null : customSelectionFor(value);
}

function promptText(prompt: AskPrompt, handoff: boolean): string {
	const text = prompt.body ? `${prompt.title}\n\n${prompt.body}` : prompt.title;
	return handoff ? `Human action needed\n\n${text}` : text;
}

async function askComment(
	ctx: ExtensionContext,
	prompt: AskPrompt,
): Promise<string> {
	const value = await ctx.ui.input(
		`${prompt.title} — comment`,
		"Optional comment",
	);
	return typeof value === "string" ? value.trim() : "";
}

async function askSingleWithPiUi(
	ctx: ExtensionContext,
	prompt: AskPrompt,
	handoff: boolean,
): Promise<string[] | null> {
	const choices = prompt.choices.map((choice) => choice.label);
	const picked =
		choices.length > 0
			? await ctx.ui.select(promptText(prompt, handoff), [
					...choices,
					OTHER_OPTION_LABEL,
				])
			: await ctx.ui.input(promptText(prompt, handoff), "Response");
	if (!picked) return null;
	if (picked !== OTHER_OPTION_LABEL) return [picked];
	const other = await askOther(ctx, prompt);
	return other === null ? null : [other];
}

async function askMultipleWithPiUi(
	ctx: ExtensionContext,
	prompt: AskPrompt,
	handoff: boolean,
): Promise<string[] | null> {
	const choices = prompt.choices.map((choice) => choice.label);
	const picked: string[] = [];
	while (true) {
		const next = await ctx.ui.select(promptText(prompt, handoff), [
			...choices.filter((choice) => !picked.includes(choice)),
			OTHER_OPTION_LABEL,
			"Done",
		]);
		if (!next) return null;
		if (next === "Done") return picked;
		if (next === OTHER_OPTION_LABEL) {
			const other = await askOther(ctx, prompt);
			if (other === null) return null;
			picked.push(other);
		} else {
			picked.push(next);
		}
	}
}

export async function askWithPiUi(
	ctx: ExtensionContext,
	prompts: AskPrompt[],
	{ handoff = false }: { handoff?: boolean } = {},
): Promise<AskResponse[] | null> {
	if (!ctx.hasUI) return null;
	const responses: AskResponse[] = [];
	for (const prompt of prompts) {
		const selections = prompt.multiple
			? await askMultipleWithPiUi(ctx, prompt, handoff)
			: await askSingleWithPiUi(ctx, prompt, handoff);
		if (!selections) return null;
		const comment = await askComment(ctx, prompt);
		responses.push({
			id: prompt.id,
			selections,
			...(comment ? { comment } : {}),
		});
	}
	return responses;
}
