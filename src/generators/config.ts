import type { AgentConfig } from './types.js';
import type { AgentType } from '../types.js';
import { opencodeConfig } from './opencode/index.js';
import { claudeCodeConfig } from './claude-code/index.js';
import { antigravityConfig } from './antigravity/index.js';
import { cursorConfig } from './cursor/index.js';
import { vscodeCopilotConfig } from './vscode-copilot/index.js';
import { codexConfig } from './codex/index.js';
import { windsurfConfig } from './windsurf/index.js';
import { clineConfig } from './cline/index.js';
import { geminiConfig } from './gemini/index.js';

/**
 * Registry of configurations for all supported agent types.
 * Each configuration defines the directory structure and naming conventions for an agent.
 */
export const AGENT_CONFIGS: Record<AgentType, AgentConfig> = {
  opencode: opencodeConfig,
  'claude-code': claudeCodeConfig,
  antigravity: antigravityConfig,
  cursor: cursorConfig,
  'vscode-copilot': vscodeCopilotConfig,
  codex: codexConfig,
  windsurf: windsurfConfig,
  cline: clineConfig,
  gemini: geminiConfig,
};
