# Specification: Agent Installation Scope Control

## 1. Overview
This feature introduces explicit control over where an Agent's configuration files are installed (Installation Scope). It enforces constraints based on the specific Agent type (e.g., Codex requires Global installation, others require Project installation) while maintaining an interactive user experience.

## 2. Functional Requirements

### 2.1 Installation Scope Logic
- **Codex Agent:** MUST restrict installation to **Global** scope only.
- **Other Agents:** MUST restrict installation to **Project** scope only.

### 2.2 User Interface (CLI)
- **Prompt:** After selecting an agent, the CLI MUST prompt the user to select the "Installation Method".
- **Single Option Enforcement:** Even though the scope is predetermined by the Agent type, the prompt MUST still appear with the single valid option.
    - *Example (Codex):* Option list contains only "Global". User must press Enter to select.
    - *Example (Others):* Option list contains only "Project". User must press Enter to select.

### 2.3 Codex Generator Updates
- **Path Resolution:** The Codex generator must be updated to target the Global directory.
- **Directory:** `~/.codex` (Resolved using OS standard APIs, e.g., `os.homedir()`, NOT hardcoded string `~`).
- **File Placement:** configuration files for Codex must be written to this global directory.

## 3. Non-Functional Requirements
- **Cross-Platform:** Home directory resolution must work correctly on Windows, macOS, and Linux.

## 4. Acceptance Criteria
- [ ] Running `conductor install` and selecting "Codex" presents a prompt for "Installation Method" with only "Global" as an option.
- [ ] Selecting "Global" for Codex installs files to `~/.codex` (correctly resolved).
- [ ] Running `conductor install` and selecting any other agent presents a prompt for "Installation Method" with only "Project" as an option.
- [ ] Selecting "Project" installs files to the local `.conductor` (or equivalent) directory as before.
