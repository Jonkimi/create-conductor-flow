# Specification: Display Agent Paths in Selection

## Overview
Update the `conductor install` CLI prompt to display relevant file path information for each agent in the selection list. This improves clarity by showing users exactly where Conductor files will be installed.

## Functional Requirements
1.  **Selection Prompt UI:**
    -   Modify the "Select your coding agent" prompt.
    -   For each agent choice, display the following format: `Agent Name (protocolFilename, agentDir/commandsDir)`
    -   **Styling:** The path information in parentheses MUST be displayed in **gray** color.
    -   **Example:** `Cursor (AGENTS.md, .cursor/commands)`

2.  **Data Source:**
    -   Do NOT hardcode these paths in the prompt file.
    -   Dynamically source these values from the agent configuration files to ensure they remain the Single Source of Truth.

## Technical Requirements
-   Centralize agent configurations (currently scattered in `src/generators/*/config.ts`).
-   Update `src/cli/prompt.ts` to import and utilize this centralized configuration.
-   Ensure the `AgentConfig` interface supports the necessary fields (`protocolFilename`, `agentDir`, `commandsDir`).

## Acceptance Criteria
-   Running `conductor install` displays the updated prompt format.
-   The displayed paths match the actual configuration values for each agent.
-   The styling matches the requirement (gray text for paths).
