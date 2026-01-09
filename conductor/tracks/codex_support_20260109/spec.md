# Specification: Codex Generator Support

## Overview
Implement a new generator for the "Codex" agent to support OpenAI Codex custom slash prompts. The generator will create workflow prompt files in `.codex/prompts/` with a specific markdown format containing a simplified YAML frontmatter.

## Functional Requirements

### 1. New Agent Support: Codex
- **Agent Type Identifier:** `codex`
- **Output Directory Structure:** `.codex/prompts/`
- **File Naming Convention:** `[workflow_name].md` (e.g., `conductor:implement.md`)
- **Content Format:**
  - **Frontmatter:** Strict simplified YAML containing *only* the `description` field.
  - **Body:** The workflow content (markdown) appended after the frontmatter.
  - **Example:**
    ```markdown
    ---
    description: Executes the tasks defined in the specified track's plan
    ---
    [Workflow steps...]
    ```

### 2. CLI Integration
- Add "Codex" as a selectable option in the `conductor install` interactive prompt.
- Allow passing `--agent=codex` via CLI arguments.

### 3. Implementation Details
- **Generator Class:** Create `CodexGenerator` implementing `AgentGenerator`.
- **Configuration:** Use `ConfigurableGenerator` with:
  - `agentDir`: `.codex`
  - `commandsDir`: `prompts`
  - `extension`: `.md`
  - `displayName`: `Codex`
  - `fixedAgent`: `undefined` (to ensure only description is output in frontmatter).

## Acceptance Criteria
- [ ] Running `conductor install --agent=codex` successfully creates `.codex/prompts/` directory.
- [ ] Workflow files (e.g., `conductor:implement.md`) are generated in the target directory.
- [ ] Generated files start with:
  ```markdown
  ---
  description: ...
  ---
  ```
- [ ] Interactive install prompt includes "Codex" as an option.
- [ ] TypeScript types and configs are updated to include `codex`.

## Out of Scope
- Customizing the prompt content beyond the standard Conductor templates (unless templates themselves require changes).
- Integration with valid OpenAI API keys or executing the prompts (file generation only).
