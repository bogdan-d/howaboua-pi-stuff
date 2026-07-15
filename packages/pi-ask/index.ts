import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { createAskTool } from "./ask/tool.js";

export { createAskTool } from "./ask/tool.js";

export default function humanInTheLoop(pi: ExtensionAPI): void {
	pi.registerTool(createAskTool());
}
