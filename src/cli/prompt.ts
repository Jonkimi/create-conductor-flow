import select from '@inquirer/select';
import { AgentType } from '../types.js';

export async function promptForAgent(): Promise<AgentType> {
  const answer = await select<AgentType>({
    message: 'Select your coding agent:',
    choices: [
      {
        name: 'OpenCode',
        value: 'opencode',
        description: 'The open source AI coding agent',
      },
      {
        name: 'Claude Code',
        value: 'claude-code',
        description: "Anthropic's coding assistant",
      },
      {
        name: 'Antigravity',
        value: 'antigravity',
        description: "Google's agentic coding assistant",
      },
      {
        name: 'Cursor',
        value: 'cursor',
        description: "Cursor IDE's AI agent",
      },
      {
        name: 'VS Code Copilot',
        value: 'vscode-copilot',
        description: "VS Code Copilot's Prompt Files",
      },
    ],
    default: 'opencode',
  });
  
  return answer;
}
