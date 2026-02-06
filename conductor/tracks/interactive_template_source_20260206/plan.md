# Implementation Plan: Interactive Template Source Selection

## Phase 1: Core Infrastructure

- [ ] Task: Create template source prompt module
    - [ ] Create new file `src/utils/templatePrompt.ts`
    - [ ] Define `TemplateSource` enum: `bundled`, `official`, `custom`
    - [ ] Define `TemplateSourceResult` interface with `repo?: string`, `branch?: string`
    - [ ] Export constants for prompt display text

- [ ] Task: Write tests for template source prompt logic
    - [ ] Create test file `tests/utils/templatePrompt.test.ts`
    - [ ] Test: Returns bundled source when selected
    - [ ] Test: Returns official repo URL and branch when selected
    - [ ] Test: Prompts for custom URL and branch when selected
    - [ ] Test: Validates custom URL format

- [ ] Task: Implement `promptTemplateSource` function
    - [ ] Use `@inquirer/select` for main source selection
    - [ ] Use `@inquirer/input` for custom repo URL input
    - [ ] Use `@inquirer/input` for branch input with default 'main'
    - [ ] Return `TemplateSourceResult` object

- [ ] Task: Conductor - User Manual Verification 'Phase 1: Core Infrastructure' (Protocol in workflow.md)

## Phase 2: Non-Interactive Detection

- [ ] Task: Write tests for non-interactive mode detection
    - [ ] Add tests to `tests/utils/templatePrompt.test.ts`
    - [ ] Test: Detects CI=true environment variable
    - [ ] Test: Detects non-TTY stdin
    - [ ] Test: Returns bundled source silently in non-interactive mode

- [ ] Task: Implement `isInteractiveMode` helper function
    - [ ] Check `process.env.CI !== 'true'`
    - [ ] Check `process.stdin.isTTY === true`
    - [ ] Export from `src/utils/templatePrompt.ts`

- [ ] Task: Add non-interactive fallback to `promptTemplateSource`
    - [ ] If not interactive, return bundled source without prompt
    - [ ] Log message indicating bundled templates are being used

- [ ] Task: Conductor - User Manual Verification 'Phase 2: Non-Interactive Detection' (Protocol in workflow.md)

## Phase 3: CLI Integration

- [ ] Task: Write integration tests for CLI template source behavior
    - [ ] Add tests to `tests/cli-integration.test.ts`
    - [ ] Test: CLI without --repo shows interactive prompt (mocked)
    - [ ] Test: CLI with --repo skips interactive prompt
    - [ ] Test: CLI in CI mode uses bundled templates

- [ ] Task: Write E2E tests for template source selection
    - [ ] Add test suite to `tests/cli-e2e.test.ts` under "template source" describe block
    - [ ] Test: Installation with `--repo` flag uses specified repository
    - [ ] Test: Bundled templates work correctly in non-interactive mode (CI=true)
    - [ ] Test: Both `conductor-init` and `create-conductor-flow` commands share same behavior

- [ ] Task: Update `src/commands/install.ts` to use template source prompt
    - [ ] Import `promptTemplateSource` and `isInteractiveMode`
    - [ ] Call prompt when `repo` option is not provided and mode is interactive
    - [ ] Use `TemplateSourceResult` to determine `repo` and `branch` values
    - [ ] Pass resolved values to `getTemplateRoot`

- [ ] Task: Update `src/cli/index.ts` CLI help text
    - [ ] Update `--repo` description to mention interactive selection
    - [ ] Add example for interactive mode

- [ ] Task: Conductor - User Manual Verification 'Phase 3: CLI Integration' (Protocol in workflow.md)

## Phase 4: Documentation and Finalization

- [ ] Task: Update README documentation
    - [ ] Add section describing interactive template source selection
    - [ ] Document the three options and when to use each
    - [ ] Add CI/non-interactive mode behavior explanation
    - [ ] Update usage examples

- [ ] Task: Update localized README files
    - [ ] Update README_zh.md with translated content
    - [ ] Update README_ja.md with translated content
    - [ ] Update README_ko.md with translated content

- [ ] Task: Verify code coverage meets requirements
    - [ ] Run `pnpm test -- --coverage`
    - [ ] Ensure >80% coverage for new code in `templatePrompt.ts`
    - [ ] Address any coverage gaps

- [ ] Task: Conductor - User Manual Verification 'Phase 4: Documentation and Finalization' (Protocol in workflow.md)
