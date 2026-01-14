import { AGENT_CONFIGS } from './config.js';
import { createGenerator } from './factory.js';
import type { AgentGenerator } from './types.js';
import { InstallScope } from '../types.js';

/**
 * Gemini CLI agent generator.
 * This is a wrapper that delegates to the configuration-driven generator
 * but restricts installation to project-level only.
 */
export class GeminiGenerator implements AgentGenerator {
    private readonly generator = createGenerator(AGENT_CONFIGS.gemini);

    async validate(targetDir: string, scope?: InstallScope): Promise<string> {
        if (scope === 'global') {
            throw new Error('Gemini CLI agent only supports project-level installation');
        }
        return this.generator.validate(targetDir, scope);
    }

    async generate(targetDir: string, scope?: InstallScope): Promise<void> {
        if (scope === 'global') {
            throw new Error('Gemini CLI agent only supports project-level installation');
        }
        return this.generator.generate(targetDir, scope);
    }
}
