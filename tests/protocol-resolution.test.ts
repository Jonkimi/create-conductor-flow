
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfigurableGenerator } from '../src/generators/ConfigurableGenerator.js';
import fs from 'fs-extra';
import select from '@inquirer/select';
import { join } from 'path';
import * as templateUtils from '../src/utils/template.js';

// Mock dependencies
vi.mock('fs-extra');
vi.mock('@inquirer/select');
vi.mock('../src/utils/template.js');

describe('ConfigurableGenerator - Protocol Resolution', () => {
    const mockTargetDir = '/mock/target';
    const mockTemplateRoot = '/mock/templates';
    
    // Default config for testing
    const baseConfig = {
        agentType: 'test-agent',
        agentDir: '.test-agent',
        commandsDir: 'commands',
        displayName: 'Test Agent',
    };

    beforeEach(() => {
        vi.resetAllMocks();
        // Setup default mocks
        vi.mocked(templateUtils.getTemplateRoot).mockResolvedValue(mockTemplateRoot);
        vi.mocked(templateUtils.loadTemplate).mockResolvedValue('template content');
        vi.mocked(fs.ensureDir).mockResolvedValue(undefined);
        vi.mocked(fs.copy).mockResolvedValue(undefined);
        vi.mocked(fs.writeFile).mockResolvedValue(undefined);
        // Default to file not existing (no overwrite prompt needed usually)
        vi.mocked(fs.existsSync).mockReturnValue(false);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should copy GEMINI.md to protocolFilename in project root if configured', async () => {
        const config = { ...baseConfig, protocolFilename: 'TEST_PROTOCOL.md' };
        const generator = new ConfigurableGenerator(config);

        vi.mocked(fs.existsSync).mockImplementation((path) => {
            if (path === mockTargetDir) return true;
            // Source must exist
            if (path === join(mockTemplateRoot, 'GEMINI.md')) return true;
            if (path === join(mockTargetDir, 'TEST_PROTOCOL.md')) return false;
            return false;
        });

        await generator.generate(mockTargetDir);

        expect(fs.copy).toHaveBeenCalledWith(
            join(mockTemplateRoot, 'GEMINI.md'),
            join(mockTargetDir, 'TEST_PROTOCOL.md')
        );
    });

    it('should prompt for overwrite if protocol file exists', async () => {
        const config = { ...baseConfig, protocolFilename: 'EXISTING_PROTOCOL.md' };
        const generator = new ConfigurableGenerator(config);

        vi.mocked(fs.existsSync).mockImplementation((path) => {
            if (path === mockTargetDir) return true;
            if (path === join(mockTemplateRoot, 'GEMINI.md')) return true;
            // Dest exists too
            if (path === join(mockTargetDir, 'EXISTING_PROTOCOL.md')) return true;
            return false;
        });

        // Mock user saying YES to overwrite
        vi.mocked(select).mockResolvedValue(true as any);

        await generator.generate(mockTargetDir);

        // Should have prompted
        expect(select).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.stringContaining('overwrite'),
        }));

        // Should have copied
        expect(fs.copy).toHaveBeenCalledWith(
            join(mockTemplateRoot, 'GEMINI.md'),
            join(mockTargetDir, 'EXISTING_PROTOCOL.md')
        );
    });

    it('should skip copying if user declines overwrite', async () => {
        const config = { ...baseConfig, protocolFilename: 'SKIPPED_PROTOCOL.md' };
        const generator = new ConfigurableGenerator(config);

        vi.mocked(fs.existsSync).mockImplementation((path) => {
            if (path === mockTargetDir) return true;
            if (path === join(mockTemplateRoot, 'GEMINI.md')) return true;
            // Dest exists
            if (path === join(mockTargetDir, 'SKIPPED_PROTOCOL.md')) return true;
            return false;
        });

        // Mock user saying NO to overwrite
        vi.mocked(select).mockResolvedValue(false as any);

        await generator.generate(mockTargetDir);

        // Should have prompted
        expect(select).toHaveBeenCalled();

        // Should NOT have copied target file
        // Note: fs.copy is still called for templates dir, so we verify specific args not called
        expect(fs.copy).not.toHaveBeenCalledWith(
            join(mockTemplateRoot, 'GEMINI.md'),
            join(mockTargetDir, 'SKIPPED_PROTOCOL.md')
        );
    });

    it('should NOT copy anything if protocolFilename is undefined', async () => {
        const config = { ...baseConfig, protocolFilename: undefined };
        const generator = new ConfigurableGenerator(config);

        vi.mocked(fs.existsSync).mockReturnValue(true); // target dir exists

        await generator.generate(mockTargetDir);

        // Should check for GEMINI.md copy? No.
        // We verify calls to fs.copy. 
        // Note: fs.copy IS called for 'templates' dir, so we need to be specific.
        
        // Assert it was NOT called for GEMINI.md
        expect(fs.copy).not.toHaveBeenCalledWith(
            join(mockTemplateRoot, 'GEMINI.md'),
            expect.any(String)
        );
    });
});
