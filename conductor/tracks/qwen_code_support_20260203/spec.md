# Track: Add qwen-code Support Spec

## Overview
This track adds support for the **qwen-code** coding agent to the `conductor-install` CLI. qwen-code expects configuration commands to be stored as Markdown files within a `.qwen/commands/` directory in the project root.

## Functional Requirements
1.  **New Agent Support:** Add `qwen-code` as a supported agent type.
2.  **Configuration Generation:**
    -   Target Directory: `.qwen/commands/`
    -   File Format: Markdown (`.md`)
    -   Content Structure: Standard Markdown with an optional YAML frontmatter for descriptions.
3.  **Generator Implementation:**
    -   Create `src/generators/qwen-code/` directory.
    -   Implement `QwenCodeGenerator` extending `ConfigurableGenerator`.
    -   Implement `QwenCodeContentStrategy` to convert Conductor TOML templates into the Markdown format expected by qwen-code (standard prompt with description in YAML frontmatter if available).
4.  **CLI Integration:**
    -   Update `AgentType` in `src/types.ts` to include `qwen-code`.
    -   Register the new generator in `src/generators/registry.ts`.
    -   Update any relevant UI/prompts to include qwen-code in the agent selection list.
5.  **Documentation:**
    -   Add `qwen-code` to the supported agents list in all README files (`README.md`, `README_ja.md`, `README_ko.md`, `README_zh.md`).

## Non-Functional Requirements
-   **Style Consistency:** Follow the pattern established by `roo-code` and other Markdown-based agents.
-   **Test Coverage:** Add unit tests for the new generator and content strategy, aiming for >80% coverage.

## Acceptance Criteria
- [ ] Running `conductor-install` allows selecting "qwen-code" as an agent.
- [ ] Selecting "qwen-code" creates a `.qwen/commands/` directory.
- [ ] Conductor commands (e.g., `setup.md`, `status.md`) are generated as Markdown files in that directory.
- [ ] Generated files contain valid Markdown prompts derived from the Conductor templates, with description in YAML frontmatter.
- [ ] Automated tests pass for the new generator.
- [ ] qwen-code is listed in all localized README files (`README.md`, `README_ja.md`, `README_ko.md`, `README_zh.md`).

## Out of Scope
- Integration with qwen-code's specific API (this is purely for configuration setup).
- Support for global installation scope unless explicitly required by qwen-code later.
