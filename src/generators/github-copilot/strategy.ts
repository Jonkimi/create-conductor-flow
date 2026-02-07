import { parse } from "smol-toml";
import { substituteVariables } from "../../utils/template.js";
import type { ContentStrategy, ContentStrategyOptions } from "../types.js";
import { GEMINI_DEFAULT_INSTALL_PATH } from "../constants.js";

export class GithubCopilotContentStrategy implements ContentStrategy {
	process(
		templateContent: string,
		options: ContentStrategyOptions,
	): string | null {
		const { installPath, agentType, fixedAgent } = options;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const parsed = parse(templateContent) as any;

		if (!parsed.prompt) {
			return null;
		}

		let prompt = parsed.prompt;
		prompt = prompt.replaceAll(GEMINI_DEFAULT_INSTALL_PATH, installPath);
		const finalContent = substituteVariables(prompt, { agent_type: agentType });

		return `---\ndescription: ${parsed.description || ""}\nagent: ${fixedAgent}\n---\n${finalContent}`;
	}
}

export const githubCopilotContentStrategy = new GithubCopilotContentStrategy();
