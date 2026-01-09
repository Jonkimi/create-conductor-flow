# Track Specification: Windsurf Support

## Overview
Add support for Windsurf as a coding agent in the Conductor CLI. This will allow users to select "Windsurf" during installation, which will generate the necessary Conductor workflows as project-level slash commands for Windsurf (Cascade).

## Functional Requirements
1.  **CLI Agent Selection**:
    -   Update the `install` command to include "Windsurf" as a selectable agent option.
    -   Ensure "Windsurf" is available in the interactive prompt.

2.  **Generator Implementation**:
    -   Create a new `WindsurfGenerator` that scaffolds the Conductor files.
    -   **Context**: Windsurf supports "Cascade" workflows defined in `.windsurf/workflows`.
    -   **Configuration**:
        -   `agentType`: `windsurf`
        -   `agentDir`: `.windsurf`
        -   `commandsDir`: `workflows`
        -   `displayName`: `Windsurf`

3.  **Installation Scope**:
    -   Restrict to **Project** level installation only.

4.  **Generated Artifacts**:
    -   The generator should produce the standard suite of Conductor commands (`setup`, `newTrack`, `implement`, `status`, `revert`) within the `.windsurf/workflows` directory.
    -   Conductor internal templates should reside in `.windsurf/conductor`.

## Non-Functional Requirements
-   Maintain consistency with existing generator patterns (`ConfigurableGenerator`).
-   No new external dependencies.

## Acceptance Criteria
-   [ ] Running `conductor install` shows "Windsurf" in the agent list.
-   [ ] Selecting "Windsurf" successfully generates files in `.windsurf/workflows` and `.windsurf/conductor`.
-   [ ] The generated files follow the correct naming convention.
-   [ ] `conductor install --agent windsurf` works as a shortcut.
