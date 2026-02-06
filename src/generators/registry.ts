import { AgentConfig } from "./types.js";
import { opencodeConfig } from "./opencode/config.js";
import { claudeCodeConfig } from "./claude-code/config.js";
import { antigravityConfig } from "./antigravity/config.js";
import { cursorConfig } from "./cursor/config.js";
import { githubCopilotConfig } from "./github-copilot/config.js";
import { codexConfig } from "./codex/config.js";
import { windsurfConfig } from "./windsurf/config.js";
import { clineConfig } from "./cline/config.js";
import { geminiConfig } from "./gemini/config.js";
import { kilocodeConfig } from "./kilocode/config.js";
import { rooCodeConfig } from "./roocode/config.js";
import { qwenCodeConfig } from "./qwencode/config.js";
import { factoryDroidConfig } from "./factorydroid/config.js";

export const ALL_AGENT_CONFIGS: AgentConfig[] = [
	// help command output agent order
	opencodeConfig,
	claudeCodeConfig,
	antigravityConfig,
	cursorConfig,
	githubCopilotConfig,
	codexConfig,
	windsurfConfig,
	clineConfig,
	kilocodeConfig,
	rooCodeConfig,
	qwenCodeConfig,
	factoryDroidConfig,
	geminiConfig,
];
