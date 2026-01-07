# Track Specification: Rename Init to Install & Implement Opencode Support

## Overview
This track involves renaming the existing `init` command to `install` and implementing the logic to install Conductor commands and templates for the **Opencode** agent. The CLI will bundle the `gemini-conductor-codebase.tar` file at build time, extract it at runtime, and transform TOML command definitions into Markdown files expected by Opencode, while also managing file conflict resolution via interactive prompts.

## Goals
1.  **Rename Command:** Change the CLI entry point from `init` to `install`.
2.  **Embed Assets:** Use `include_bytes!` to embed `gemini-conductor-codebase.tar` into the final binary.
3.  **Implement Install Logic:**
    -   Prompt user to select an agent (currently only "Opencode").
    -   Check for existing files in `.opencode/`.
    -   Prompt for overwrite confirmation if files exist.
    -   Extract and transform TOML commands to Markdown.
    -   Copy templates.
    -   Perform path variable replacement.

## Functional Requirements

### 1. Command Interface
-   The command `conductor install` shall be available.
-   The command `conductor init` shall no longer exist.

### 2. Asset Bundling
-   The build process shall verify the existence of `gemini-conductor-codebase.tar` in the project root.
-   The binary shall contain the compressed tarball data.

### 3. Installation Flow (Opencode)
-   **Agent Selection:** Use `inquire` to prompt: "Select Coding Agent" -> Options: ["Opencode"].
-   **Conflict Detection:** Check for existence of:
    -   `.opencode/commands/conductor:setup.md`
    -   `.opencode/commands/conductor:newTrack.md`
    -   `.opencode/commands/conductor:status.md`
    -   `.opencode/commands/conductor:implement.md`
    -   `.opencode/commands/conductor:revert.md`
    -   `.opencode/conductor/templates/workflow.md`
    -   `.opencode/conductor/templates/code_styleguides/`
-   **Overwrite Prompt:** If any exist, prompt: "Files already exist. Overwrite?" (Yes/No).
    -   If No: Terminate.
    -   If Yes (or files don't exist): Proceed.

### 4. File Transformation & Installation
-   **Extraction:** Unpack the embedded tarball in memory or a temp location.
-   **Command Transformation:** For each TOML file in `commands/`:
    -   Read `description` and `prompt`.
    -   Replace `__$$CODE_AGENT_INSTALL_PATH$$__` in the `prompt` with `.opencode/conductor` (Relative Path).
    -   Generate Markdown content:
        ```markdown
        ---
        description: <description>
        ---
        <prompt_content>
        ```
    -   Write to `.opencode/commands/conductor:<name>.md` (Note the colon separator).
-   **Template Installation:**
    -   Copy contents of `templates/` to `.opencode/conductor/templates/`.

## Non-Functional Requirements
-   **Dependencies:** Use `tar` crate for extraction, `toml` for parsing TOML, `inquire` for prompts.
-   **Error Handling:** Fail gracefully if IO errors occur or permissions are denied.

## Out of Scope
-   Support for other agents (Cursor, Windsurf, etc.) in this track.
-   Dynamic generation of the tarball (assumed pre-built).
