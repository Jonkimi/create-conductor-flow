# Specification: CLI Git Ignore Configuration Option

## Overview

Add a git ignore configuration feature to the `conductor-install` CLI that allows users to specify how generated agent files should be excluded from git tracking. This feature supports both interactive prompts and CLI flags, enabling users to choose between `.gitignore`, `.git/info/exclude`, remove existing entries, or no action.

## Functional Requirements

### FR-1: CLI Flag Support

- Add a `--git-ignore <method>` flag to the CLI command
- Accepted values:
  - `gitignore` — Append entries to the project's `.gitignore` file
  - `exclude` — Append entries to `.git/info/exclude`
  - `none` — Remove Conductor-related entries from both `.gitignore` and `.git/info/exclude`
- Default behavior:
  - If `--git-ignore` is provided without a value, default to `exclude`
  - If `--git-ignore` is omitted entirely, no git ignore action is taken
- The flag only takes effect when installation scope is `project`
  - If scope is `global` and `--git-ignore` is provided, display a warning message and ignore the flag

### FR-2: Interactive Prompt

- When running `conductor-install` interactively (without `--git-ignore` flag):
  - Display a git ignore configuration prompt **after scope selection**
  - Only show the prompt when scope is `project`
  - Prompt options:
    1. Add to `.gitignore`
    2. Add to `.git/info/exclude`
    3. Remove existing entries
    4. Don't configure git ignore
- Skip the prompt if `--git-ignore` flag is already provided

### FR-3: Git Ignore Entries

The following entries should be added to (or removed from) the selected git ignore file:

**Agent-specific directories:**
- `.kilocode/`
- `.gemini`
- `.roo`
- `.qwen`
- `.factory`
- `.claude`
- `.agent`
- (and any other agent config directories defined in the registry)

**Protocol files:**
- `CLAUDE.md`
- `GEMINI.md`
- `AGENTS.md`
- (and any other protocol files defined in the registry)

### FR-4: Duplicate Entry Handling (for add operations)

- Before appending entries, check if they already exist in the target file
- If all entries already exist, skip writing and display a message: "Git ignore entries already present, skipping."
- If some entries are missing, only append the missing ones and inform the user which were added

### FR-5: Entry Removal (for `none` option)

- When `--git-ignore none` is specified:
  - Scan both `.gitignore` and `.git/info/exclude` for Conductor-related entries
  - Remove all matching entries from both files
  - Display a message indicating which entries were removed from which file
  - If no entries are found, display: "No Conductor git ignore entries found."

## Non-Functional Requirements

### NFR-1: Backward Compatibility

- Existing `conductor-install` behavior without `--git-ignore` flag remains unchanged (no git ignore action by default)

### NFR-2: User Experience

- Clear, concise prompts and messages
- Informative feedback when entries are added, skipped, or removed

## Acceptance Criteria

- [ ] `conductor-install --git-ignore gitignore` appends entries to `.gitignore` for project-scope installs
- [ ] `conductor-install --git-ignore exclude` appends entries to `.git/info/exclude` for project-scope installs
- [ ] `conductor-install --git-ignore none` removes Conductor entries from both `.gitignore` and `.git/info/exclude`
- [ ] `conductor-install --git-ignore` (no value) defaults to `exclude`
- [ ] `conductor-install` without `--git-ignore` takes no git ignore action
- [ ] `--git-ignore` with global scope displays a warning and is ignored
- [ ] Interactive prompt appears after scope selection for project-scope installs
- [ ] Duplicate entries are detected and skipped with an informative message
- [ ] Entry removal reports which entries were removed from which file
- [ ] All agent directories and protocol files from the registry are included

## Out of Scope

- Configuring git ignore for files outside of Conductor-generated content
- Support for custom git ignore entry lists via user input
