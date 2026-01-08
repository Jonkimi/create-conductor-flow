
import { parse } from 'smol-toml';
import { substituteVariables } from '../utils/template.js';
import { AgentType } from '../types.js';

export function processTemplateContent(tomlContent: string, installPath: string, agentType: AgentType): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed = parse(tomlContent) as any;
        
  if (!parsed.prompt) {
       return null;
  }

  let prompt = parsed.prompt;
  prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
  let finalContent = substituteVariables(prompt, { agent_type: agentType });

  if (parsed.description) {
      finalContent = `---\ndescription: ${parsed.description}\n---\n${finalContent}`;
  }
  
  return finalContent;
}
