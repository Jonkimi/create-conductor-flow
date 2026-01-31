# Implementation Plan: Rename Project to conductor-install

## Phase 1: Core Package Renaming

- [x] Task: Update package.json with new package name (a0b334a)
    - [x] Change `name` from `conductor-4-all` to `conductor-install`
    - [x] Update `repository.url` to reflect new name if needed
    - [x] Add `conductor-install` to the `bin` field

- [x] Task: Create conductor-install entry point (a0b334a)
    - [x] Create `src/conductor-install.ts` that directly invokes install logic
    - [x] Parse CLI arguments matching `conductor install` options
    - [x] Display welcome banner and execute install handler

- [x] Task: Update bin configuration in package.json (a0b334a)
    - [x] Keep `conductor` pointing to `./dist/index.js` (existing behavior)
    - [x] Keep `conductor-4-all` pointing to `./dist/index.js` (backward compatibility)
    - [x] Add `conductor-install` pointing to new entry point

- [x] Task: Conductor - User Manual Verification 'Phase 1: Core Package Renaming' (Protocol in workflow.md)

## Phase 2: Build System and Testing

- [x] Task: Update build configuration (a0b334a)
    - [x] Update `tsup.config.ts` to include new entry point
    - [x] Ensure `conductor-install` binary is built correctly

- [x] Task: Write tests for conductor-install command (a0b334a)
    - [x] Test that `conductor-install` executes install logic
    - [x] Test that CLI arguments are parsed correctly
    - [x] Test help output for `conductor-install --help`

- [x] Task: Run full test suite and verify coverage (a0b334a)
    - [x] Ensure all existing tests pass (176 tests passed)
    - [x] Verify coverage remains >80%

- [x] Task: Conductor - User Manual Verification 'Phase 2: Build System and Testing' (Protocol in workflow.md)

## Phase 3: Documentation and Cleanup

- [x] Task: Update README.md
    - [x] Update package name references
    - [x] Update installation instructions to use `npx conductor-install`
    - [x] Update usage examples

- [x] Task: Update any internal documentation or comments
    - [x] Search for references to `conductor-4-all` and update as needed
    - [x] ASCII banner kept as is (CONDUCTOR 4 ALL brand)

- [ ] Task: Conductor - User Manual Verification 'Phase 3: Documentation and Cleanup' (Protocol in workflow.md)
