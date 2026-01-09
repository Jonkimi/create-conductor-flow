
import { describe, it, expectTypeOf } from 'vitest';
import { AgentType } from '../src/types.js';

describe('AgentType Definition', () => {
  it('should include antigravity as a valid agent type', () => {
    // This test expects 'antigravity' to be assignable to AgentType
    const agent: AgentType = 'antigravity';
    expectTypeOf(agent).toMatchTypeOf<AgentType>();
  });

  it('should include vscode-copilot as a valid agent type', () => {
    const agent: AgentType = 'vscode-copilot';
    expectTypeOf(agent).toMatchTypeOf<AgentType>();
  });

  it('should include windsurf as a valid agent type', () => {
    const agent: AgentType = 'windsurf';
    expectTypeOf(agent).toMatchTypeOf<AgentType>();
  });
});
