import type { AgentConfig } from "../types.js";
import { qwenCodeContentStrategy } from "./strategy.js";

export const qwenCodeConfig: AgentConfig = {
	agentType: "qwen-code",
	agentDir: ".qwen",
	commandsDir: "commands",
	displayName: "Qwen Code",
	protocolFilename: "AGENTS.md",
	description: "Qwen Code AI coding assistant",
	strategy: {
		content: qwenCodeContentStrategy,
	},
};
