import { describe, it, expect } from 'vitest';
import { createGenerator } from '../../src/generators/factory.js';
import { ConfigurableGenerator } from '../../src/generators/ConfigurableGenerator.js';
import { AGENT_CONFIGS } from '../../src/generators/config.js';
import type { AgentConfig } from '../../src/generators/types.js';

describe('createGenerator factory function', () => {
    describe('with predefined configs', () => {
        it('should create a ConfigurableGenerator for opencode config', () => {
            const generator = createGenerator(AGENT_CONFIGS.opencode);
            expect(generator).toBeInstanceOf(ConfigurableGenerator);
        });

        it('should create a ConfigurableGenerator for claude-code config', () => {
            const generator = createGenerator(AGENT_CONFIGS['claude-code']);
            expect(generator).toBeInstanceOf(ConfigurableGenerator);
        });

        it('should create a ConfigurableGenerator for antigravity config', () => {
            const generator = createGenerator(AGENT_CONFIGS.antigravity);
            expect(generator).toBeInstanceOf(ConfigurableGenerator);
        });
    });

    describe('with custom config', () => {
        it('should create a ConfigurableGenerator with custom config', () => {
            const customConfig: AgentConfig = {
                agentType: 'custom',
                agentDir: '.custom',
                commandsDir: 'cmds',
                displayName: 'Custom Agent',
            };
            const generator = createGenerator(customConfig);
            expect(generator).toBeInstanceOf(ConfigurableGenerator);
        });
    });

    describe('generator behavior', () => {
        it('should return a generator with validate method', () => {
            const generator = createGenerator(AGENT_CONFIGS.opencode);
            expect(typeof generator.validate).toBe('function');
        });

        it('should return a generator with generate method', () => {
            const generator = createGenerator(AGENT_CONFIGS.opencode);
            expect(typeof generator.generate).toBe('function');
        });
    });
});
