# Implementation Plan: Interactive Template Source Selection

## Phase 1: Core Infrastructure

- [x] Task: Create template source prompt module
    - [x] Create new file `src/utils/templatePrompt.ts`
    - [x] Define `TemplateSource` enum: `bundled`, `official`, `custom`
    - [x] Define `TemplateSourceResult` interface with `repo?: string`, `branch?: string`
    - [x] Export constants for prompt display text

- [x] Task: Write tests for template source prompt logic
    - [x] Create test file `tests/utils/templatePrompt.test.ts`
    - [x] Test: Returns bundled source when selected
    - [x] Test: Returns official repo URL and branch when selected
    - [x] Test: Prompts for custom URL and branch when selected
    - [x] Test: Validates custom URL format

- [x] Task: Implement `promptTemplateSource` function
    - [x] Use `@inquirer/select` for main source selection
    - [x] Use `@inquirer/input` for custom repo URL input
    - [x] Use `@inquirer/input` for branch input with default 'main'
    - [x] Return `TemplateSourceResult` object

- [ ] Task: Conductor - User Manual Verification 'Phase 1: Core Infrastructure' (Protocol in workflow.md)

## Phase 2: Non-Interactive Detection

- [x] Task: Write tests for non-interactive mode detection
    - [x] Add tests to `tests/utils/templatePrompt.test.ts`
    - [x] Test: Detects CI=true environment variable
    - [x] Test: Detects non-TTY stdin
    - [x] Test: Returns bundled source silently in non-interactive mode

- [x] Task: Implement `isInteractiveMode` helper function
    - [x] Check `process.env.CI !== 'true'`
    - [x] Check `process.stdin.isTTY === true`
    - [x] Export from `src/utils/templatePrompt.ts`

- [x] Task: Add non-interactive fallback to `promptTemplateSource`
    - [x] If not interactive, return bundled source without prompt
    - [x] Log message indicating bundled templates are being used

- [ ] Task: Conductor - User Manual Verification 'Phase 2: Non-Interactive Detection' (Protocol in workflow.md)

## Phase 3: CLI Integration

- [x] Task: Write integration tests for CLI template source behavior
    - [x] Add tests to `tests/cli-integration.test.ts`
    - [x] Test: CLI without --repo shows interactive prompt (mocked)
    - [x] Test: CLI with --repo skips interactive prompt
    - [x] Test: CLI in CI mode uses bundled templates

- [x] Task: Write E2E tests for template source selection
    - [x] Add test suite to `tests/cli-e2e.test.ts` under "template source" describe block
    - [x] Test: Installation with `--repo` flag uses specified repository
    - [x] Test: Bundled templates work correctly in non-interactive mode (CI=true)
    - [x] Test: Both `conductor-init` and `create-conductor-flow` commands share same behavior

- [x] Task: Update `src/commands/install.ts` to use template source prompt
    - [x] Import `promptTemplateSource` and `isInteractiveMode`
    - [x] Call prompt when `repo` option is not provided and mode is interactive
    - [x] Use `TemplateSourceResult` to determine `repo` and `branch` values
    - [x] Pass resolved values to `getTemplateRoot`

- [x] Task: Update `src/cli/index.ts` CLI help text
    - [x] Update `--repo` description to mention interactive selection
    - [x] Add example for interactive mode

- [ ] Task: Conductor - User Manual Verification 'Phase 3: CLI Integration' (Protocol in workflow.md)

## Phase 4: Documentation and Finalization

- [x] Task: Update README documentation
    - [x] Add section describing interactive template source selection
    - [x] Document the three options and when to use each
    - [x] Add CI/non-interactive mode behavior explanation
    - [x] Update usage examples

- [x] Task: Update localized README files
    - [x] Update README_zh.md with translated content
    - [x] Update README_ja.md with translated content
    - [x] Update README_ko.md with translated content

- [x] Task: Verify code coverage meets requirements
    - [x] Run `pnpm test -- --coverage`
    - [x] Ensure >80% coverage for new code in `templatePrompt.ts`
    - [x] Address any coverage gaps

- [ ] Task: Conductor - User Manual Verification 'Phase 4: Documentation and Finalization' (Protocol in workflow.md)
