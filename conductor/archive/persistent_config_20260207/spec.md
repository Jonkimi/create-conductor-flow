# Track Specification: Persistent Configuration & XDG Standard Adoption

## 1. Overview
Currently, `create-conductor-flow` does not persist user preferences. Users must manually select the template source, agent, and git-ignore strategy every time they run the tool, or provide them via flags. This track introduces a persistent configuration system that stores these preferences, enabling a "zero-config" experience for repeat users.

Additionally, this track will migrate the existing cache directory from the non-standard `~/.gemini/cache` to the system-standard XDG Cache location (e.g., `~/.cache/create-conductor-flow`), aligning with modern CLI best practices across macOS, Linux, and Windows.

## 2. Functional Requirements

### 2.1 Configuration Storage (XDG Standard)
- **Location:**
  - **macOS/Linux:** `~/.config/create-conductor-flow/config.json` (or strictly `$XDG_CONFIG_HOME`)
  - **Windows:** `%APPDATA%\create-conductor-flow\config.json`
- **Mechanism:** Automatically create the config file and parent directories if they do not exist.

### 2.2 Cache Migration (XDG Standard)
- **Current Behavior:** Cache is stored in `~/.gemini/cache/conductor`.
- **New Behavior:**
  - **macOS/Linux:** Migrate to `~/.cache/create-conductor-flow/templates/` (or strictly `$XDG_CACHE_HOME`).
  - **Windows:** Migrate to `%LOCALAPPDATA%\create-conductor-flow\templates\`.
- **Migration Logic:** If the old cache exists and the new one does not, move/copy the old cache to the new location on first run, then delete the old one.

### 2.3 Persisted Preferences
The following settings must be saved to `config.json` after a successful run:
1.  **Template Source (`repo`)**: The repository URL (Custom or Official).
2.  **Template Branch (`branch`)**: The branch name (if Custom or Official).
3.  **Last Used Agent (`agent`)**: The agent selected (e.g., `claude-code`, `opencode`).
4.  **Git Ignore Strategy (`gitIgnore`)**: The chosen strategy (`gitignore`, `exclude`, `none`).

### 2.4 CLI Behavior Changes
- **Reading Configuration:**
  - On startup, read `config.json`.
  - If a specific flag (e.g., `--repo`, `--agent`) is **NOT** provided via CLI args, look up the value in `config.json`.
  - **Auto-Use:** If a value exists in `config.json`, use it **validly and silently** (or with a brief log: `Using saved preference for agent: claude-code`). Do NOT prompt the user.
  - **Override:** If a flag is provided (e.g., `conductor-init --agent cursor`), it overrides the config value AND updates the `config.json` with the new choice for future runs.

- **Initial Run (No Config):**
  - Prompt the user as usual.
  - Save the user's final selections to `config.json`.

- **Reset Mechanism:**
  - Implement a `--reset` flag.
  - **Behavior:** If `conductor-init --reset` is run:
    1.  Clear/Delete `config.json`.
    2.  Ignore any existing config values.
    3.  Force all interactive prompts to appear.
    4.  Save the new selections to a fresh `config.json`.

## 3. Non-Functional Requirements
- **Cross-Platform:** Must work correctly on Windows (using `%APPDATA%`/`%LOCALAPPDATA%`), macOS, and Linux.
- **Robustness:** Handle cases where the config file is corrupted or invalid (fallback to defaults/prompts).
- **Transparency:** When using a cached preference, print a subtle message so the user knows *why* a choice was skipped (e.g., `[Config] Using saved template source: ...`).

## 4. Acceptance Criteria
- [ ] Config file is created in the correct XDG path on the first run.
- [ ] Cache directory is created in the correct XDG path.
- [ ] Old cache at `~/.gemini/cache` is migrated or ignored (new cache starts fresh if migration is too complex, but preferred to migrate).
- [ ] Running `conductor-init` a second time (without args) **skips** the Agent, GitIgnore, and Template Source prompts, reusing previous values.
- [ ] Running `conductor-init --agent <new_agent>` updates the config to the new agent.
- [ ] Running `conductor-init --reset` clears preferences and shows all prompts again.
