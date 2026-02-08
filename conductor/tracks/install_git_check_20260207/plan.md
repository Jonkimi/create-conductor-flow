# Implementation Plan - Use .git Directory Check for Git Ignore Logic

## Phase 1: Utility Update [checkpoint: d460ce1]
- [x] Task: Create `isGitRepository` utility `cc162b6`
    - [x] Create/Update `src/utils/gitDetect.ts` to include `isGitRepository(path: string)`.
    - [x] Ensure it checks for the existence of `.git` directory strictly.
- [x] Task: Add unit tests for `isGitRepository` `cc162b6`
    - [x] Create/Update `src/utils/gitDetect.test.ts`.
    - [x] Test cases: path with `.git`, path without `.git`.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Utility Update' (Protocol in workflow.md)

## Phase 2: Command Logic Update
- [x] Task: specific integration test for git ignore logic `137dcbc`
    - [x] Create `tests/git-repo-check.test.ts` to test `install` command behavior.
    - [x] Test case: `install` in a directory without `.git` should not trigger git ignore prompts/actions.
    - [x] Test case: `install` in a directory with `.git` should work as before.
- [x] Task: Update `install` command `137dcbc`
    - [x] Modify `src/commands/install.ts` to use `isGitRepository` instead of `isGitAvailable` for the git ignore section.
    - [x] Ensure logic flows correctly (skip if no `.git`).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Command Logic Update' (Protocol in workflow.md)

## Phase 3: Verification
- [ ] Task: Run full test suite to ensure no regressions.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification' (Protocol in workflow.md)
