import type { AgentConfig } from "../types.js";
import { factoryDroidContentStrategy } from "./strategy.js";

export const factoryDroidConfig: AgentConfig = {
	agentType: "factory-droid",
	agentDir: ".factory",
	commandsDir: "commands",
	displayName: "Factory Droid",
	protocolFilename: "AGENTS.md", // Standard protocol file
	description: "Factory Droid AI coding assistant",
	strategy: {
		content: factoryDroidContentStrategy,
	},
};
