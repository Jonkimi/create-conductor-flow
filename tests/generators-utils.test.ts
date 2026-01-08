
import { describe, it, expect } from 'vitest';
import { processTemplateContent } from '../src/generators/ConfigurableGenerator.js';

describe('processTemplateContent', () => {
  it('should process TOML content and substitute variables', () => {
    const tomlContent = 'prompt = "Hello {agent_type}, install at __$$CODE_AGENT_INSTALL_PATH$$__"';
    const installPath = '/path/to/install';
    const agentType = 'opencode';

    const result = processTemplateContent(tomlContent, installPath, agentType);
    expect(result).toBe('Hello opencode, install at /path/to/install');
  });

  it('should return null if no prompt is found', () => {
    const tomlContent = 'description = "Just description"';
    const result = processTemplateContent(tomlContent, '/path', 'opencode');
    expect(result).toBeNull();
  });

  it('should prepend description metadata if present', () => {
    const tomlContent = `
description = "My Command"
prompt = "Execute this"
`;
    const result = processTemplateContent(tomlContent, '/path', 'opencode');
    expect(result).toContain('---\ndescription: My Command\n---');
    expect(result).toContain('Execute this');
  });
});
