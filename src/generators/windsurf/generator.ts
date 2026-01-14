import { windsurfConfig } from './config.js';
import { createGenerator } from '../factory.js';
import type { AgentGenerator } from '../types.js';

/**
 * Windsurf agent generator.
 * This is a wrapper that delegates to configuration-driven generator.
 */
export class WindsurfGenerator implements AgentGenerator {
    private readonly generator = createGenerator(windsurfConfig);

    validate(targetDir: string): Promise<string> {
        return this.generator.validate(targetDir);
    }

    generate(targetDir: string): Promise<void> {
        return this.generator.generate(targetDir);
    }
}
