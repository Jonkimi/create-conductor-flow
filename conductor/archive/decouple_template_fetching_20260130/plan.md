# Implementation Plan: Decouple gemini-conductor-codebase and Dynamic Template Fetching

## Phase 1: CLI and Argument Handling

### Task 1.1: Add `--repo` and `--branch` to CLI
- [x] Task: Write Failing Tests: Create tests in `tests/cli-structure.test.ts` to verify that the `install` command accepts `--repo` (alias `-r`) and `--branch` (alias `-b`) options.
- [x] Task: Implement: Update `src/cli/index.ts` to include these options in the `install` command configuration.
- [x] Task: Verify: Run tests and ensure they pass.

### Task 1.2: Pass arguments to `installHandler`
- [x] Task: Write Failing Tests: Update `tests/install-command.test.ts` to verify that the `installHandler` receives the `repo` and `branch` arguments from yargs.
- [x] Task: Implement: Update `src/commands/install.ts` to accept these new properties in the `ArgumentsCamelCase` type and pass them to the generator or utility functions.
- [x] Task: Verify: Run tests and ensure they pass.

- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Remote Template Fetching & Caching

### Task 2.1: Define default repository and cache paths
- [x] Task: Write Failing Tests: Create tests in `tests/template-utils.test.ts` to verify default repo/branch constants and cache directory resolution.
- [x] Task: Implement: Define `DEFAULT_REPO`, `DEFAULT_BRANCH`, and a helper to resolve the cache directory (e.g., `~/.gemini/cache/conductor`) in `src/utils/template.ts`.
- [x] Task: Verify: Run tests.

### Task 2.2: Implement repository downloading logic
- [x] Task: Write Failing Tests: Create a test that mocks a download and verifies that files are extracted to the correct cache location.
- [x] Task: Implement: Add a function to `src/utils/template.ts` that downloads the repository (as a ZIP) and extracts it using `adm-zip` or a similar lightweight library. (Note: Need to check if a new dependency is allowed or if we should use `tar` via `run_shell_command` equivalent).
- [x] Task: Verify: Run tests.

### Task 2.3: Refactor `getTemplateRoot` to use cache
- [x] Task: Write Failing Tests: Update `tests/template-utils.test.ts` to verify `getTemplateRoot` ensures templates are present (downloads if missing) and returns the cache path.
- [x] Task: Implement: Update `getTemplateRoot` in `src/utils/template.ts` to use the downloading logic if the local directory or cache is missing.
- [x] Task: Verify: Run tests.

- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Decoupling and Cleanup

### Task 3.1: Update `tsup.config.ts`
- [x] Task: Write Failing Tests: Create a test to verify that the `dist` folder does not contain `gemini-conductor-codebase` after build.
- [x] Task: Implement: Remove the `copy` call for `gemini-conductor-codebase` in `tsup.config.ts`.
- [x] Task: Verify: Run `npm run build` and check `dist` contents.

### Task 3.2: Remove local directory and references
- [x] Task: Implement: Delete the `gemini-conductor-codebase/` directory from the repository.
- [x] Task: Implement: Remove or update scripts like `scripts/replicate-gemini-conductor.md` and `scripts/replace.js`.
- [x] Task: Verify: Ensure no `grep` matches for `gemini-conductor-codebase` remain in the `src/` or `scripts/` directories.

- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Final Verification

### Task 4.1: End-to-End Installation Test
- [x] Task: Implement: Create an integration test that runs the full installation flow (mocking the network if necessary) to a temporary directory.
- [x] Task: Verify: Confirm that conductor commands are correctly generated for an agent.

### Task 4.2: Update Documentation
- [x] Task: Implement: Update `README.md` to reflect the new `install` options.
- [x] Task: Verify: Review documentation for accuracy.

- [x] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
