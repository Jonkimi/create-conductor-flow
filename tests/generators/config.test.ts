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

        it('should have all required fields for each config', () => {
            const requiredFields: (keyof AgentConfig)[] = [
                'agentType',
                'agentDir',
                'commandsDir',
                'displayName'
            ];

            Object.values(AGENT_CONFIGS).forEach((config) => {
                requiredFields.forEach((field) => {
                    expect(config[field]).toBeDefined();
                    expect(typeof config[field]).toBe('string');
                    expect(config[field].length).toBeGreaterThan(0);
                });
            });
        });
    });
});
