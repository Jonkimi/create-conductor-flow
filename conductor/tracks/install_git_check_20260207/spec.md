# Specification: Use .git Directory Check for Git Ignore Logic

## Overview
Update the `source/commands/install.ts` logic to check for the presence of a `.git` directory in the target path instead of relying on the global `git` command availability when determining whether to apply `.gitignore` configurations.

This ensures that `.gitignore` or `.git/info/exclude` modifications are only attempted on actual git repositories, regardless of whether the user has `git` installed in their PATH (though unlikely to have a repo without git, it's safer logic for the operation we are performing).

## Functional Requirements
1.  **Git Repository Detection**:
    -   Implement a check to verify if the target directory contains a `.git` subdirectory.
    -   Do NOT rely on `git --version` or similar commands for this specific check.
    -   Function signature: `isGitRepository(path: string): boolean`.

2.  **Update Install Logic**:
    -   In `src/commands/install.ts`, replace the `isGitAvailable()` check with `isGitRepository(targetDir)` for the logic block controlling `.gitignore` configuration (lines 66-86).
    -   If the target directory is **not** a git repository:
        -   If `gitIgnore` argument or config is provided: Warn the user and skip the configuration (Action: Skip).
        -   If no `gitIgnore` preference is set: Do not prompt the user for git ignore configuration (Action: Skip/None).

3.  **Preserve Existing Git Check**:
    -   Keep `isGitAvailable()` (checking for `git` command) for operations that strictly require the git executable (e.g., cloning a template repo), if any. *Note: The user specifically pointed to lines 66-86 for the change.*

## Non-Functional Requirements
-   The check should be synchronous and fast (filesystem check).
-   Code should be clean and use existing patterns.

## Acceptance Criteria
-   [ ] `install` command detects if the target directory is a git repository by looking for `.git`.
-   [ ] If `.git` exists, the git ignore configuration logic proceeds (prompts or applies config).
-   [ ] If `.git` does not exist, the git ignore configuration logic is skipped, and a warning is shown if the user explicitly requested it.
-   [ ] Unit/Integration tests cover the scenario where `.git` is missing.
