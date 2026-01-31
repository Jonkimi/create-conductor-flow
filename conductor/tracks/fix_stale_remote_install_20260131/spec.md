# Specification: Fix Stale Remote Files in Installation

## Overview
This track addresses a bug where the `conductor install` command fails to use the latest files from the local cache when installing from a remote repository. The user has verified that the local cache (`~/.conductor/cache/...`) is correctly updated with the latest changes from the remote, but the files generated in the target directory (e.g., `.agent/`) remain stale or inconsistent with the cache.

## Problem Description
- **Scenario:** The user runs `node dist/conductor-install.js -r https://github.com/jonkimi/conductor -b dev` to install or update Conductor.
- **Observation:** The local cache is successfully updated (verified by checking the cache directory).
- **Issue:** The resulting files in the project's `.agent/` directory do not match the updated cache; specifically, contents like `prompt` and `description` from TOML files may be missing or outdated.

## Functional Requirements
1.  **Correct File Source:** The installation process MUST read source files *directly* from the updated cache directory during the generation phase.
2.  **Overwrite Logic:** Ensure that when the user (or a force flag) confirms an overwrite, the destination files are completely replaced with the versions from the cache.
3.  **Content Integrity:** The `prompt` and `description` fields from the source TOML templates MUST be correctly propagated to the generated files.

## Acceptance Criteria
1.  **Unit Test Verification:** A unit test is created that uses a mock remote TOML file with specific `prompt` and `description` values.
2.  **Content Assertion:** The test verifies that the generated file contains the exact `prompt` and `description` from the mock source.
3.  **Automated Regression Test:** The unit test is part of the automated test suite to prevent regression.

## Out of Scope
- Modifications to the `git pull` or cache updating logic (as this is confirmed to be working).
- Creating a full end-to-end reproduction with a real remote git repo (unit testing the generation logic is sufficient).
