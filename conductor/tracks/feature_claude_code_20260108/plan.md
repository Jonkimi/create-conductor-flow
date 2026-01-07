# Implementation Plan - Add Claude Code Generator Support

## Phase 1: Architecture Refactor & OpenCode Migration
- [x] Task: Create `generators` module structure [9a68cca]
    - [x] Create `src/generators/mod.rs`
    - [x] Create `src/generators/opencode.rs`
    - [x] Register module in `src/main.rs` (or lib root)
- [x] Task: Define `Generator` Trait [37fc7ce]
    - [x] Define trait in `src/generators/mod.rs` with methods for `install`, `install_path`, `commands_path`, and `check_existing`.
- [ ] Task: Migrate OpenCode Logic
    - [ ] Move logic from `src/commands/install.rs` to `src/generators/opencode.rs`.
    - [ ] Implement `Generator` trait for `OpenCodeGenerator`.
    - [ ] Ensure existing logic (asset extraction, toml transformation) is preserved/shared.
- [ ] Task: Update Install Command
    - [ ] Refactor `src/commands/install.rs` to use `OpenCodeGenerator` via the trait.
    - [ ] Verify `conductor:install` still works for OpenCode (Regression Test).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Architecture Refactor & OpenCode Migration' (Protocol in workflow.md)

## Phase 2: Add Claude Code Support
- [ ] Task: Implement Claude Code Generator
    - [ ] Create `src/generators/claude_code.rs`.
    - [ ] Implement `Generator` trait for `ClaudeCodeGenerator`.
    - [ ] Set paths: `install_path` = ".claude/conductor", `commands_path` = ".claude/commands".
    - [ ] Reuse shared logic for extraction/transformation.
- [ ] Task: Update Install Command Selection
    - [ ] Update `src/commands/install.rs` to add "Claude Code" to `inquire::Select`.
    - [ ] Add matching logic to instantiate and run `ClaudeCodeGenerator`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Add Claude Code Support' (Protocol in workflow.md)

## Phase 3: Final Verification
- [ ] Task: Run full test suite
    - [ ] Ensure unit tests for generators pass.
    - [ ] Ensure integration with `install` command works.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)
