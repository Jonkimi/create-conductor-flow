
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { promptForInstallScope } from '../src/cli/prompt.js';
import select from '@inquirer/select';

// Mock the @inquirer/select module
vi.mock('@inquirer/select', () => ({
  default: vi.fn(),
}));

describe('Installation Scope Prompt', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

  it('should restrict Codex to Global scope', async () => {
    vi.mocked(select).mockResolvedValue('global');
    
    const scope = await promptForInstallScope('codex');
    
    expect(scope).toBe('global');
    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;
    
    expect(choices).toHaveLength(1);
    expect(choices[0].value).toBe('global');
    expect(choices[0].name).toContain('Global');
  });

  it('should restrict OpenCode to Project scope', async () => {
    vi.mocked(select).mockResolvedValue('project');

    const scope = await promptForInstallScope('opencode');

    expect(scope).toBe('project');
    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;

    expect(choices).toHaveLength(1);
    expect(choices[0].value).toBe('project');
    expect(choices[0].name).toContain('Project');
  });

  it('should restrict Cline to Project scope', async () => {
    vi.mocked(select).mockResolvedValue('project');

    const scope = await promptForInstallScope('cline');

    expect(scope).toBe('project');
    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;

    expect(choices).toHaveLength(1);
    expect(choices[0].value).toBe('project');
    expect(choices[0].name).toContain('Project');
  });
});
