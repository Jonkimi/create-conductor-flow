import { geminiConfig } from './config.js';
import { createGenerator } from '../factory.js';
import type { AgentGenerator } from '../types.js';
import type { InstallScope } from '../../types.js';

/**
 * Gemini agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class GeminiGenerator implements AgentGenerator {
    private readonly generator = createGenerator(geminiConfig);

    async validate(targetDir: string, scope?: InstallScope): Promise<string> {
        if (scope === 'global') {
            throw new Error('Gemini CLI agent only supports project-level installation');
        }
        return this.generator.validate(targetDir, scope);
    }

    async generate(targetDir: string, scope?: InstallScope, repo?: string, branch?: string): Promise<void> {
        if (scope === 'global') {
            throw new Error('Gemini CLI agent only supports project-level installation');
        }
        return this.generator.generate(targetDir, scope, repo, branch);
    }
}
