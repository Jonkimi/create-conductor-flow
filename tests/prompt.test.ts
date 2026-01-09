
import { describe, it, expect, vi } from 'vitest';
import { promptForAgent } from '../src/cli/prompt.js';
import select from '@inquirer/select';

// Mock the @inquirer/select module
vi.mock('@inquirer/select', () => ({
  default: vi.fn(),
}));

describe('CLI Prompts', () => {
  it('should include Antigravity in options', async () => {
    vi.mocked(select).mockResolvedValue('antigravity');

    await promptForAgent();

    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;

    const antigravityChoice = choices.find(c => c.value === 'antigravity');
    expect(antigravityChoice).toBeDefined();
    expect(antigravityChoice?.name).toBe('Antigravity');
  });

  it('should include Windsurf in options', async () => {
    vi.mocked(select).mockResolvedValue('windsurf');

    await promptForAgent();

    const callArgs = vi.mocked(select).mock.calls[0][0];
    const choices = callArgs.choices as Array<{ name: string; value: string }>;

    const windsurfChoice = choices.find(c => c.value === 'windsurf');
    expect(windsurfChoice).toBeDefined();
    expect(windsurfChoice?.name).toBe('Windsurf');
  });
});
