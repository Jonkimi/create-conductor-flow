# Implementation Plan - Refactor Installation Logic into Generators

## Phase 1: Foundation & Interface Definition
- [~] Task: Define `AgentGenerator` Interface
    - [ ] Create `src/generators/types.ts`
    - [ ] Define the `AgentGenerator` interface with `validate` and `generate` methods.
- [x] Task: Extract Shared Logic 8888427
    - [ ] Analyze `src/utils/install.ts` to identify reusable logic (directory checking, template loading, validation checks).
    - [ ] Move shared logic into composable internal utilities (e.g., `src/generators/utils.ts` or keep specific parts in `src/utils/install.ts` if appropriate for reuse).
- [x] Task: Conductor - User Manual Verification 'Foundation & Interface Definition' (Protocol in workflow.md) [checkpoint: 36f812d]

## Phase 2: Implement Generators
- [x] Task: Implement `OpenCodeGenerator` 4f7da6b
    - [ ] Create `src/generators/OpenCodeGenerator.ts`.
    - [ ] Implement `validate` using specific `opencode` paths.
    - [ ] Implement `generate` using specific `opencode` paths and shared utilities.
    - [ ] Write unit tests for `OpenCodeGenerator`.
- [x] Task: Implement `ClaudeCodeGenerator` ce095a4
    - [ ] Create `src/generators/ClaudeCodeGenerator.ts`.
    - [ ] Implement logic mirroring the current `claude-code` path handling.
    - [ ] Write unit tests for `ClaudeCodeGenerator`.
- [x] Task: Implement `AntigravityGenerator` 87b35fa
    - [ ] Create `src/generators/AntigravityGenerator.ts`.
    - [ ] Implement logic mirroring the current `antigravity` path handling.
    - [ ] Write unit tests for `AntigravityGenerator`.
- [x] Task: Conductor - User Manual Verification 'Implement Generators' (Protocol in workflow.md) [checkpoint: 4a71097]

## Phase 3: Integration & Switchover
- [x] Task: Create Generator Factory 60e0ac6
    - [ ] Create `src/generators/index.ts` (or `factory.ts`) to export a function `getGenerator(agentType: AgentType): AgentGenerator`.
- [x] Task: Refactor Command Consumption fdc0c96
    - [ ] Locate usage of `validateProjectDirectory`, `createConductorDirectories`, and `copyTemplateFiles` (likely in `src/commands/setup.ts` or similar).
    - [ ] Replace procedural calls with `getGenerator(type).validate()` and `getGenerator(type).generate()`.
- [x] Task: Clean up Legacy Code 946aa3d
    - [ ] Remove deprecated functions from `src/utils/install.ts` once fully replaced.
- [x] Task: Conductor - User Manual Verification 'Integration & Switchover' (Protocol in workflow.md) [checkpoint: b8575a4]
