# Implementation Plan: Rename Project to conductor-install

## Phase 1: Core Package Renaming

- [~] Task: Update package.json with new package name
    - [ ] Change `name` from `conductor-4-all` to `conductor-install`
    - [ ] Update `repository.url` to reflect new name if needed
    - [ ] Add `conductor-install` to the `bin` field

- [ ] Task: Create conductor-install entry point
    - [ ] Create `src/bin/conductor-install.ts` that directly invokes install logic
    - [ ] Parse CLI arguments matching `conductor install` options
    - [ ] Display welcome banner and execute install handler

- [ ] Task: Update bin configuration in package.json
    - [ ] Keep `conductor` pointing to `./dist/index.js` (existing behavior)
    - [ ] Keep `conductor-4-all` pointing to `./dist/index.js` (backward compatibility)
    - [ ] Add `conductor-install` pointing to new entry point

- [ ] Task: Conductor - User Manual Verification 'Phase 1: Core Package Renaming' (Protocol in workflow.md)

## Phase 2: Build System and Testing

- [ ] Task: Update build configuration
    - [ ] Update `tsup.config.ts` to include new entry point
    - [ ] Ensure `conductor-install` binary is built correctly

- [ ] Task: Write tests for conductor-install command
    - [ ] Test that `conductor-install` executes install logic
    - [ ] Test that CLI arguments are parsed correctly
    - [ ] Test help output for `conductor-install --help`

- [ ] Task: Run full test suite and verify coverage
    - [ ] Ensure all existing tests pass
    - [ ] Verify coverage remains >80%

- [ ] Task: Conductor - User Manual Verification 'Phase 2: Build System and Testing' (Protocol in workflow.md)

## Phase 3: Documentation and Cleanup

- [ ] Task: Update README.md
    - [ ] Update package name references
    - [ ] Update installation instructions to use `npx conductor-install`
    - [ ] Update usage examples

- [ ] Task: Update any internal documentation or comments
    - [ ] Search for references to `conductor-4-all` and update as needed
    - [ ] Update ASCII banner if it contains old name

- [ ] Task: Conductor - User Manual Verification 'Phase 3: Documentation and Cleanup' (Protocol in workflow.md)
