# Implementation Plan: CLI Git Ignore Configuration Option

## Phase 1: Core Git Ignore Utility Module [checkpoint: 65ce0f2]

- [x] Task: Write tests for git ignore entry management utilities 026d7b5
    - [x] Test: `getGitIgnoreEntries()` returns correct list of agent directories and protocol files from registry
    - [x] Test: `checkEntriesExist()` correctly identifies existing entries in a file
    - [x] Test: `appendEntries()` adds only missing entries to a file
    - [x] Test: `removeEntries()` removes matching entries from a file
    - [x] Test: Handle edge cases (file doesn't exist, empty file, entries with trailing slashes)

- [x] Task: Implement git ignore utility module (`src/utils/gitIgnore.ts`) 717ae3e
    - [x] Implement `getGitIgnoreEntries()` to collect entries from agent registry
    - [x] Implement `checkEntriesExist()` to scan file for existing entries
    - [x] Implement `appendEntries()` to add missing entries with deduplication
    - [x] Implement `removeEntries()` to remove Conductor-related entries from file
    - [x] Implement helper to resolve `.gitignore` and `.git/info/exclude` paths

- [x] Task: Conductor - User Manual Verification 'Phase 1: Core Git Ignore Utility Module' (Protocol in workflow.md)

## Phase 2: CLI Flag Integration [checkpoint: bc1f0e8]

- [x] Task: Write tests for `--git-ignore` flag parsing 267892b
    - [x] Test: `--git-ignore gitignore` sets method to `gitignore`
    - [x] Test: `--git-ignore exclude` sets method to `exclude`
    - [x] Test: `--git-ignore none` sets method to `none`
    - [x] Test: `--git-ignore` without value defaults to `exclude`
    - [x] Test: No `--git-ignore` flag results in no action
    - [x] Test: Invalid value shows error message

- [x] Task: Implement `--git-ignore` flag in yargs configuration 01d2960
    - [x] Add `--git-ignore` option with choices: `gitignore`, `exclude`, `none`
    - [x] Configure default value as `exclude` when flag is present without value
    - [x] Add flag description for help output

- [x] Task: Conductor - User Manual Verification 'Phase 2: CLI Flag Integration' (Protocol in workflow.md)

## Phase 3: Scope Validation and Warning

- [x] Task: Write tests for scope validation logic 0ba2640
    - [x] Test: `--git-ignore` is processed when scope is `project`
    - [x] Test: `--git-ignore` displays warning and is ignored when scope is `global`
    - [x] Test: Warning message content is correct

- [x] Task: Implement scope validation for git ignore flag a068f38
    - [x] Add check in install flow to validate scope before processing `--git-ignore`
    - [x] Implement warning message display for global scope with `--git-ignore`
    - [x] Ensure flag is skipped silently after warning

- [~] Task: Conductor - User Manual Verification 'Phase 3: Scope Validation and Warning' (Protocol in workflow.md)

## Phase 4: Interactive Prompt

- [ ] Task: Write tests for interactive git ignore prompt
    - [ ] Test: Prompt appears after scope selection when scope is `project`
    - [ ] Test: Prompt does not appear when scope is `global`
    - [ ] Test: Prompt does not appear when `--git-ignore` flag is provided
    - [ ] Test: Each prompt option maps to correct action

- [ ] Task: Implement interactive git ignore prompt
    - [ ] Create prompt with options: `.gitignore`, `.git/info/exclude`, Remove existing, Don't configure
    - [ ] Integrate prompt into install flow after scope selection
    - [ ] Add condition to skip prompt when `--git-ignore` flag is present
    - [ ] Add condition to skip prompt when scope is `global`

- [ ] Task: Conductor - User Manual Verification 'Phase 4: Interactive Prompt' (Protocol in workflow.md)

## Phase 5: Git Ignore Action Execution

- [ ] Task: Write tests for git ignore action execution
    - [ ] Test: `gitignore` method appends entries to `.gitignore`
    - [ ] Test: `exclude` method appends entries to `.git/info/exclude`
    - [ ] Test: `none` method removes entries from both files
    - [ ] Test: Duplicate entries are skipped with correct message
    - [ ] Test: Missing entries are added with correct message
    - [ ] Test: Removal reports which entries were removed from which file
    - [ ] Test: No entries found displays correct message

- [ ] Task: Implement git ignore action execution in install flow
    - [ ] Integrate `appendEntries()` for `gitignore` and `exclude` methods
    - [ ] Integrate `removeEntries()` for `none` method
    - [ ] Add user feedback messages for all operations
    - [ ] Handle file creation if `.gitignore` doesn't exist

- [ ] Task: Conductor - User Manual Verification 'Phase 5: Git Ignore Action Execution' (Protocol in workflow.md)

## Phase 6: Integration and Documentation

- [ ] Task: Write integration tests for full install flow with git ignore
    - [ ] Test: Complete flow with `--git-ignore gitignore` flag
    - [ ] Test: Complete flow with interactive prompt selection
    - [ ] Test: Complete flow with `--git-ignore none` removing entries

- [ ] Task: Update CLI help text and usage documentation
    - [ ] Ensure `--help` output describes `--git-ignore` flag clearly
    - [ ] Add examples for each `--git-ignore` option

- [ ] Task: Conductor - User Manual Verification 'Phase 6: Integration and Documentation' (Protocol in workflow.md)
