import { parse } from "smol-toml";
import { substituteVariables } from "../../utils/template.js";
import type { ContentStrategy, ContentStrategyOptions } from "../types.js";

export class RooCodeContentStrategy implements ContentStrategy {
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
		prompt = prompt.replace(
			"__$$CODE_AGENT_INSTALL_PATH$$__",
			installPath,
		);
		const finalContent = substituteVariables(prompt, { agent_type: agentType });

		const title = commandName
			? commandName.charAt(0).toUpperCase() + commandName.slice(1)
			: "Command";
		return `# Conductor ${title}${parsed.description ? "\n\n" + parsed.description + "\n\n" : "\n\n"}${finalContent}`;
	}
}

export const rooCodeContentStrategy = new RooCodeContentStrategy();
