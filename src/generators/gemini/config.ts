import type { AgentConfig } from '../types.js';
import { geminiContentStrategy, geminiFileStrategy } from './strategy.js';

export const geminiConfig: AgentConfig = {
  agentType: 'gemini',
  agentDir: '.gemini',
  commandsDir: 'commands/conductor',
  displayName: 'Gemini CLI',
  extension: '.toml',
  strategy: {
    content: geminiContentStrategy,
    file: geminiFileStrategy
  }
};
