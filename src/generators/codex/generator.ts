import { homedir } from 'os';
import { codexConfig } from './config.js';
import { createGenerator } from '../factory.js';
import type { AgentGenerator } from '../types.js';
import { InstallScope } from '../../types.js';

/**
 * Codex agent generator.
 * This is a wrapper that delegates to the configuration-driven generator.
 */
export class CodexGenerator implements AgentGenerator {
    private readonly generator = createGenerator(codexConfig);

    validate(targetDir: string, scope?: InstallScope): Promise<string> {
        if (scope === 'global') {
            targetDir = homedir();
        }
        return this.generator.validate(targetDir, scope);
    }

    generate(targetDir: string, scope?: InstallScope): Promise<void> {
        if (scope === 'global') {
            targetDir = homedir();
        }
        return this.generator.generate(targetDir, scope);
    }
}
