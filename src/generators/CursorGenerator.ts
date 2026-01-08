import type { AgentGenerator } from './types.js';
import { createGenerator } from './factory.js';
import { AGENT_CONFIGS } from './config.js';

/**
 * Cursor agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class CursorGenerator implements AgentGenerator {
    private readonly generator = createGenerator(AGENT_CONFIGS.cursor);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
