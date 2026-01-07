# Implementation Plan - Rename Init to Install & Implement Opencode Support

## Phase 1: Rename & Asset Bundling
- [x] Task: Rename `init` command to `install`. 9463ac4
  - [ ] Subtask: Rename `src/commands/init.rs` to `src/commands/install.rs`.
  - [ ] Subtask: Update `src/commands/mod.rs` to expose `install`.
  - [ ] Subtask: Update `src/cli.rs` to replace `Init` variant with `Install`.
  - [ ] Subtask: Update `src/main.rs` dispatch logic.
- [x] Task: Bundle static assets. 52914e1
  - [ ] Subtask: Add `gemini-conductor-codebase.tar` (dummy or real) to project root for dev.
  - [ ] Subtask: Create a `src/assets.rs` module to handle `include_bytes!`.
  - [ ] Subtask: Verify bundling by printing size of embedded bytes in `install` command.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Rename & Asset Bundling' (Protocol in workflow.md)

## Phase 2: Dependencies & Data Structures
- [x] Task: Add necessary dependencies to `Cargo.toml`. [checkpoint: 8200ad0] 606d151
  - [ ] Subtask: `tar`, `flate2` (if compression needed, likely yes for tar), `toml`, `inquire`.
- [x] Task: Define data structures for Command parsing. a26c0ab
  - [ ] Subtask: Create struct `CommandConfig` deriving `Deserialize` to parse the TOML files.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Dependencies & Data Structures' (Protocol in workflow.md)

## Phase 3: Install Logic Implementation [checkpoint: 0b071f4]
- [x] Task: Implement Opencode installation flow. [checkpoint: 3eb5f26] 55a7f16
  - [ ] Subtask: Implement `inquire` prompt for agent selection.
  - [ ] Subtask: Implement file existence check logic.
  - [ ] Subtask: Implement overwrite confirmation prompt.
- [x] Task: Implement file extraction and transformation logic. e05aeb2
  - [ ] Subtask: Implement `extract_and_transform` function.
  - [ ] Subtask: Read TOML, replace placeholder string with `.opencode/conductor`.
  - [ ] Subtask: Generate Markdown content with frontmatter.
  - [ ] Subtask: Write to `.opencode/commands/conductor:<name>.md`.
  - [ ] Subtask: Copy templates to `.opencode/conductor/templates/`.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Install Logic Implementation' (Protocol in workflow.md)
