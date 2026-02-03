# Specification: Build Phase Help Command Update to READMEs

## Overview
This track aims to implement an automated script to update the `help` output of the `conductor-install` CLI tool directly into all `README.md` files in the repository. This ensures that the documentation is always in sync with the actual CLI capabilities.

## Functional Requirements
1.  **Automated Help Capture:** A script must run `npx tsx src/conductor-install.ts --help` to capture the current help output, including the banner.
2.  **Target Files:** The script must update all README files: `README.md`, `README_zh.md`, `README_ja.md`, and `README_ko.md`.
3.  **Section Targeting:** The script must identify the replacement target by looking for the header `### 1. Setup Conductor in Your Project` (or its translated equivalent) and replacing the subsequent code block.
4.  **Format:** The help output must be wrapped in a `text` code block:
    ```text
    [help output here]
    ```
5.  **NPM Script:** A new script `update-readme` (or similar) should be added to `package.json` to trigger this update manually.

## Non-Functional Requirements
-   **Preserve Formatting:** The ASCII banner and the `yargs` alignment must be preserved exactly.
-   **No Color Codes:** Since `gradient-string` might output ANSI escape codes when directed to a terminal, the script must ensure that the captured output is clean text without escape codes (or strip them).

## Acceptance Criteria
-   Running `pnpm update-readme` updates all four README files with the latest help output.
-   The updated help section includes the ASCII banner.
-   The help section is correctly placed under the "Setup Conductor" header in all languages.
-   The content is wrapped in a `text` code block.

## Out of Scope
-   Automated translation of the `help` output.
-   Updating other documentation outside of the specified README files.
