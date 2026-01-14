import { clineConfig } from './config.js';
import { createGenerator } from '../factory.js';
import type { AgentGenerator } from '../types.js';

/**
 * Cline agent generator.
 * This is a wrapper that delegates to configuration-driven generator.
 */
export class ClineGenerator implements AgentGenerator {
    private readonly generator = createGenerator(clineConfig);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
