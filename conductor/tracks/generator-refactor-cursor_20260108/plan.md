# Plan: Generator Refactor and Cursor Agent Support

## Phase 1: Core Architecture Refactor [checkpoint: 3ce2eec]
- [x] Task: Define AgentConfig interface and configuration registry `343654f`
    - [x] Write failing tests for AgentConfig type validation
    - [x] Define `AgentConfig` interface in `src/generators/types.ts`
    - [x] Create `AGENT_CONFIGS` registry with existing agents (opencode, claude-code, antigravity)
    - [x] Verify tests pass
- [x] Task: Implement ConfigurableGenerator class `e6144eb`
    - [x] Write failing tests for ConfigurableGenerator validate/generate methods
    - [x] Move `processTemplateContent()` from `src/generators/utils.ts` to generator module
    - [x] Implement `ConfigurableGenerator` class using config-driven logic
    - [x] Verify tests pass
- [x] Task: Create factory function `ec1f776`
    - [x] Write failing tests for `createGenerator()` factory function
    - [x] Implement `createGenerator(config: AgentConfig): AgentGenerator`
    - [x] Verify tests pass
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) `3ce2eec`

## Phase 2: Wrapper Classes Refactor
- [x] Task: Refactor OpenCodeGenerator as wrapper `bc89cbd`
    - [x] Write failing tests for OpenCodeGenerator delegation
    - [x] Refactor `OpenCodeGenerator` to delegate to `createGenerator()`
    - [x] Verify tests pass
- [x] Task: Refactor ClaudeCodeGenerator as wrapper `bc89cbd`
    - [x] Write failing tests for ClaudeCodeGenerator delegation
    - [x] Refactor `ClaudeCodeGenerator` to delegate to `createGenerator()`
    - [x] Verify tests pass
- [x] Task: Refactor AntigravityGenerator as wrapper `bc89cbd`
    - [x] Write failing tests for AntigravityGenerator delegation
    - [x] Refactor `AntigravityGenerator` to delegate to `createGenerator()`
    - [x] Verify tests pass
- [x] Task: Delete redundant utils file `bc89cbd`
    - [x] Remove `src/generators/utils.ts`
    - [x] Update all imports
    - [x] Verify all tests still pass
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Cursor Agent Support
- [ ] Task: Add Cursor to AgentType
    - [ ] Write failing tests for Cursor AgentType
    - [ ] Update `AgentType` type definition to include `'cursor'`
    - [ ] Add Cursor configuration to `AGENT_CONFIGS`
    - [ ] Verify tests pass
- [ ] Task: Implement CursorGenerator wrapper
    - [ ] Write failing tests for CursorGenerator
    - [ ] Create `CursorGenerator` class delegating to factory
    - [ ] Export from `src/generators/index.ts`
    - [ ] Verify tests pass
- [ ] Task: Update CLI install command
    - [ ] Write failing tests for cursor option in agent selection
    - [ ] Add 'cursor' to agent choices in install command
    - [ ] Update `getGenerator()` to handle 'cursor' type
    - [ ] Verify tests pass
- [ ] Task: Update validateProjectDirectory for Cursor
    - [ ] Write failing tests for Cursor path detection
    - [ ] Add Cursor agent paths to validation logic
    - [ ] Verify tests pass
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Documentation and Cleanup
- [ ] Task: Update README documentation
    - [ ] Add Cursor to supported agents list in README.md
    - [ ] Add Cursor to supported agents list in README_zh.md
    - [ ] Verify documentation accuracy
- [ ] Task: Final test coverage verification
    - [ ] Run full test suite with coverage
    - [ ] Ensure >80% coverage for new code
    - [ ] Fix any coverage gaps
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
