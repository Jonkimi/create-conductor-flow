import type { AgentConfig } from '../types.js';
import { clineContentStrategy } from './strategy.js';

export const clineConfig: AgentConfig = {
  agentType: 'cline',
  agentDir: '.clinerules',
  commandsDir: 'workflows',
  displayName: 'Cline',
  protocolFilename: 'AGENTS.md',
  strategy: {
    content: clineContentStrategy
  }
};
