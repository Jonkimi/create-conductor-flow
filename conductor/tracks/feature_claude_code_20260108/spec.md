# Track: Add Claude Code Generator Support

## Overview
This feature adds support for "Claude Code" as a selectable coding agent during the `conductor:install` process. It refactors the existing installation logic into a modular `generator` architecture, separating the generic installation process from agent-specific configurations (OpenCode vs. Claude Code).

## Functional Requirements

### 1. Agent Selection
- The `conductor:install` command must present an interactive selection menu.
- Options:
  - "Opencode" (existing)
  - "Claude Code" (new)

### 2. Generator Architecture Refactor
- Abstract the installation logic into a new `generators` module group.
- **Location:** `src/generators/`
- **Structure:**
  - `src/generators/mod.rs`: Trait definitions (e.g., `Generator` trait) and public exports.
  - `src/generators/opencode.rs`: Implementation for OpenCode.
  - `src/generators/claude_code.rs`: Implementation for Claude Code.
- **Generator Trait:** Should define methods for:
  - Getting the `install_path`.
  - Getting the `commands_path`.
  - Performing the installation (extracting assets, transforming templates).
  - Checking for existing files.

### 3. Claude Code Generator Implementation
- **Install Path:** `.claude/conductor`
- **Commands Path:** `.claude/commands`
- **Behavior:**
  - Must replicate the existing asset extraction and TOML-to-Markdown transformation logic used by OpenCode.
  - Must perform safety checks: detect existing Conductor files in the target `.claude` directories and prompt the user before overwriting.

### 4. OpenCode Generator Migration
- Move the existing hardcoded logic from `src/commands/install.rs` into `src/generators/opencode.rs`.
- Ensure functionality remains unchanged for OpenCode users.

## Non-Functional Requirements
- **Code Structure:** Clean separation of concerns using Rust traits and modules.
- **Extensibility:** The new architecture should make it trivial to add more agents in the future.
- **User Experience:** The interactive prompt should remain intuitive using `inquire`.

## Acceptance Criteria
- [ ] Running `conductor:install` shows both "Opencode" and "Claude Code".
- [ ] Selecting "Opencode" installs files to `.opencode/conductor` and `.opencode/commands`.
- [ ] Selecting "Claude Code" installs files to `.claude/conductor` and `.claude/commands`.
- [ ] Both options prompt for confirmation if files already exist in their respective target directories.
- [ ] The source code reflects the new `src/generators` structure.

## Out of Scope
- Support for agents other than Opencode and Claude Code (e.g., Cursor, Windsurf) in this specific track.
