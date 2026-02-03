# Implementation Plan: Automated README Help Update

## Phase 1: Core Logic Development (TDD)
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
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Core Logic Development (TDD)' (Protocol in workflow.md)

## Phase 2: CLI Integration and Automation
- [ ] Task: Create the main update script
    - [ ] Create `scripts/update-readme.ts`
    - [ ] Implement logic to:
        - [ ] Execute `npx tsx src/conductor-install.ts --help`
        - [ ] Capture and clean output
        - [ ] Read all README files (`README.md`, `README_zh.md`, `README_ja.md`, `README_ko.md`)
        - [ ] Apply updates using the utility from Phase 1
        - [ ] Write back to files
- [ ] Task: Add `update-readme` script to `package.json`
- [ ] Task: Run the script and verify changes in all README files
- [ ] Task: Conductor - User Manual Verification 'Phase 2: CLI Integration and Automation' (Protocol in workflow.md)
