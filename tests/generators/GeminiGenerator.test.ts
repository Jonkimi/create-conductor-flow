import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeminiGenerator } from '../../src/generators/GeminiGenerator.js';
import fs from 'fs-extra';
import { parse } from 'smol-toml';

vi.mock('fs-extra');

vi.mock('../../src/utils/template.js', async (importOriginal) => {
    const actual = await importOriginal() as Record<string, unknown>;
    return {
        ...actual,
        loadTemplate: vi.fn(),
        getTemplateRoot: vi.fn(),
    };
});

import { loadTemplate, getTemplateRoot } from '../../src/utils/template.js';

describe('GeminiGenerator', () => {
    let generator: GeminiGenerator;
    const targetDir = '/mock/target';

    beforeEach(() => {
        vi.resetAllMocks();
        generator = new GeminiGenerator();
        (getTemplateRoot as ReturnType<typeof vi.fn>).mockResolvedValue('/mock/template/root');
        (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(false);
    });

    describe('validate', () => {
        it('should return targetDir if valid with project scope', async () => {
            (fs.existsSync as ReturnType<typeof vi.fn>).mockImplementation(
                (path: string) => path === targetDir
            );
            await expect(generator.validate(targetDir, 'project')).resolves.toBe(targetDir);
        });

        it('should throw if target directory does not exist', async () => {
            (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(false);
            await expect(generator.validate('/nonexistent', 'project')).rejects.toThrow(
                'Target directory does not exist'
            );
        });

        it('should throw if conductor is already installed', async () => {
            (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(true);
            await expect(generator.validate(targetDir, 'project')).rejects.toThrow(
                'Conductor (Gemini CLI) is already installed'
            );
        });

        it('should throw if scope is global', async () => {
            await expect(generator.validate(targetDir, 'global')).rejects.toThrow(
                'Gemini CLI agent only supports project-level installation'
            );
        });
    });

    describe('generate', () => {
        it('should create directories based on config', async () => {
            (loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue('prompt = "some prompt"');
            (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(true);

            await generator.generate(targetDir, 'project');

            expect(fs.ensureDir).toHaveBeenCalledWith(
                expect.stringContaining('.gemini/commands')
            );
            expect(fs.ensureDir).toHaveBeenCalledWith(
                expect.stringContaining('.gemini/conductor')
            );
            
            // Verify written content is valid TOML
            const writeFileMock = fs.writeFile as any;
            const [filePath, content] = writeFileMock.mock.calls[0];
            expect(filePath).toContain('.toml');
            expect(() => parse(content)).not.toThrow();
        });

        it('should throw if scope is global during generate', async () => {
             await expect(generator.generate(targetDir, 'global')).rejects.toThrow(
                'Gemini CLI agent only supports project-level installation'
            );
        });
    });
});
