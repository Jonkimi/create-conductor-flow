import { parse } from 'smol-toml';
import { substituteVariables } from '../../utils/template.js';
import type { ContentStrategy, ContentStrategyOptions } from '../types/strategies.js';

export class VsCodeCopilotContentStrategy implements ContentStrategy {
  process(templateContent: string, options: ContentStrategyOptions): string | null {
    const { installPath, agentType, fixedAgent } = options;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = parse(templateContent) as any;

    if (!parsed.prompt) {
      return null;
    }

    let prompt = parsed.prompt;
    prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
    const finalContent = substituteVariables(prompt, { agent_type: agentType });

    return `---\ndescription: ${parsed.description || ''}\nagent: ${fixedAgent}\n---\n${finalContent}`;
  }
}

export const vscodeCopilotContentStrategy = new VsCodeCopilotContentStrategy();
