
import { describe, it, expect } from 'vitest';
import { defaultContentStrategy } from '../src/generators/default/index.js';
import { vscodeCopilotContentStrategy } from '../src/generators/vscode-copilot/index.js';

describe('Content Strategies Utilities', () => {
  it('should process TOML content and substitute variables', () => {
    const tomlContent = 'prompt = "Hello {agent_type}, install at __$$CODE_AGENT_INSTALL_PATH$$__"';
    const installPath = '/path/to/install';
    const agentType = 'opencode';

    const result = defaultContentStrategy.process(tomlContent, { installPath, agentType });
    expect(result).toBe('Hello opencode, install at /path/to/install');
  });

  it('should return null if no prompt is found', () => {
    const tomlContent = 'description = "Just description"';
    const result = defaultContentStrategy.process(tomlContent, { installPath: '/path', agentType: 'opencode' });
    expect(result).toBeNull();
  });

  it('should prepend description metadata if present', () => {
    const tomlContent = `
description = "My Command"
prompt = "Execute this"
`;
    const result = defaultContentStrategy.process(tomlContent, { installPath: '/path', agentType: 'opencode' });
    expect(result).toContain('---\ndescription: My Command\n---');
    expect(result).toContain('Execute this');
  });

  it('should use fixedAgent and omit other metadata if fixedAgent is provided', () => {
    const tomlContent = `
description = "My Command"
prompt = "Execute this"
`;
    const result = vscodeCopilotContentStrategy.process(tomlContent, { 
        installPath: '/path', 
        agentType: 'vscode-copilot', 
        fixedAgent: 'agent' 
    });
    expect(result).toBe('---\ndescription: My Command\nagent: agent\n---\nExecute this');
  });
});
