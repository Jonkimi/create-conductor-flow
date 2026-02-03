# Implementation Plan - Update CLI Help Output in READMEs

This plan covers the extraction of the current `conductor-install --help` output and its propagation across all localized README files.

## Phase 1: Preparation and Extraction
Goal: Build the latest version of the tool and extract the authoritative help output.

- [x] Task: Build the project to ensure the latest CLI changes are captured.
    - [x] Run `pnpm build`
- [x] Task: Capture the help output of `conductor-install`.
    - [x] Run `node dist/conductor-install.js --help` and save the output to a temporary variable or file.
- [~] Task: Conductor - User Manual Verification 'Phase 1: Preparation and Extraction' (Protocol in workflow.md)

## Phase 2: README Updates
Goal: Replace the old help blocks in all README files with the new content.

- [ ] Task: Update the main `README.md`.
    - [ ] Locate the `conductor-install --help` section.
    - [ ] Replace the content with the new output.
- [ ] Task: Update the Japanese `README_ja.md`.
    - [ ] Locate the `conductor-install --help` section.
    - [ ] Replace the content with the new output.
- [ ] Task: Update the Korean `README_ko.md`.
    - [ ] Locate the `conductor-install --help` section.
    - [ ] Replace the content with the new output.
- [ ] Task: Update the Chinese `README_zh.md`.
    - [ ] Locate the `conductor-install --help` section.
    - [ ] Replace the content with the new output.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: README Updates' (Protocol in workflow.md)

## Phase 3: Verification
Goal: Final check of all documents to ensure consistency.

- [ ] Task: Verify all READMEs reflect the exact same help output.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification' (Protocol in workflow.md)