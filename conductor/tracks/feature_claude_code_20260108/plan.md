# Implementation Plan - Add Claude Code Generator Support

## Phase 1: Architecture Refactor & OpenCode Migration [checkpoint: cebc4f3]
- [x] Task: Create `generators` module structure [9a68cca]
    - [x] Create `src/generators/mod.rs`
    - [x] Create `src/generators/opencode.rs`
    - [x] Register module in `src/main.rs` (or lib root)
- [x] Task: Define `Generator` Trait [37fc7ce]
    - [x] Define trait in `src/generators/mod.rs` with methods for `install`, `install_path`, `commands_path`, and `check_existing`.
- [x] Task: Migrate OpenCode Logic [370e8f0]
    - [x] Move logic from `src/commands/install.rs` to `src/generators/opencode.rs`.
    - [x] Implement `Generator` trait for `OpenCodeGenerator`.
    - [x] Ensure existing logic (asset extraction, toml transformation) is preserved/shared.
- [x] Task: Update Install Command [1821a14]
    - [x] Refactor `src/commands/install.rs` to use `OpenCodeGenerator` via the trait.
    - [x] Verify `conductor:install` still works for OpenCode (Regression Test).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Architecture Refactor & OpenCode Migration' (Protocol in workflow.md)

## Phase 2: Add Claude Code Support [checkpoint: fff69fc]
- [x] Task: Implement Claude Code Generator [96fcf80]
    - [x] Create `src/generators/claude_code.rs`.
    - [x] Implement `Generator` trait for `ClaudeCodeGenerator`.
    - [x] Set paths: `install_path` = ".claude/conductor", `commands_path` = ".claude/commands".
    - [x] Reuse shared logic for extraction/transformation.
- [x] Task: Update Install Command Selection [2c8c030]
    - [x] Update `src/commands/install.rs` to add "Claude Code" to `inquire::Select`.
    - [x] Add matching logic to instantiate and run `ClaudeCodeGenerator`.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Add Claude Code Support' (Protocol in workflow.md)

## Phase 3: Final Verification [checkpoint: fff69fc]
- [x] Task: Run full test suite [9aeafe6]
    - [x] Ensure unit tests for generators pass.
    - [x] Ensure integration with `install` command works.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)
