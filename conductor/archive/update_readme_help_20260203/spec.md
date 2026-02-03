# Track Specification: Update CLI Help Output in READMEs

## Overview
This track aims to update the help output of the `conductor-install` command across all localized README files to ensure the documentation accurately reflects the current CLI capabilities.

## Functional Requirements
- **Target Files:** Update help output in `README.md`, `README_ja.md`, `README_ko.md`, and `README_zh.md`.
- **Target Command:** Capture and document the output of `conductor-install --help`.
- **Update Method:** Locate existing help output blocks in each README and replace them entirely with the current CLI output.

## Non-Functional Requirements
- **Consistency:** Ensure the formatting of the help block is consistent across all languages (e.g., within triple backticks).
- **Accuracy:** The output must be generated from the current build of the tool.

## Acceptance Criteria
- [ ] `README.md` contains the latest `conductor-install --help` output.
- [ ] `README_ja.md` contains the latest `conductor-install --help` output.
- [ ] `README_ko.md` contains the latest `conductor-install --help` output.
- [ ] `README_zh.md` contains the latest `conductor-install --help` output.

## Out of Scope
- Updating help output for other commands (e.g., `conductor`).
- Translating the help output itself (CLI output remains in English).