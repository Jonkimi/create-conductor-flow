import { opencodeConfig } from './config.js';
import { createGenerator } from '../factory.js';
import type { AgentGenerator } from '../types.js';
import type { InstallScope } from '../../types.js';

/**
 * OpenCode agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class OpenCodeGenerator implements AgentGenerator {
    private readonly generator = createGenerator(opencodeConfig);

    validate(targetDir: string, scope?: InstallScope): Promise<string> {
        return this.generator.validate(targetDir, scope);
    }

    generate(targetDir: string, scope?: InstallScope, repo?: string, branch?: string, force?: boolean): Promise<void> {
        return this.generator.generate(targetDir, scope, repo, branch, force);
    }
}
