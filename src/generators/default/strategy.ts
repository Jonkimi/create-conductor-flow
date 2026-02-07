import { join } from "path";
import fs from "fs-extra";
const { writeFile } = fs;
import { parse } from "smol-toml";
import { substituteVariables } from "../../utils/template.js";
import type {
	ContentStrategy,
	FileStrategy,
	ContentStrategyOptions,
	FileStrategyOptions,
} from "../types.js";

import {
	CONDUCTOR_FILE_PREFIX,
	GEMINI_DEFAULT_INSTALL_PATH,
} from "../constants.js";

export class DefaultContentStrategy implements ContentStrategy {
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
		console.log(GEMINI_DEFAULT_INSTALL_PATH, installPath);
		prompt = prompt.replaceAll(GEMINI_DEFAULT_INSTALL_PATH, installPath);

		// Replace 'conductor:' with 'conductor-' (or configured prefix)
		// This ensures generated files for agents use the correct command prefix
		prompt = prompt.replace(/\/conductor:/g, `/${CONDUCTOR_FILE_PREFIX}`);

		const finalContent = substituteVariables(prompt, { agent_type: agentType });

		if (parsed.description) {
			return `---\ndescription: ${parsed.description}\n---\n${finalContent}`;
		}

		return finalContent;
	}
}

export class DefaultFileStrategy implements FileStrategy {
	async write(options: FileStrategyOptions): Promise<void> {
		const {
			targetDir,
			agentDir,
			commandsDir,
			commandName,
			extension,
			content,
		} = options;
		const fileName = `${CONDUCTOR_FILE_PREFIX}${commandName}${extension}`;
		await writeFile(join(targetDir, agentDir, commandsDir, fileName), content);
	}
}

export const defaultContentStrategy = new DefaultContentStrategy();
export const defaultFileStrategy = new DefaultFileStrategy();
