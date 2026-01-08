export type AgentType = 'opencode' | 'claude-code' | 'antigravity' | 'cursor';

export interface ProjectConfig {
  agentType: AgentType;
  targetDir: string;
}
