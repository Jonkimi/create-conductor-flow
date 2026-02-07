import { parse } from "smol-toml";
import { substituteVariables } from "../../utils/template.js";
import type { ContentStrategy, ContentStrategyOptions } from "../types.js";
import { GEMINI_DEFAULT_INSTALL_PATH } from "../constants.js";

export class QwenCodeContentStrategy implements ContentStrategy {
	process(
		templateContent: string,
		options: ContentStrategyOptions,
	): string | null {
		const { installPath, agentType } = options;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const parsed = parse(templateContent) as any;

		if (!parsed.prompt) {
			return null;
		}

		let prompt = parsed.prompt;
		prompt = prompt.replaceAll(GEMINI_DEFAULT_INSTALL_PATH, installPath);
		const finalContent = substituteVariables(prompt, { agent_type: agentType });

		let frontmatter = "";
		if (parsed.description) {
			// Simple YAML description. We use quotes to be safer.
			const safeDescription = parsed.description.replace(/"/g, '\\"');
			frontmatter = `---\ndescription: "${safeDescription}"\n---\n\n`;
		}

		return `${frontmatter}${finalContent}`;
	}
}

export const qwenCodeContentStrategy = new QwenCodeContentStrategy();
