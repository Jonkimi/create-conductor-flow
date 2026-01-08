
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installHandler } from '../src/commands/install.js';
import * as promptModule from '../src/cli/prompt.js';
import * as generatorFactory from '../src/generators/index.js';

vi.mock('../src/cli/prompt.js');
vi.mock('../src/generators/index.js', () => ({
    getGenerator: vi.fn(),
}));

describe('Install Command', () => {
  const mockGenerator = {
      validate: vi.fn(),
      generate: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    (generatorFactory.getGenerator as any).mockReturnValue(mockGenerator);
  });

  it('should run successful installation flow using generator', async () => {
    // Setup mocks
    const mockArgv = { path: '.', _: [], $0: 'conductor' };
    mockGenerator.validate.mockResolvedValue('/abs/path');
    vi.mocked(promptModule.promptForAgent).mockResolvedValue('opencode');
    
    // Execute
    await installHandler(mockArgv);
    
    // Verify flow
    expect(generatorFactory.getGenerator).toHaveBeenCalledWith('opencode');
    expect(mockGenerator.validate).toHaveBeenCalled(); 
    expect(mockGenerator.generate).toHaveBeenCalledWith('/abs/path');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('initialized successfully'));
  });

  it('should use agent from CLI if provided', async () => {
    // Setup mocks
    const mockArgv = { path: '.', agent: 'cursor', _: [], $0: 'conductor' };
    mockGenerator.validate.mockResolvedValue('/abs/path');
    
    // Execute
    await installHandler(mockArgv as any);
    
    // Verify flow - promptForAgent should NOT be called
    expect(promptModule.promptForAgent).not.toHaveBeenCalled();
    expect(generatorFactory.getGenerator).toHaveBeenCalledWith('cursor');
    expect(mockGenerator.generate).toHaveBeenCalled();
  });

  it('should handle validation errors', async () => {
    // Setup mocks
    const mockArgv = { path: '.', _: [], $0: 'conductor' };
    mockGenerator.validate.mockRejectedValue(new Error('Validation failed'));
    vi.mocked(promptModule.promptForAgent).mockResolvedValue('opencode');
    
    // Execute
    await installHandler(mockArgv);
    
    // Verify error handling
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Installation failed'), 'Validation failed');
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(mockGenerator.generate).not.toHaveBeenCalled();
  });
});
