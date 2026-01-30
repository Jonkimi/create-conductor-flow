# CLI Bundled Templates: Prefer Local, Fallback Remote

## Overview
When the CLI `install` command is invoked **without** `--repo` or `--branch` arguments, it should use the **bundled templates** (shipped with the npm package in `dist/templates/`) instead of cloning from the remote repository. If a required template is missing from the bundled location, it should **fallback to remote** and print a log message.

## Functional Requirements

### FR-1: Template Resolution Priority
1. If `repo` and `branch` arguments are **NOT provided**:
   - Use bundled templates from `dist/templates/` (or `src/templates/` in dev)
   - Do NOT call `ensureTemplates()` (no git clone/pull)
2. If `repo` or `branch` arguments **ARE provided**:
   - Use current behavior: clone/update remote repo

### FR-2: Bundled Resource Copying
When in bundled-only mode, `ConfigurableGenerator.generate()` should:
1. Copy bundled templates to **cache directory** (`~/.gemini/cache/conductor/`) so they can be used like remote templates
2. Copy protocol file (e.g., `GEMINI.md`) from **bundled/cache location** to agent dir
3. Load command TOML files from **bundled/cache location**

### FR-3: Fallback Behavior
If a required template file is missing in bundled location:
1. Print a log message: `"Bundled template not found: {path}, falling back to remote repository..."`
2. Automatically fallback to clone/use remote repository
3. Continue with the operation

## Non-Functional Requirements
- Maintain backward compatibility: existing `--repo` and `--branch` flags should work unchanged
- No breaking changes to the public API

## Acceptance Criteria
- [ ] Running `conductor install` (no repo args) uses bundled templates without network calls
- [ ] Running `conductor install --repo <url>` uses remote repository as before
- [ ] Missing bundled template triggers fallback with log message
- [ ] All existing tests continue to pass

## Out of Scope
- Adding new CLI flags (e.g., `--offline`, `--bundled-only`)
- Changing the bundled template packaging/build process
