# Implementation Plan - Refactor Installation Logic into Generators

## Phase 1: Foundation & Interface Definition
- [~] Task: Define `AgentGenerator` Interface
    - [ ] Create `src/generators/types.ts`
    - [ ] Define the `AgentGenerator` interface with `validate` and `generate` methods.
- [ ] Task: Extract Shared Logic
    - [ ] Analyze `src/utils/install.ts` to identify reusable logic (directory checking, template loading, validation checks).
    - [ ] Move shared logic into composable internal utilities (e.g., `src/generators/utils.ts` or keep specific parts in `src/utils/install.ts` if appropriate for reuse).
- [ ] Task: Conductor - User Manual Verification 'Foundation & Interface Definition' (Protocol in workflow.md)

## Phase 2: Implement Generators
- [ ] Task: Implement `OpenCodeGenerator`
    - [ ] Create `src/generators/OpenCodeGenerator.ts`.
    - [ ] Implement `validate` using specific `opencode` paths.
    - [ ] Implement `generate` using specific `opencode` paths and shared utilities.
    - [ ] Write unit tests for `OpenCodeGenerator`.
- [ ] Task: Implement `ClaudeCodeGenerator`
    - [ ] Create `src/generators/ClaudeCodeGenerator.ts`.
    - [ ] Implement logic mirroring the current `claude-code` path handling.
    - [ ] Write unit tests for `ClaudeCodeGenerator`.
- [ ] Task: Implement `AntigravityGenerator`
    - [ ] Create `src/generators/AntigravityGenerator.ts`.
    - [ ] Implement logic mirroring the current `antigravity` path handling.
    - [ ] Write unit tests for `AntigravityGenerator`.
- [ ] Task: Conductor - User Manual Verification 'Implement Generators' (Protocol in workflow.md)

## Phase 3: Integration & Switchover
- [ ] Task: Create Generator Factory
    - [ ] Create `src/generators/index.ts` (or `factory.ts`) to export a function `getGenerator(agentType: AgentType): AgentGenerator`.
- [ ] Task: Refactor Command Consumption
    - [ ] Locate usage of `validateProjectDirectory`, `createConductorDirectories`, and `copyTemplateFiles` (likely in `src/commands/setup.ts` or similar).
    - [ ] Replace procedural calls with `getGenerator(type).validate()` and `getGenerator(type).generate()`.
- [ ] Task: Clean up Legacy Code
    - [ ] Remove deprecated functions from `src/utils/install.ts` once fully replaced.
- [ ] Task: Conductor - User Manual Verification 'Integration & Switchover' (Protocol in workflow.md)
