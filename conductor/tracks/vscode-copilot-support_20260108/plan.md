# Implementation Plan: VS Code Copilot Support

## Phase 1: Support `AgentType` and Configurations
- [x] Task: Update `AgentType` to include `vscode-copilot` in `src/types.ts`. 8743797
- [ ] Task: Add `vscode-copilot` configuration in `src/generators/config.ts`.
    - `agentDir`: `.github`
    - `commandsDir`: `prompts`
    - `displayName`: `VS Code Copilot`
- [ ] Task: Register `VSCodeCopilotGenerator` in `src/generators/index.ts`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Template Processing Enhancements
- [ ] Task: Extend `AgentConfig` in `src/generators/types.ts` to support optional `extension` and `frontmatterTemplate`.
- [ ] Task: Refactor `ConfigurableGenerator.ts` to use custom extensions and handle VS Code Copilot specific frontmatter.
    - Update `processTemplateContent` to optionally use a fixed `agent: agent` metadata.
    - Implementation should ensure NO `model` or `tools` are generated for `vscode-copilot`.
- [ ] Task: Create `src/generators/VSCodeCopilotGenerator.ts` as a wrapper around the enhanced `ConfigurableGenerator`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Validation and Verification
- [ ] Task: Verify directory creation and file generation logic.
    - Target: `.github/prompts/conductor:setup.prompt.md`
    - Assets: `.github/conductor/templates/`
- [ ] Task: Run existing tests and add a new integration test for `vscode-copilot` generator.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
