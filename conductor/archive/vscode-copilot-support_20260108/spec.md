# Specification: VS Code Copilot Support

## Overview
Add a new agent type `vscode-copilot` that generates VS Code Copilot Prompt Files (`.prompt.md`). These files allow users to trigger Conductor workflows directly from VS Code Copilot via slash commands.

## Functional Requirements
1.  **Add Agent Type:** Introduce `vscode-copilot` to the `AgentType` union.
2.  **Configuration:** Define `AGENT_CONFIGS` for `vscode-copilot`:
    *   **`agentDir`**: `.github` (to house both prompts and conductor assets)
    *   **`commandsDir`**: `prompts` (where `.prompt.md` files will live)
    *   **`extension`**: `.prompt.md`
3.  **Generator Implementation:**
    *   Create a `VSCodeCopilotGenerator` (similar to other wrappers).
    *   Update `getGenerator` to return this new generator.
4.  **Template Processing:**
    *   Modify or extend `processTemplateContent` to support the specific metadata format required for VS Code Copilot.
    *   The Frontmatter MUST only contain `description` and `agent`.
    *   `agent` MUST be fixed to `agent`.
    *   Exclude `model` and `tools` selections.
5.  **Installation Path:**
    *   Templates MUST be copied to **`.github/conductor/templates`**.
    *   Commands should be generated as **`.github/prompts/conductor:setup.prompt.md`**, etc. (using the `conductor:` prefix).

## Acceptance Criteria
- [ ] Running `conductor install --agent vscode-copilot` creates `.github/prompts/` and `.github/conductor/templates` directories.
- [ ] Generated files have `.prompt.md` extension (e.g., `conductor:setup.prompt.md`).
- [ ] Generated files contain frontmatter with exactly `description` and `agent: agent`.
- [ ] Workflow prompt content correctly points to `.github/conductor/templates`.
- [ ] `.github/conductor/templates` contains all required templates.
