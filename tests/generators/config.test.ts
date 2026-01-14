import { describe, it, expect } from 'vitest';
import type { AgentConfig } from '../../src/generators/types.js';
import { AGENT_CONFIGS } from '../../src/generators/config.js';

describe('AgentConfig', () => {
    describe('AGENT_CONFIGS registry', () => {
        it('should have configuration for opencode agent', () => {
            const config = AGENT_CONFIGS.opencode;
            expect(config).toBeDefined();
            expect(config.agentType).toBe('opencode');
            expect(config.agentDir).toBe('.opencode');
            expect(config.commandsDir).toBe('commands');
            expect(config.displayName).toBe('OpenCode');
        });

        it('should have configuration for claude-code agent', () => {
            const config = AGENT_CONFIGS['claude-code'];
            expect(config).toBeDefined();
            expect(config.agentType).toBe('claude-code');
            expect(config.agentDir).toBe('.claude');
            expect(config.commandsDir).toBe('commands');
            expect(config.displayName).toBe('Claude Code');
        });

        it('should have configuration for antigravity agent', () => {
            const config = AGENT_CONFIGS.antigravity;
            expect(config).toBeDefined();
            expect(config.agentType).toBe('antigravity');
            expect(config.agentDir).toBe('.agent');
            expect(config.commandsDir).toBe('workflows');
            expect(config.displayName).toBe('Antigravity');
        });

        it('should have configuration for cursor agent', () => {
            const config = AGENT_CONFIGS.cursor;
            expect(config).toBeDefined();
            expect(config.agentType).toBe('cursor');
            expect(config.agentDir).toBe('.cursor');
            expect(config.commandsDir).toBe('commands');
            expect(config.displayName).toBe('Cursor');
        });

        it('should have configuration for windsurf agent', () => {
            const config = AGENT_CONFIGS.windsurf;
            expect(config).toBeDefined();
            expect(config.agentType).toBe('windsurf');
            expect(config.agentDir).toBe('.windsurf');
            expect(config.commandsDir).toBe('workflows');
            expect(config.displayName).toBe('Windsurf');
        });

        it('should have configuration for cline agent', () => {
            const config = AGENT_CONFIGS.cline;
            expect(config).toBeDefined();
            expect(config.agentType).toBe('cline');
            expect(config.agentDir).toBe('.clinerules');
            expect(config.commandsDir).toBe('workflows');
            expect(config.displayName).toBe('Cline');
        });

        it('should have configuration for gemini agent', () => {
            const config = AGENT_CONFIGS.gemini;
            expect(config).toBeDefined();
            expect(config.agentType).toBe('gemini');
            expect(config.agentDir).toBe('.gemini');
            expect(config.commandsDir).toBe('commands/conductor');
            expect(config.displayName).toBe('Gemini CLI');
            expect(config.extension).toBe('.toml');
        });

        it('should have all required fields for each config', () => {
            const requiredFields: (keyof AgentConfig)[] = [
                'agentType',
                'agentDir',
                'commandsDir',
                'displayName'
            ];

            Object.values(AGENT_CONFIGS).forEach((config) => {
                requiredFields.forEach((field) => {
                    const value = config[field];
                    expect(value).toBeDefined();
                    expect(typeof value).toBe('string');
                    if (typeof value === 'string') {
                        expect(value.length).toBeGreaterThan(0);
                    }
                });
            });
        });
    });
});
