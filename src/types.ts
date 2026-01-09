export type AgentType = 'opencode' | 'claude-code' | 'antigravity' | 'cursor' | 'vscode-copilot' | 'codex';

export type InstallScope = 'global' | 'project';

export interface ProjectConfig {
  agentType: AgentType;
  targetDir: string;
}
