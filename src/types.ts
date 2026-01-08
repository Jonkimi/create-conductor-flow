export type AgentType = 'opencode' | 'claude-code' | 'antigravity' | 'cursor' | 'vscode-copilot';

export interface ProjectConfig {
  agentType: AgentType;
  targetDir: string;
}
