# Track: Rename Conductor Prefix from Colon to Hyphen

## Overview
Change the naming convention for Conductor configuration and command files from using a colon separator (e.g., `conductor:setup`) to a hyphen (e.g., `conductor-setup`) to improve file system compatibility and usability. This change applies to file generation logic, template processing, and all relevant unit tests.

## Functional Requirements

### 1. Bundle Script Updates (`scripts/bundle-conductor.ts`)
After downloading the template files from the remote repository:
- **Content Replacement:** Recursively search all downloaded files and replace all occurrences of the string `/conductor:` with `/conductor-`.
- **File Renaming:** Rename any downloaded files that contain a colon (`:`) in their filename to use a hyphen (`-`) instead (e.g., `conductor:file` -> `conductor-file`).

### 2. Generator Logic Updates (`src/generators/ConfigurableGenerator.ts`)
- Change the default prefix logic for the setup file.
- **Current:** `conductor:` (e.g., `conductor:setup.md`)
- **New:** `conductor-` (e.g., `conductor-setup.md`)

### 3. File Strategy Updates (`src/generators/default/strategy.ts`)
- Update the default file naming strategy for generated commands.
- **Current:** `conductor:<commandName>.<extension>`
- **New:** `conductor-<commandName>.<extension>`

### 4. Unit Test Updates
- Update all unit tests that reference filenames with the `conductor:` prefix to use the new `conductor-` prefix.
- Ensure tests verify the correct generation of hyphenated filenames.

### 5. Documentation Updates
- Update all `README.md` and other documentation files to replace references to `conductor:` filenames or commands with the new `conductor-` format.

## Verification
- Verify that `scripts/bundle-conductor.ts` correctly modifies the content of downloaded templates.
- Verify that finding/replacing `/conductor:` with `/conductor-` works across all text files.
- Verify that `ConfigurableGenerator` produces `conductor-setup.md`.
- Verify that `DefaultFileStrategy` produces command files like `conductor-newTrack.md`.
- **Verify that all unit tests pass with the updated naming convention.**
- **Verify that documentation references are updated.**
