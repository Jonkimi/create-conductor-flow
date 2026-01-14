
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClaudeCodeGenerator } from '../../src/generators/index.js';
import fs from 'fs-extra';

vi.mock('fs-extra');

vi.mock('../../src/utils/template.js', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = await importOriginal() as any;
    return {
        ...actual,
        loadTemplate: vi.fn(),
        getTemplateRoot: vi.fn(),
    };
});

import { loadTemplate, getTemplateRoot } from '../../src/utils/template.js';

describe('ClaudeCodeGenerator', () => {
    let generator: ClaudeCodeGenerator;
    const targetDir = '/mock/target';

    beforeEach(() => {
        vi.resetAllMocks();
        generator = new ClaudeCodeGenerator();
        (getTemplateRoot as any).mockResolvedValue('/mock/template/root');
        (fs.existsSync as any).mockReturnValue(false); 
    });

    describe('validate', () => {
        it('should return targetDir if valid', async () => {
            (fs.existsSync as any).mockImplementation((path: string) => path === targetDir);
            await expect(generator.validate(targetDir)).resolves.toBe(targetDir);
        });

        it('should throw if target directory does not exist', async () => {
             (fs.existsSync as any).mockReturnValue(false);
             await expect(generator.validate('/nonexistent')).rejects.toThrow('Target directory does not exist');
        });

        it('should throw if conductor is already installed', async () => {
            (fs.existsSync as any).mockReturnValue(true);
            await expect(generator.validate(targetDir)).rejects.toThrow('Conductor (Claude Code) is already installed');
        });
    });

    describe('generate', () => {
        it('should create directories and files', async () => {
             // Mock TOML content
             (loadTemplate as any).mockResolvedValue('prompt = "some prompt"');
             
             await generator.generate(targetDir);
             
             expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('.claude/commands'));
             expect(fs.writeFile).toHaveBeenCalled();
        });
    });
});
