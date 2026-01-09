import type { AgentGenerator } from './types.js';
import { createGenerator } from './factory.js';
import { AGENT_CONFIGS } from './config.js';

/**
 * Codex agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class CodexGenerator implements AgentGenerator {
    private readonly generator = createGenerator(AGENT_CONFIGS.codex);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
