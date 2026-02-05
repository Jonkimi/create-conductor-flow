# Implementation Plan - Rename Conductor Prefix from Colon to Hyphen

## Phase 1: Bundle Script Updates
- [x] Task: Create a reproduction script/test case to simulate the bundle download modification logic (TDD). 1e87e93
    - [x] Create `tests/scripts/bundle-conductor.test.ts` (or similar) to mock file system interactions and verify replacement logic. 1e87e93
- [x] Task: Implement file content replacement in `scripts/bundle-conductor.ts`. 1e87e93
    - [x] Add logic to recursively find and replace `/conductor:` with `/conductor-` in all downloaded files. 1e87e93
- [x] Task: Implement file renaming in `scripts/bundle-conductor.ts`. 1e87e93
    - [x] Add logic to rename files with `:` to `-` (e.g., `conductor:setup` -> `conductor-setup`). 1e87e93
- [x] Task: Conductor - User Manual Verification 'Bundle Script Updates' (Protocol in workflow.md) 1e87e93

## Phase 2: Generator and Strategy Updates
- [x] Task: Update `ConfigurableGenerator` prefix logic. 1e87e93
    - [x] Update `src/generators/ConfigurableGenerator.ts` to use `conductor-setup.md` as the default setup filename. 1e87e93
    - [x] Retrieve and update related tests in `tests/generators/ConfigurableGenerator.test.ts` to reflect the change. 1e87e93
- [x] Task: Update `DefaultFileStrategy` naming logic. 1e87e93
    - [x] Update `src/generators/default/strategy.ts` to generate `conductor-<command>.md` instead of `conductor:<command>.md`. 1e87e93
    - [x] Retrieve and update related tests in `tests/generators/default/strategy.test.ts` to reflect the change. 1e87e93
- [x] Task: Conductor - User Manual Verification 'Generator and Strategy Updates' (Protocol in workflow.md) 1e87e93

## Phase 3: Global Updates (Tests & Documentation)
- [x] Task: Search and update all remaining unit tests. 1e87e93
    - [x] Identify any other tests referencing `conductor:` filenames. 1e87e93
    - [x] Update them to expect `conductor-` filenames. 1e87e93
- [x] Task: Update project documentation. 1e87e93
    - [x] Search all `README.md` and other documentation files for references to `conductor:` filenames or commands. 1e87e93
    - [x] Replace instances with the new `conductor-` format (e.g., replace `/conductor:newTrack` with `/conductor-newTrack` if applicable in docs, or just filename references). 1e87e93
- [x] Task: Run full test suite to ensure no regressions. 1e87e93
- [x] Task: Conductor - User Manual Verification 'Global Updates (Tests & Documentation)' (Protocol in workflow.md) 1e87e93
