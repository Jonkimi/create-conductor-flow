# Implementation Plan: Automated README Help Update

## Phase 1: Core Logic Development (TDD) [checkpoint: 157cf7b]
- [x] Task: Write failing tests for README update logic
    - [ ] Create `src/utils/readme-update.test.ts`
    - [ ] Define tests for identifying headers in multiple languages
    - [ ] Define tests for replacing the code block content
    - [ ] Define tests for stripping ANSI escape codes from help output
- [x] Task: Implement README update utility
    - [ ] Create `src/utils/readme-update.ts`
    - [ ] Implement `stripAnsi` function
    - [ ] Implement `updateReadmeSection` function with multi-language header support
- [x] Task: Verify Phase 1 tests pass
- [x] Task: Conductor - User Manual Verification 'Phase 1: Core Logic Development (TDD)' (Protocol in workflow.md)

## Phase 2: CLI Integration and Automation [checkpoint: 29cd8e1]
- [x] Task: Create the main update script
    - [x] Create `scripts/update-readme.ts`
    - [x] Implement logic to:
        - [x] Execute `npx tsx src/conductor-install.ts --help`
        - [x] Capture and clean output
        - [x] Read all README files (`README.md`, `README_zh.md`, `README_ja.md`, `README_ko.md`)
        - [x] Apply updates using the utility from Phase 1
        - [x] Write back to files
- [x] Task: Add `update-readme` script to `package.json`
- [x] Task: Run the script and verify changes in all README files
- [x] Task: Conductor - User Manual Verification 'Phase 2: CLI Integration and Automation' (Protocol in workflow.md)

## Phase 3: Refinement [checkpoint: 29cd8e1]
- [x] Task: Implement banner suppression in CLI
    - [x] Update `src/conductor-install.ts` to respect a flag or env var (e.g., `CONDUCTOR_NO_BANNER`)
    - [x] Update `scripts/update-readme.ts` to set this env var/flag
    - [x] Run `pnpm update-readme` and verify READMEs no longer contain the duplicate banner
- [x] Task: Conductor - User Manual Verification 'Phase 3: Refinement' (Protocol in workflow.md)
