
import { AgentType } from '../types.js';
import { AgentGenerator } from './types.js';
import { OpenCodeGenerator } from './OpenCodeGenerator.js';
import { ClaudeCodeGenerator } from './ClaudeCodeGenerator.js';
import { AntigravityGenerator } from './AntigravityGenerator.js';
import { CursorGenerator } from './CursorGenerator.js';
import { VSCodeCopilotGenerator } from './VSCodeCopilotGenerator.js';
import { CodexGenerator } from './CodexGenerator.js';
import { WindsurfGenerator } from './WindsurfGenerator.js';
import { ClineGenerator } from './ClineGenerator.js';
import { GeminiGenerator } from './GeminiGenerator.js';

export * from './types.js';
export * from './OpenCodeGenerator.js';
export * from './ClaudeCodeGenerator.js';
export * from './AntigravityGenerator.js';
export * from './CursorGenerator.js';
export * from './VSCodeCopilotGenerator.js';
export * from './CodexGenerator.js';
export * from './WindsurfGenerator.js';
export * from './ClineGenerator.js';
export * from './GeminiGenerator.js';

export function getGenerator(agentType: AgentType): AgentGenerator {
  switch (agentType) {
    case 'claude-code':
      return new ClaudeCodeGenerator();
    case 'antigravity':
      return new AntigravityGenerator();
    case 'cursor':
      return new CursorGenerator();
    case 'vscode-copilot':
      return new VSCodeCopilotGenerator();
    case 'codex':
      return new CodexGenerator();
    case 'windsurf':
      return new WindsurfGenerator();
    case 'cline':
      return new ClineGenerator();
    case 'gemini':
      return new GeminiGenerator();
    case 'opencode':
    default:
      return new OpenCodeGenerator();
  }
}
