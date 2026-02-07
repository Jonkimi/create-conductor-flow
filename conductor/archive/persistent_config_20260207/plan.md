# Implementation Plan - Track: Persistent Configuration

## Phase 1: Configuration Infrastructure & XDG Setup
- [x] Task: Install `env-paths` dependency (or implement simple XDG logic if preferred to avoid deps). `1ba03a1`
- [x] Task: Create `src/utils/config.ts` module. `1ba03a1`
    - [x] Implement `getConfigDir()` and `getCacheDir()` following XDG standards (Platform-aware).
        - [x] **Critical:** Support `process.env.CONDUCTOR_CONFIG_DIR` and `process.env.CONDUCTOR_CACHE_DIR` overrides to allow safe E2E testing without touching real user files.
    - [x] Implement `loadConfig()`: Read/Parse `config.json`.
    - [x] Implement `saveConfig(config)`: Write `config.json` (ensure dir exists).
    - [x] Define `Config` interface (repo, branch, agent, gitIgnore).
- [x] Task: Implement Cache Migration Logic in `src/utils/migrate.ts`. `28e2731`
    - [x] Check for existence of old `~/.gemini/cache/conductor`.
    - [x] If found and new cache is empty, move/copy to new XDG location.
    - [x] Log migration status.
- [x] Task: Update `src/utils/template.ts` to use new `getCacheDir()`. `28e2731`
- [x] Task: Conductor - User Manual Verification 'Configuration Infrastructure & XDG Setup' (Protocol in workflow.md)

## Phase 2: CLI Integration & Logic Updates
- [x] Task: Update `src/cli/index.ts` to load config on startup. `4a0e919`
    - [x] Modify `parseArgs` or `main` to merge Config values as defaults for Yargs.
    - [x] Ensure CLI flags take precedence over Config values.
- [x] Task: Update `src/commands/install.ts` (Install Handler). `4a0e919`
    - [x] Refactor `promptTemplateSource`, `promptForAgent`, etc., to skip prompts if valid config exists AND flag was not explicitly provided.
    - [x] Logic: `effectiveValue = flag || config || prompt()`.
    - [x] **Crucial:** After a successful installation, call `saveConfig()` with the final used values (Repo, Branch, Agent, Scope, GitIgnore).
- [x] Task: Implement `--reset` flag in `src/cli/index.ts` and `src/commands/install.ts`. `4a0e919`
    - [x] If `--reset` is present, clear config before processing args/prompts.
- [x] Task: Conductor - User Manual Verification 'CLI Integration & Logic Updates' (Protocol in workflow.md)

## Phase 3: Testing & Documentation
- [x] Task: Add Unit Tests for `src/utils/config.ts` (Mocking fs/paths). `1ba03a1`
- [x] Task: **Update E2E Tests (`tests/cli-e2e.test.ts`)** `48cf4ce`
    - [x] Configure tests to set `CONDUCTOR_CONFIG_DIR` to a temporary directory in `beforeEach`.
    - [x] Test Case: **Persistence Verification**
        1. Run `conductor-init` with specific flags (e.g., `--agent claude-code`).
        2. Verify `config.json` is created in temp dir.
        3. Run `conductor-init` *without* flags.
        4. Assert that it automatically uses `claude-code`.
    - [x] Test Case: **Reset Verification**
        1. Create a dummy `config.json` with `agent: "cursor"`.
        2. Run `conductor-init --reset`.
        3. Verify config is cleared/ignored (simulated by checking output or prompt behavior if possible, or checking file deletion).
- [x] Task: Update `README.md` to explain Configuration persistence and the `--reset` flag. `a97188f`
- [x] Task: Conductor - User Manual Verification 'Testing & Documentation' (Protocol in workflow.md)

