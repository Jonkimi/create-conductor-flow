# Specification: GitHub CI/CD for NPM Publishing

## Overview
This track implements a GitHub Actions workflow to automate the building, testing, and publishing of the `conductor-install` package to npmjs.com. This ensures that every versioned release is automatically validated and distributed, reducing manual effort and potential errors.

## Functional Requirements

### 1. Workflow Trigger
- The workflow MUST be triggered **only** when a new tag starting with `v` (e.g., `v1.0.0`, `v2.1.0-beta`) is pushed to the repository.

### 2. Job: Build and Publish
The workflow shall consist of a single job (e.g., `build-and-publish`) that executes on `ubuntu-latest`. It must perform the following steps sequentially:
1.  **Checkout Code:** Retrieve the source code from the repository.
2.  **Setup Environment:**
    -   Install Node.js (version 18 or latest stable).
    -   Install `pnpm` (via corepack or action).
    -   Configure registry authentication for `npmjs.com`.
3.  **Install Dependencies:** Run `pnpm install` (frozen lockfile preferred).
4.  **Verification:**
    -   **Build:** Execute `pnpm build` to compile the TypeScript code and generate assets.
    -   **Test:** Execute `pnpm test` to ensure all unit/integration tests pass.
5.  **Publish:**
    -   Execute `pnpm publish` to upload the package to the npm registry.
    -   The publish step must use the `NPM_TOKEN` secret for authentication.

## Non-Functional Requirements
-   **Security:** Use GitHub Secrets (`NPM_TOKEN`) for sensitive credentials. Do not hardcode tokens.
-   **Performance:** Use action caching for `pnpm` dependencies to speed up runs.
-   **Reliability:** The publish step MUST fail if the build or test steps fail.

## Out of Scope
-   Automatic version bumping (versions are determined by the pushed tag).
-   Generating GitHub Releases (artifacts/changelogs) - strictly focusing on NPM publishing for now.
