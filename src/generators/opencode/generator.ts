import { opencodeConfig } from './config.js';
import { createGenerator } from '../factory.js';
import type { AgentGenerator } from '../types.js';

/**
 * OpenCode agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class OpenCodeGenerator implements AgentGenerator {
    private readonly generator = createGenerator(opencodeConfig);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
