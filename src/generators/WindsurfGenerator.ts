import type { AgentGenerator } from './types.js';
import { createGenerator } from './factory.js';
import { AGENT_CONFIGS } from './config.js';

/**
 * Windsurf agent generator.
 * This is a wrapper that delegates to configuration-driven generator.
 */
export class WindsurfGenerator implements AgentGenerator {
    private readonly generator = createGenerator(AGENT_CONFIGS.windsurf);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
