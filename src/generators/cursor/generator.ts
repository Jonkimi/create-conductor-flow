import { cursorConfig } from './config.js';
import { createGenerator } from '../factory.js';
import type { AgentGenerator } from '../types.js';

/**
 * Cursor agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class CursorGenerator implements AgentGenerator {
    private readonly generator = createGenerator(cursorConfig);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
