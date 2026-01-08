
import { join } from 'path';
import fs from 'fs-extra';
import { AgentGenerator } from './types.js';
import { processTemplateContent } from './utils.js';
import { getTemplateRoot, loadTemplate } from '../utils/template.js';

const { existsSync, ensureDir, writeFile, copy } = fs;

export class AntigravityGenerator implements AgentGenerator {
  async validate(targetDir: string): Promise<string> {
    if (!existsSync(targetDir)) {
      throw new Error(`Target directory does not exist: ${targetDir}`);
    }

    const agentDir = '.agent';
    const setupFile = join(targetDir, agentDir, 'workflows', 'conductor:setup.md');
    const conductorPath = join(targetDir, agentDir, 'conductor');

    if (existsSync(conductorPath) && existsSync(setupFile)) {
      throw new Error(`Conductor (antigravity) is already installed in: ${targetDir}`);
    }

    return targetDir;
  }

  async generate(targetDir: string): Promise<void> {
    const agentDir = '.agent';
    const commandsDir = 'workflows';
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
    for (const cmd of commands) {
      try {
        const tomlContent = await loadTemplate(`commands/${cmd}.toml`);
        const finalContent = processTemplateContent(tomlContent, installPath, 'antigravity');
        
        if (finalContent) {
             const fileName = `conductor:${cmd}.md`;
             await writeFile(join(targetCommandsDir, fileName), finalContent);
        }
      } catch (e) {
        console.warn(`Failed to process ${cmd}:`, e);
      }
    }
  }
}
