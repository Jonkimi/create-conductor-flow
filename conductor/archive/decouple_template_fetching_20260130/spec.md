# Specification: Decouple gemini-conductor-codebase and Dynamic Template Fetching

## Overview
This track aims to remove the hard dependency on the local `gemini-conductor-codebase` directory. Currently, the project bundles these templates during the build process. We will refactor the `install` command to fetch templates dynamically from a remote Git repository (defaulting to the official Conductor repository) and allow users to specify a repository URL and branch.

## Functional Requirements
- **Dynamic Template Source:** The CLI shall be able to fetch Conductor templates and commands from a remote Git repository.
- **Default Source:** The default repository URL shall be `https://github.com/gemini-cli-extensions/conductor` and the default branch shall be `main`.
- **CLI Overrides:** The `install` command shall accept optional `--repo` (or `-r`) and `--branch` (or `-b`) flags to override the default source.
- **Local Caching:** Fetched templates shall be cached locally (e.g., in `~/.gemini/cache/conductor`) to improve performance on subsequent installations.
- **Decoupling:** All references to the local `gemini-conductor-codebase` directory shall be removed from the build process (`tsup.config.ts`), scripts, and utility functions.

## Technical Requirements
- **Update `install` Command:** Modify `src/cli/index.ts` and `src/commands/install.ts` to handle the new `--repo` and `--branch` options.
- **Refactor Template Loading:** Update `src/utils/template.ts` to:
    - Support downloading a repository (or a ZIP archive from GitHub) if the local cache is missing or outdated.
    - Resolve the template root path to the local cache directory.
- **Cleanup:**
    - Remove `gemini-conductor-codebase` directory from the repository.
    - Update `tsup.config.ts` to stop copying the directory to `dist`.
    - Remove or update scripts like `scripts/replicate-gemini-conductor.md` and `scripts/replace.js` if they are no longer needed.
    - Update tests that rely on the local directory structure.

## Acceptance Criteria
- Running `conductor install` without flags fetches templates from the default repo/branch and initializes a project successfully.
- Running `conductor install --repo <URL> --branch <NAME>` fetches from the specified source.
- The `gemini-conductor-codebase` directory is removed from the project root and `dist` folder.
- The build process succeeds without the local template directory.
- Templates are correctly cached and reused if available.

## Out of Scope
- Support for non-GitHub Git providers (though the logic should be generic enough).
- Complex versioning logic beyond branch/tag names.
