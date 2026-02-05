# Implementation Plan: Cross-Platform CI Tests on Release

## Phase 1: Workflow Refactoring [checkpoint: 0ba2930]
- [x] Task: Create a new branch for the CI improvements to avoid direct commits to main.
- [x] Task: Update `.github/workflows/remote-publish.yml` to split the `build-and-publish` job.
    - [x] Create a `test` job with a `matrix` strategy:
        -   `os: [ubuntu-latest, windows-latest, macos-latest]`
        -   `node-version: [24.x]`
    - [x] Configure the `test` job to run `npm install`, `npm build`, and `npm test`.
    - [x] Create a `publish` job that `needs` the `test` job.
    - [x] Ensure the `publish` job only runs on `ubuntu-latest` and performs the `npm publish` step.
- [x] Task: Conductor - User Manual Verification 'Workflow Refactoring' (Protocol in workflow.md)

## Phase 2: Verification and Cleanup
- [ ] Task: Verify the YAML syntax of the modified workflow (dry-run/lint).
- [ ] Task: Simulate a test run (if possible) or visually confirm the structure against GitHub Actions documentation.
    -   *Note: Actual execution requires a tag push, which we can't fully simulate without releasing, but we can review heavily.*
- [ ] Task: Update Documentation if necessary (e.g., `CONTRIBUTING.md` if it mentions release processes).
- [ ] Task: Conductor - User Manual Verification 'Verification and Cleanup' (Protocol in workflow.md)
