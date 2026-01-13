import type { AgentConfig } from './types.js';
import type { AgentType } from '../types.js';

/**
 * Registry of configurations for all supported agent types.
 * Each configuration defines the directory structure and naming conventions for an agent.
 */
export const AGENT_CONFIGS: Record<AgentType, AgentConfig> = {
  opencode: {
    agentType: 'opencode',
    agentDir: '.opencode',
    commandsDir: 'commands',
    displayName: 'OpenCode',
  },
  'claude-code': {
    agentType: 'claude-code',
    agentDir: '.claude',
    commandsDir: 'commands',
    displayName: 'Claude Code',
  },
  antigravity: {
    agentType: 'antigravity',
    agentDir: '.agent',
    commandsDir: 'workflows',
    displayName: 'Antigravity',
  },
  cursor: {
    agentType: 'cursor',
    agentDir: '.cursor',
    commandsDir: 'commands',
    displayName: 'Cursor',
  },
  'vscode-copilot': {
    agentType: 'vscode-copilot',
    agentDir: '.github',
    commandsDir: 'prompts',
    displayName: 'VS Code Copilot',
    extension: '.prompt.md',
    fixedAgent: 'agent',
  },
  codex: {
    agentType: 'codex',
    agentDir: '.codex',
    commandsDir: 'prompts',
    displayName: 'Codex',
    extension: '.md',
  },
  windsurf: {
    agentType: 'windsurf',
    agentDir: '.windsurf',
    commandsDir: 'workflows',
    displayName: 'Windsurf',
  },
  cline: {
    agentType: 'cline',
    agentDir: '.clinerules',
    commandsDir: 'workflows',
    displayName: 'Cline',
  },
};
