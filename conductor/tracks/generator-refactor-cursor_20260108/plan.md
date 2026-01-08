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

## Phase 2: Wrapper Classes Refactor [checkpoint: 825e4c4]
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
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) `825e4c4`

## Phase 3: Cursor Agent Support [checkpoint: a78c318]
- [x] Task: Add Cursor to AgentType `2b2541b`
    - [x] Write failing tests for Cursor AgentType
    - [x] Update `AgentType` type definition to include `'cursor'`
    - [x] Add Cursor configuration to `AGENT_CONFIGS`
    - [x] Verify tests pass
- [x] Task: Implement CursorGenerator wrapper `2b2541b`
    - [x] Write failing tests for CursorGenerator
    - [x] Create `CursorGenerator` class delegating to factory
    - [x] Export from `src/generators/index.ts`
    - [x] Verify tests pass
- [x] Task: Update CLI install command `2b2541b`
    - [x] Write failing tests for cursor option in agent selection
    - [x] Add 'cursor' to agent choices in install command
    - [x] Update `getGenerator()` to handle 'cursor' type
    - [x] Verify tests pass
- [x] Task: Update validateProjectDirectory for Cursor `2b2541b`
    - [x] Write failing tests for Cursor path detection
    - [x] Add Cursor agent paths to validation logic (via ConfigurableGenerator)
    - [x] Verify tests pass
- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md) `a78c318`

## Phase 4: Documentation and Cleanup
- [x] Task: Update README documentation `893f476`
    - [x] Add Cursor to supported agents list in README.md
    - [x] Add Cursor to supported agents list in README_zh.md
    - [x] Verify documentation accuracy
- [ ] Task: Final test coverage verification
    - [ ] Run full test suite with coverage
    - [ ] Ensure >80% coverage for new code
    - [ ] Fix any coverage gaps
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
