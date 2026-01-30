import { describe, it, expect, vi } from 'vitest';

// Mock the install command handler to prevent execution
vi.mock('../src/commands/install.js', () => ({
  installHandler: vi.fn(),
}));

import { cli } from '../src/cli/index.js';

describe('CLI Structure', () => {
  it('should parse install command with repo and branch options', async () => {
    // We can simulate parsing arguments using the yargs instance
    const args = await cli.parse('install . --repo https://github.com/test/repo --branch test-branch', {}, (err, argv, output) => {
        // Prevent yargs from printing to console or exiting
    });

    expect(args.repo).toBe('https://github.com/test/repo');
    expect(args.branch).toBe('test-branch');
  });

  it('should parse install command with short aliases -r and -b', async () => {
    const args = await cli.parse('install . -r https://github.com/test/repo -b test-branch', {}, (err, argv, output) => {
    });

    expect(args.repo).toBe('https://github.com/test/repo');
    expect(args.branch).toBe('test-branch');
  });
});
