import { parse } from "smol-toml";
import { substituteVariables } from "../../utils/template.js";
import type { ContentStrategy, ContentStrategyOptions } from "../types.js";
import { GEMINI_DEFAULT_INSTALL_PATH } from "../constants.js";

export class KilocodeContentStrategy implements ContentStrategy {
	process(
		templateContent: string,
		options: ContentStrategyOptions,
	): string | null {
		const { installPath, agentType, commandName } = options;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const parsed = parse(templateContent) as any;

		if (!parsed.prompt) {
			return null;
		}

		let prompt = parsed.prompt;
		prompt = prompt.replaceAll(GEMINI_DEFAULT_INSTALL_PATH, installPath);
		const finalContent = substituteVariables(prompt, { agent_type: agentType });

		const title = commandName
			? commandName.charAt(0).toUpperCase() + commandName.slice(1)
			: "Command";
		return `# Conductor ${title}${parsed.description ? "\n\n" + parsed.description + "\n\n" : "\n\n"}${finalContent}`;
	}
}

export const kilocodeContentStrategy = new KilocodeContentStrategy();
