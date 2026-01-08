import { join } from 'path';
import fs from 'fs-extra';
import { parse } from 'smol-toml';
import type { AgentGenerator, AgentConfig } from './types.js';
import { getTemplateRoot, loadTemplate, substituteVariables } from '../utils/template.js';

const { existsSync, ensureDir, writeFile, copy } = fs;

/**
 * Processes TOML template content and converts it to the agent-specific markdown format.
 * Replaces install path placeholders and agent type variables.
 */
export function processTemplateContent(
    tomlContent: string,
    installPath: string,
    agentType: string,
    fixedAgent?: string
): string | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = parse(tomlContent) as any;

    if (!parsed.prompt) {
        return null;
    }

    let prompt = parsed.prompt;
    prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
    const finalContent = substituteVariables(prompt, { agent_type: agentType });

    if (fixedAgent) {
        return `---\ndescription: ${parsed.description || ''}\nagent: ${fixedAgent}\n---\n${finalContent}`;
    }

    if (parsed.description) {
        return `---\ndescription: ${parsed.description}\n---\n${finalContent}`;
    }

    return finalContent;
}

/**
 * A generator that uses configuration to produce agent-specific output.
 * This class implements the AgentGenerator interface using a config-driven approach.
 */
export class ConfigurableGenerator implements AgentGenerator {
    constructor(private readonly config: AgentConfig) {}

    async validate(targetDir: string): Promise<string> {
        if (!existsSync(targetDir)) {
            throw new Error(`Target directory does not exist: ${targetDir}`);
        }

        const { agentDir, commandsDir, displayName } = this.config;
        const setupFile = join(targetDir, agentDir, commandsDir, 'conductor:setup.md');
        const conductorPath = join(targetDir, agentDir, 'conductor');

        if (existsSync(conductorPath) && existsSync(setupFile)) {
            throw new Error(`Conductor (${displayName}) is already installed in: ${targetDir}`);
        }

        return targetDir;
    }

    async generate(targetDir: string): Promise<void> {
        const { agentDir, commandsDir, agentType } = this.config;
        const agentPath = join(targetDir, agentDir);
        const targetCommandsDir = join(agentPath, commandsDir);
        const installPath = join(agentDir, 'conductor');

        await ensureDir(targetCommandsDir);
        await ensureDir(join(agentPath, 'conductor'));

        const templateRoot = await getTemplateRoot();
        try {
            const templateSource = join(templateRoot, 'templates');
            const templateDest = join(agentPath, 'conductor', 'templates');
            await copy(templateSource, templateDest);
        } catch (e) {
            console.warn('Failed to copy templates directory:', e);
        }

        const commands = ['setup', 'newTrack', 'implement', 'status', 'revert'];
        const extension = this.config.extension || '.md';
        const fixedAgent = this.config.fixedAgent;

        for (const cmd of commands) {
            try {
                const tomlContent = await loadTemplate(`commands/${cmd}.toml`);
                const finalContent = processTemplateContent(tomlContent, installPath, agentType, fixedAgent);

                if (finalContent) {
                    const fileName = `conductor:${cmd}${extension}`;
                    await writeFile(join(targetCommandsDir, fileName), finalContent);
                }
            } catch (e) {
                console.warn(`Failed to process ${cmd}:`, e);
            }
        }
    }
}
