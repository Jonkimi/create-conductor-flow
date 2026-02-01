import type { AgentConfig } from "../types.js";
import { vscodeCopilotContentStrategy } from "./strategy.js";

export const vscodeCopilotConfig: AgentConfig = {
	agentType: "vscode-copilot",
	agentDir: ".github",
	commandsDir: "prompts",
	displayName: "VS Code Copilot",
	protocolFilename: "AGENTS.md",
	description: "VS Code Copilot's Prompt Files",
	extension: ".prompt.md",
	fixedAgent: "agent",
	strategy: {
		content: vscodeCopilotContentStrategy,
	},
};
