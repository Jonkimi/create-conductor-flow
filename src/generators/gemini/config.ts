import type { AgentConfig } from "../types.js";
import { geminiContentStrategy, geminiFileStrategy } from "./strategy.js";

export const geminiConfig: AgentConfig = {
	agentType: "gemini",
	agentDir: ".gemini",
	commandsDir: "commands/conductor",
	displayName: "Gemini CLI",
	protocolFilename: "GEMINI.md",
	description: "Google Gemini CLI agent",
	extension: ".toml",
	usesPrefix: false,
	strategy: {
		content: geminiContentStrategy,
		file: geminiFileStrategy,
	},
};
