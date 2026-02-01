import type { AgentConfig } from "../types.js";

export const codexConfig: AgentConfig = {
	agentType: "codex",
	agentDir: ".codex",
	commandsDir: "prompts",
	displayName: "Codex",
	protocolFilename: "AGENTS.md",
	description: "OpenAI Codex Agent",
	extension: ".md",
};
