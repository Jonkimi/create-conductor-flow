import type { AgentConfig } from "../types.js";
import { kilocodeContentStrategy } from "./strategy.js";

export const kilocodeConfig: AgentConfig = {
	agentType: "kilo-code",
	agentDir: ".kilocode",
	commandsDir: "workflows",
	displayName: "Kilo Code",
	protocolFilename: "AGENTS.md",
	description: "Kilo Code AI coding assistant",
	strategy: {
		content: kilocodeContentStrategy,
	},
};
