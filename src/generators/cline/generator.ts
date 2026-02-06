import { clineConfig } from './config.js';
import { createGenerator } from '../factory.js';
import type { AgentGenerator } from '../types.js';
import type { InstallScope } from '../../types.js';

/**
 * Cline agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class ClineGenerator implements AgentGenerator {
    private readonly generator = createGenerator(clineConfig);

    validate(targetDir: string, scope?: InstallScope): Promise<string> {
        return this.generator.validate(targetDir, scope);
    }

    generate(targetDir: string, scope?: InstallScope, repo?: string, branch?: string, force?: boolean): Promise<void> {
        return this.generator.generate(targetDir, scope, repo, branch, force);
    }
}
