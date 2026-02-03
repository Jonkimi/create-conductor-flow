import { AgentConfig } from "./types.js";
import { opencodeConfig } from "./opencode/config.js";
import { claudeCodeConfig } from "./claude-code/config.js";
import { antigravityConfig } from "./antigravity/config.js";
import { cursorConfig } from "./cursor/config.js";
import { vscodeCopilotConfig } from "./vscode-copilot/config.js";
import { codexConfig } from "./codex/config.js";
import { windsurfConfig } from "./windsurf/config.js";
import { clineConfig } from "./cline/config.js";
import { geminiConfig } from "./gemini/config.js";
import { kilocodeConfig } from "./kilocode/config.js";
import { rooCodeConfig } from "./roo-code/config.js";

export const ALL_AGENT_CONFIGS: AgentConfig[] = [
	opencodeConfig,
	claudeCodeConfig,
	antigravityConfig,
	cursorConfig,
	vscodeCopilotConfig,
	codexConfig,
	windsurfConfig,
	clineConfig,
	kilocodeConfig,
	rooCodeConfig,
	geminiConfig,
];
