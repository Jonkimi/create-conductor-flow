# Implementation Plan - Fix Stale Remote Files in Installation

## Phase 1: Test Case Creation
- [x] Task: Create a unit/integration test for the file generator.
    - [ ] Create a test that simulates the generation process using a simulated "remote" TOML source.
    - [ ] The test should:
        - [ ] Define a source TOML file with specific `prompt` and `description` values.
        - [ ] Run the generator logic to produce the output file.
        - [ ] Assert that the `prompt` and `description` from the TOML are present in the generated file.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Test Case Creation' (Protocol in workflow.md)

## Phase 2: Fix Implementation
- [x] Task: Locate the bug in the file generation logic.
    - [ ] Investigate `src/generators` to see how it reads source files and handles cache/overwrites.
    - [ ] Identify why it might be reading stale data or failing to update from the new cache.
- [x] Task: Implement the fix.
    - [ ] Ensure the generator correctly reads and propagates the `description` and `prompt` from the source to the destination.
    - [ ] Verify overwrite logic correctly replaces existing files with new content.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Fix Implementation' (Protocol in workflow.md)

## Phase 3: Verification
- [x] Task: Run the unit test to confirm it passes with the fix.
- [x] Task: Perform manual verification.
    - [ ] Run `node dist/conductor-install.js -r https://github.com/jonkimi/conductor -b dev`
    - [ ] Check generated TOML files for correct `prompt` and `description`.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification' (Protocol in workflow.md)
