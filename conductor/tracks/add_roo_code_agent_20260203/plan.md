# Plan: Add Roo Code Agent Support

This plan outlines the steps to integrate "Roo Code" as a supported AI agent in the Conductor framework.

## Phase 1: Foundation & Type System [checkpoint: e93f83a]

- [x] Task: Update `src/types.ts` - Add `roo-code` to `AgentType` union.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Type System' (Protocol in workflow.md)

## Phase 2: Roo Code Generator Implementation

- [ ] Task: Write failing tests for Roo Code configuration and generator (`tests/generators/RooCodeGenerator.test.ts`, etc.).
- [ ] Task: Implement Roo Code generator in `src/generators/roo-code/` (including `config.ts`, `generator.ts`, `strategy.ts`, and `index.ts`).
- [ ] Task: Register Roo Code in `src/generators/registry.ts` and `src/generators/index.ts`.
- [ ] Task: Implement code to pass tests and verify.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Roo Code Generator Implementation' (Protocol in workflow.md)

## Phase 3: CLI & UI Integration

- [ ] Task: Write failing tests for CLI agent selection and options.
- [ ] Task: Update `src/cli/index.ts` and `src/conductor-install.ts` to include `roo-code` in CLI choices.
- [ ] Task: Verify Roo Code appears in the interactive prompt.
- [ ] Task: Implement code to pass tests and verify.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: CLI & UI Integration' (Protocol in workflow.md)

## Phase 4: Documentation Update

- [ ] Task: Update multilingual README files (`README.md`, `README_zh.md`, `README_ja.md`, `README_ko.md`) with Roo Code details.
- [ ] Task: Verify formatting and links across all updated documentation.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Documentation Update' (Protocol in workflow.md)
