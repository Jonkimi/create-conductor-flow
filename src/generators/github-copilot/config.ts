import type { AgentConfig } from "../types.js";
import { githubCopilotContentStrategy } from "./strategy.js";

export const githubCopilotConfig: AgentConfig = {
	agentType: "github-copilot",
	agentDir: ".github",
	commandsDir: "prompts",
	displayName: "Github Copilot",
	protocolFilename: "AGENTS.md",
	description: "Github Copilot's Prompt Files",
	extension: ".prompt.md",
	fixedAgent: "agent",
	strategy: {
		content: githubCopilotContentStrategy,
	},
};
