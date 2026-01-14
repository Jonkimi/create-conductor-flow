# Specification: Refactor ConfigurableGenerator and Gemini CLI Paths

## Overview
This track aims to refactor the `ConfigurableGenerator` class to support more flexible, agent-specific file generation strategies and to specifically update the Gemini CLI integration to use a cleaner directory structure and naming convention.

## Functional Requirements

### 1. Gemini CLI Path and Naming Refactor
-   **Directory Structure:** Change the target directory for Gemini CLI commands from `.gemini/commands` to `.gemini/commands/conductor`.
-   **Naming Convention:** Remove the `conductor:` prefix from generated command files.
    -   Example: `conductor:setup.toml` becomes `setup.toml`.
-   **Scope:** These paths are relative to the project root.

### 2. ConfigurableGenerator Architecture Refactor
-   **Content Processing Strategy:**
    -   Refactor `processTemplateContent` to delegate agent-specific logic to a callback or strategy provided by the agent configuration.
    -   **Specific Logic Extraction:**
        -   Extract `gemini` specific logic (variable replacement).
        -   Extract `cline` specific logic (header generation).
        -   Extract `vscode-copilot` (`fixedAgent`) specific logic.
    -   **Fallback:** If no specific strategy is provided, utilize the current default logic.

-   **File Writing Strategy:**
    -   Refactor the file generation loop to delegate filename generation and file writing to a callback or strategy.
    -   **Gemini Specific:** Implement strategy to write to `.gemini/commands/conductor/` with prefix-less filenames.
    -   **Fallback:** If no specific strategy is provided, utilize the current default logic (`conductor:<cmd>.<ext>` in `commandsDir`).

## Non-Functional Requirements
-   **Backward Compatibility:** Ensure other agents (OpenCode, Claude Code, Cursor, etc.) continue to work as before.
-   **Code Quality:** Improve code cohesion by moving agent-specific checks out of the generic generator class.
-   **Folder Structure:** Apply `src/generators/<agent>/` structure for all agents.

## Acceptance Criteria
-   [ ] `conductor install --agent=gemini` creates files in `.gemini/commands/conductor/` (e.g., `setup.toml`).
-   [ ] `conductor install --agent=vscode-copilot` generates valid prompt files with `agent: agent` frontmatter.
-   [ ] `conductor install --agent=cline` generates valid markdown files with headers.
-   [ ] `ConfigurableGenerator.ts` is free of hardcoded `if (agentType === ...)` checks.
-   [ ] Strategies are organized in `src/generators/<agent>/`.
