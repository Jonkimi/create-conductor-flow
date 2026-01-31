# Specification: Rename Project to conductor-install

## Overview

Rename the npm package from `conductor-4-all` to `conductor-install` and add a new `conductor-install` bin command that directly executes the installation logic without requiring the `install` subcommand. This provides a streamlined user experience where `npx conductor-install` is all that's needed to install Conductor into any project.

## Functional Requirements

### FR-1: Rename npm Package
- Change the npm package name from `conductor-4-all` to `conductor-install` in `package.json`
- Update the `repository.url` and `homepage` fields if necessary

### FR-2: Add `conductor-install` Bin Command
- Add a new bin entry `conductor-install` in `package.json`
- This command should directly invoke the install logic (equivalent to running `conductor install`)
- Accept all the same arguments as `conductor install` (e.g., `--agent`, `--path`, `--repo`, etc.)

### FR-3: Maintain Backward Compatibility
- Keep `conductor` as a bin command (existing behavior with subcommands, for global install users)
- Keep `conductor-4-all` as a bin alias (for users who may have scripts using the old name)

### FR-4: Create Entry Point for Direct Install
- Create a new entry point (e.g., `src/bin/conductor-install.ts`) that:
  - Parses command-line arguments matching `conductor install` options
  - Directly executes the installation handler
  - Displays the same welcome banner and user experience

### FR-5: Update Documentation
- Update `README.md` with new package name and usage examples
- Update any references to `conductor-4-all` in the codebase

## Non-Functional Requirements

### NFR-1: License Compliance
- Apache 2.0 license permits renaming; ensure LICENSE file and copyright notices are preserved

### NFR-2: Testing
- Ensure all existing tests pass after renaming
- Add tests for the new `conductor-install` command entry point

## Acceptance Criteria

1. `npx conductor-install` executes successfully and starts the installation flow
2. `npx conductor-install --agent claude-code` works with the same behavior as `conductor install --agent claude-code`
3. `npx conductor-install --help` displays appropriate help text
4. Existing commands (`conductor`, `conductor-4-all`) continue to work as before
5. All tests pass with >80% code coverage
6. README reflects the new package name and usage

## Out of Scope

- GitHub repository renaming (can be done separately)
- npm package deprecation notice for `conductor-4-all` (can be handled during publishing)
- Breaking changes to the existing `conductor install` command interface
