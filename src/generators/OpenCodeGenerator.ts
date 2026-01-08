import type { AgentGenerator } from './types.js';
import { createGenerator } from './factory.js';
import { AGENT_CONFIGS } from './config.js';

/**
 * OpenCode agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class OpenCodeGenerator implements AgentGenerator {
    private readonly generator = createGenerator(AGENT_CONFIGS.opencode);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
