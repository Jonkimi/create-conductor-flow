import select from '@inquirer/select';
import { AgentType, InstallScope } from '../types.js';

export async function promptForInstallScope(agent: AgentType): Promise<InstallScope> {
  const isCodex = agent === 'codex';
  const isCline = agent === 'cline';

  const choices = isCodex
    ? [{ name: 'Global (User Home Directory)', value: 'global' as const }]
    : [{ name: 'Project (Current Directory)', value: 'project' as const }];

  // Use a type assertion to satisfy the select generic if needed,
  // though it implies the return type based on values.
  const answer = await select<InstallScope>({
    message: 'Select installation method:',
    choices: choices,
    default: isCodex ? 'global' : 'project',
  });

  return answer;
}

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
      {
        name: 'Codex',
        value: 'codex',
        description: "OpenAI Codex Agent",
      },
      {
        name: 'Windsurf',
        value: 'windsurf',
        description: "Windsurf Cascade AI Agent",
      },
      {
        name: 'Cline',
        value: 'cline',
        description: "Cline AI coding assistant",
      },
      {
        name: 'Gemini CLI',
        value: 'gemini',
        description: "Google Gemini CLI agent",
      },
    ],
    default: 'opencode',
  });
  
  return answer;
}
