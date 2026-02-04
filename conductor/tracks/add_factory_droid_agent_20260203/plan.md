# Plan: Add Factory Droid Coding Agent Type

## Phase 1: Foundation & Registry
- [x] Task: Create `src/generators/factorydroid/` directory structure. [a4cd0c3]
- [x] Task: Define Factory Droid configuration in `src/generators/factorydroid/config.ts`. [a4cd0c3]
- [ ] Task: Register `factoryDroidConfig` in `src/generators/registry.ts`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Registry' (Protocol in workflow.md)

## Phase 2: Generator Implementation (TDD)
- [ ] Task: Write failing unit tests for `FactoryDroidGenerator` in `tests/generators/FactoryDroidGenerator.test.ts`.
- [ ] Task: Implement `FactoryDroidGenerator` in `src/generators/factorydroid/generator.ts` (inheriting from `ConfigurableGenerator`).
- [ ] Task: Verify tests pass and coverage is maintained.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Generator Implementation' (Protocol in workflow.md)

## Phase 3: CLI Integration & Final Verification
- [ ] Task: Verify Factory Droid appears in the `conductor install` agent selection list.
- [ ] Task: Perform end-to-end installation test for Factory Droid (local and global).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: CLI Integration & Final Verification' (Protocol in workflow.md)
