# Implementation Plan: Add qwen-code Support

This plan outlines the steps to add support for the `qwen-code` coding agent to the `conductor-install` CLI.

## Phase 1: Foundation and Types
This phase focuses on updating core types and registering the new agent.

- [x] Task: Update `AgentType` in `src/types.ts` to include `qwen-code` [af9cbae]
- [x] Task: Update UI/Prompts to include Qwen Code in agent selection list [af9cbae]
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation and Types' (Protocol in workflow.md) [checkpoint: 36e8aea]

## Phase 2: Qwen Code Generator Implementation
This phase implements the generator and content strategy for Qwen Code.

- [ ] Task: Create `src/generators/qwen-code/` directory and files
- [ ] Task: Implement `QwenCodeContentStrategy` in `src/generators/qwen-code/strategy.ts`
    - [ ] Process TOML templates to Markdown
    - [ ] Add YAML frontmatter for descriptions
    - [ ] Handle variable substitution
- [ ] Task: Implement `QwenCodeGenerator` in `src/generators/qwen-code/generator.ts` and `config.ts`
- [ ] Task: Register `QwenCodeGenerator` in `src/generators/registry.ts`
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Qwen Code Generator Implementation' (Protocol in workflow.md)

## Phase 3: Testing and Verification
This phase ensures the new generator works correctly and meets coverage requirements.

- [ ] Task: Write unit tests for `QwenCodeContentStrategy`
- [ ] Task: Write unit tests for `QwenCodeGenerator`
- [ ] Run full test suite and verify >80% coverage for new files
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Testing and Verification' (Protocol in workflow.md)

## Phase 4: Documentation
This phase ensures all project documentation is up to date with the new agent support.

- [ ] Task: Update `README.md` to include `qwen-code`
- [ ] Task: Update `README_ja.md` to include `qwen-code`
- [ ] Task: Update `README_ko.md` to include `qwen-code`
- [ ] Task: Update `README_zh.md` to include `qwen-code`
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Documentation' (Protocol in workflow.md)
