import { describe, it, expect } from 'vitest';
import { processTemplateContent } from '../../src/generators/ConfigurableGenerator.js';

describe('processTemplateContent', () => {
    const basicToml = 'description = "Test description"\nprompt = "Test prompt content"';

    it('should generate plain markdown with title for cline agent', () => {
        const result = processTemplateContent(basicToml, '.cline/conductor', 'cline', undefined, 'setup');

        expect(result).not.toBeNull();
        expect(result).toMatch(/^# Conductor Setup\n/);
        expect(result).toContain('Test description');
        expect(result).toContain('Test prompt content');
        expect(result).not.toMatch(/^---/);
    });

    it('should capitalize first letter of command name for title', () => {
        const result = processTemplateContent(basicToml, '.cline/conductor', 'cline', undefined, 'implement');

        expect(result).not.toBeNull();
        expect(result).toMatch(/^# Conductor Implement\n/);
    });

    it('should handle lowercase command name', () => {
        const result = processTemplateContent(basicToml, '.cline/conductor', 'cline', undefined, 'newtrack');

        expect(result).not.toBeNull();
        expect(result).toMatch(/^# Conductor Newtrack\n/);
    });

    it('should not add description if not present for cline', () => {
        const tomlWithoutDescription = 'prompt = "Test prompt"';
        const result = processTemplateContent(tomlWithoutDescription, '.cline/conductor', 'cline', undefined, 'status');

        expect(result).not.toBeNull();
        expect(result).toMatch(/^# Conductor Status\n/);
        expect(result).toContain('Test prompt');
    });

    it('should add frontmatter for non-cline agents with description', () => {
        const result = processTemplateContent(basicToml, '.opencode/conductor', 'opencode');

        expect(result).not.toBeNull();
        expect(result).toMatch(/^---\ndescription: Test description\n---\n/);
        expect(result).toContain('Test prompt content');
    });

    it('should add frontmatter with agent for fixedAgent', () => {
        const result = processTemplateContent(basicToml, '~/.codex/conductor', 'codex', 'agent');

        expect(result).not.toBeNull();
        expect(result).toMatch(/^---\ndescription: Test description\nagent: agent\n---\n/);
        expect(result).toContain('Test prompt content');
    });

    it('should handle missing prompt', () => {
        const tomlWithoutPrompt = 'description = "Test"';
        const result = processTemplateContent(tomlWithoutPrompt, '.cline/conductor', 'cline', undefined, 'setup');

        expect(result).toBeNull();
    });

    it('should substitute variables in prompt', () => {
        const tomlWithVariable = 'description = "Test"\nprompt = "Use {agent_type}"';
        const result = processTemplateContent(tomlWithVariable, '.cline/conductor', 'cline', undefined, 'status');

        expect(result).not.toBeNull();
        expect(result).toContain('Use cline');
    });

    it('should replace install path placeholder', () => {
        const tomlWithPath = 'description = "Test"\nprompt = "Path: __$$CODE_AGENT_INSTALL_PATH$$__"';
        const result = processTemplateContent(tomlWithPath, '.cline/conductor', 'cline', undefined, 'setup');

        expect(result).not.toBeNull();
        expect(result).toContain('Path: .cline/conductor');
    });

    it('should preserve original TOML structure for gemini agent', () => {
        const fullToml = 'description = "Test Description"\nprompt = "Use {agent_type} in __$$CODE_AGENT_INSTALL_PATH$$__"\nversion = "1.0"';
        const result = processTemplateContent(fullToml, '.gemini/conductor', 'gemini');

        expect(result).not.toBeNull();
        expect(result).toContain('description = "Test Description"');
        expect(result).toContain('prompt = "Use gemini in .gemini/conductor"');
        expect(result).toContain('version = "1.0"');
    });
});
