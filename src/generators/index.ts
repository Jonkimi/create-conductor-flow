
import { AgentType } from '../types.js';
import { AgentGenerator } from './types.js';
import { OpenCodeGenerator } from './OpenCodeGenerator.js';
import { ClaudeCodeGenerator } from './ClaudeCodeGenerator.js';
import { AntigravityGenerator } from './AntigravityGenerator.js';

export * from './types.js';
export * from './OpenCodeGenerator.js';
export * from './ClaudeCodeGenerator.js';
export * from './AntigravityGenerator.js';

export function getGenerator(agentType: AgentType): AgentGenerator {
  switch (agentType) {
    case 'claude-code':
      return new ClaudeCodeGenerator();
    case 'antigravity':
      return new AntigravityGenerator();
    case 'opencode':
    default:
      return new OpenCodeGenerator();
  }
}
