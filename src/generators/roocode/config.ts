import type { AgentConfig } from "../types.js";
import { rooCodeContentStrategy } from "./strategy.js";

export const rooCodeConfig: AgentConfig = {
	agentType: "roo-code",
	agentDir: ".roo",
	commandsDir: "commands",
	displayName: "Roo Code",
	protocolFilename: "AGENTS.md",
	description: "Roo Code AI coding assistant",
	strategy: {
		content: rooCodeContentStrategy,
	},
};
