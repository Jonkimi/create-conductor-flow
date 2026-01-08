import type { AgentGenerator } from './types.js';
import { createGenerator } from './factory.js';
import { AGENT_CONFIGS } from './config.js';

/**
 * Claude Code agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class ClaudeCodeGenerator implements AgentGenerator {
    private readonly generator = createGenerator(AGENT_CONFIGS['claude-code']);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
