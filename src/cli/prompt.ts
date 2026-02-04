import select from "@inquirer/select";
import { AgentType, InstallScope } from "../types.js";
import type { GitIgnoreMethod } from "../utils/gitIgnore.js";

export async function promptForInstallScope(
	agent: AgentType,
): Promise<InstallScope> {
	const isCodex = agent === "codex";
	const isCline = agent === "cline";

	const choices = isCodex
		? [{ name: "Global (User Home Directory)", value: "global" as const }]
		: [{ name: "Project (Current Directory)", value: "project" as const }];

	// Use a type assertion to satisfy the select generic if needed,
	// though it implies the return type based on values.
	const answer = await select<InstallScope>({
		message: "Select installation method:",
		choices: choices,
		default: isCodex ? "global" : "project",
	});

	return answer;
}

import { ALL_AGENT_CONFIGS } from "../generators/registry.js";
import type { AgentConfig } from "../generators/types.js";

export async function promptForAgent(): Promise<AgentType> {
	const choices = ALL_AGENT_CONFIGS.map((config: AgentConfig) => {
		const {
			displayName,
			agentType,
			protocolFilename,
			agentDir,
			commandsDir,
			description,
		} = config;
		const finalDescription = description || `${displayName} agent`;

		// Gray color ANSI code: \x1b[90m, Reset: \x1b[0m
		const pathInfo = `\x1b[90m(${protocolFilename}, ${agentDir}/${commandsDir})\x1b[0m`;

		return {
			name: `${displayName} ${pathInfo}`,
			value: agentType as AgentType,
			description: finalDescription,
		};
	});

	const answer = await select<AgentType>({
		message: "Select your coding agent:",
		choices: choices,
		default: "opencode",
		loop: true,
	});

	return answer;
}

/**
 * Prompt user to configure git ignore settings.
 * Returns the selected method or undefined to skip.
 */
export async function promptForGitIgnore(): Promise<
	GitIgnoreMethod | undefined
> {
	const choices = [
		{
			name: "Add to .gitignore",
			value: "gitignore" as const,
			description: "Add Conductor entries to the project's .gitignore file",
		},
		{
			name: "Add to .git/info/exclude",
			value: "exclude" as const,
			description:
				"Add Conductor entries to .git/info/exclude (local only, not shared)",
		},
		{
			name: "Remove existing entries",
			value: "none" as const,
			description:
				"Remove Conductor entries from both .gitignore and .git/info/exclude",
		},
		{
			name: "Don't configure git ignore",
			value: undefined,
			description: "Skip git ignore configuration",
		},
	];

	const answer = await select<GitIgnoreMethod | undefined>({
		message: "Configure git ignore for Conductor files?",
		choices: choices,
		default: undefined,
	});

	return answer;
}
