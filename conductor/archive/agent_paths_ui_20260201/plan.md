# Plan: Display Agent Paths in Selection

## Phase 1: Generator Registry Refactor
- [x] Task: Create `src/generators/registry.ts`
    - [x] Create central registry file
    - [x] Import and export all individual agent configs
- [x] Task: Refactor usage
    - [x] Ensure `ConfigurableGenerator` or other consumers can use this registry if needed (or just use it for the prompt)
    - [x] Conductor - User Manual Verification 'Generator Registry Refactor' (Protocol in workflow.md)

## Phase 2: CLI Prompt Update
- [x] Task: Update `src/cli/prompt.ts`
    - [x] Import `ALL_AGENT_CONFIGS` from registry (or similar)
    - [x] Update `promptForAgent` to build choices dynamically
    - [x] Format label: `Agent Name (protocolFilename, agentDir/commandsDir)`
    - [x] Apply gray styling (check for existing color utility or use standard ANSI/chalk)
- [x] Task: Verify functionality
    - [x] Create or update `src/cli/prompt.test.ts`
    - [x] Manual verification via `node dist/conductor-install.js`

## Phase 3: Prompt Refinement (User Feedback)
- [x] Task: Move descriptions to `AgentConfig`
    - [x] Update `src/generators/types.ts`
    - [x] Update all `src/generators/*/config.ts`
- [x] Task: Sort agent list alphabetically
    - [x] Update `src/cli/prompt.ts`
    - [x] REVERTED: User requested original order
- [x] Task: Conductor - User Manual Verification 'CLI Prompt Refinement' (Protocol in workflow.md)
