import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClineGenerator } from '../../src/generators/ClineGenerator.js';
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

describe('ClineGenerator', () => {
    let generator: ClineGenerator;
    const targetDir = '/mock/target';

    beforeEach(() => {
        vi.resetAllMocks();
        generator = new ClineGenerator();
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
            await expect(generator.validate(targetDir)).rejects.toThrow('Conductor (Cline) is already installed');
        });
    });

    describe('generate', () => {
        it('should create directories and files', async () => {
             // Mock TOML content
             (loadTemplate as any).mockResolvedValue('prompt = "some prompt"');

             await generator.generate(targetDir);

             expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('.clinerules/workflows'));
             expect(fs.writeFile).toHaveBeenCalled();
        });

        it('should generate command files with plain markdown format', async () => {
            const mockToml = 'description = "Test command"\nprompt = "Test prompt content"';
            (loadTemplate as any).mockResolvedValue(mockToml);

            await generator.generate(targetDir);

            expect(fs.writeFile).toHaveBeenCalled();
            const writeCalls = (fs.writeFile as any).mock.calls;
            const setupCall = writeCalls.find((call: any) =>
                call[0].includes('conductor:setup.md')
            );

            expect(setupCall).toBeDefined();
            const content = setupCall[1];
            expect(content).toMatch(/^# Conductor Setup\n/);
            expect(content).not.toMatch(/^---/);
            expect(content).toContain('Test command');
            expect(content).toContain('Test prompt content');
        });
    });
 });
