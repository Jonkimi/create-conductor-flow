# Track Specification: Cross-Platform CI Tests on Release

## 1. Overview
This track implements cross-platform unit testing within the existing release workflow (`.github/workflows/remote-publish.yml`). The goal is to ensure that the Conductor CLI functions correctly on Windows, macOS, and Linux before a new version is published to NPM.

## 2. Functional Requirements
- **Target Workflow:** Modify `.github/workflows/remote-publish.yml`.
- **Trigger:** Maintain the existing trigger (Push to tags `v*`).
- **Test Strategy:** Implement a build matrix to run tests on:
    - **OS:** Ubuntu (latest), Windows (latest), macOS (latest).
    - **Node.js:** Version 24.x.
- **Publishing:** Ensure the `npm publish` step runs **only** after all cross-platform tests have passed successfully.

## 3. Implementation Details
- **Job Restructuring:**
    - Split the current `build-and-publish` job (or reorganize it) into:
        1.  A `test` job using a strategy matrix for the OSs.
        2.  A `publish` job that `needs` the `test` job to complete successfully.
- **Publish Context:** The publish step should remain on a single environment (e.g., `ubuntu-latest`) to avoid race conditions or multiple publish attempts.

## 4. Acceptance Criteria
- [ ] The GitHub Action workflow is valid and lint-free.
- [ ] Pushing a tag (`v*`) triggers the workflow.
- [ ] Tests execute in parallel (or sequentially) on Ubuntu, Windows, and macOS.
- [ ] Tests run against Node.js 24.x.
- [ ] Failure in any OS test suite prevents the `npm publish` step.
- [ ] Success in all test suites triggers the `npm publish` step.
