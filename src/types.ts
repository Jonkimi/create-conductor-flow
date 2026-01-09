export type AgentType = 'opencode' | 'claude-code' | 'antigravity' | 'cursor' | 'vscode-copilot' | 'codex';

export interface ProjectConfig {
  agentType: AgentType;
  targetDir: string;
}
