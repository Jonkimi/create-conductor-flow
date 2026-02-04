# Plan: Add Factory Droid Coding Agent Type

## Phase 1: Foundation & Registry [checkpoint: 169cbd8]
- [x] Task: Create `src/generators/factorydroid/` directory structure. [a4cd0c3]
- [x] Task: Define Factory Droid configuration in `src/generators/factorydroid/config.ts`. [a4cd0c3]
- [x] Task: Register `factoryDroidConfig` in `src/generators/registry.ts`. [dc9caec]
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Registry' (Protocol in workflow.md) 169cbd8

## Phase 2: Generator Implementation (TDD) [checkpoint: e6371e4]
- [x] Task: Write failing unit tests for `FactoryDroidGenerator` in `tests/generators/FactoryDroidGenerator.test.ts`. [e6371e4]
- [x] Task: Implement `FactoryDroidGenerator` in `src/generators/factorydroid/generator.ts` (inheriting from `ConfigurableGenerator`). [169cbd8]
- [x] Task: Verify tests pass and coverage is maintained. [e6371e4]
- [x] Task: Conductor - User Manual Verification 'Phase 2: Generator Implementation' (Protocol in workflow.md) e6371e4

## Phase 3: CLI Integration & Final Verification [checkpoint: 2f67d19]
- [x] Task: Verify Factory Droid appears in the `conductor install` agent selection list. [2f67d19]
- [x] Task: Perform end-to-end installation test for Factory Droid (local and global). [2f67d19]
- [x] Task: Conductor - User Manual Verification 'Phase 3: CLI Integration & Final Verification' (Protocol in workflow.md) 2f67d19
