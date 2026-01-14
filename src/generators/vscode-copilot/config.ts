import type { AgentConfig } from '../types.js';
import { vscodeCopilotContentStrategy } from './strategy.js';

export const vscodeCopilotConfig: AgentConfig = {
  agentType: 'vscode-copilot',
  agentDir: '.github',
  commandsDir: 'prompts',
  displayName: 'VS Code Copilot',
  extension: '.prompt.md',
  fixedAgent: 'agent',
  strategy: {
    content: vscodeCopilotContentStrategy
  }
};
