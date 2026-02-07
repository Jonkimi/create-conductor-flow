# Implementation Plan - Track: Persistent Configuration

## Phase 1: Configuration Infrastructure & XDG Setup
- [~] Task: Install `env-paths` dependency (or implement simple XDG logic if preferred to avoid deps).
- [~] Task: Create `src/utils/config.ts` module.
    - [ ] Implement `getConfigDir()` and `getCacheDir()` following XDG standards (Platform-aware).
        - [ ] **Critical:** Support `process.env.CONDUCTOR_CONFIG_DIR` and `process.env.CONDUCTOR_CACHE_DIR` overrides to allow safe E2E testing without touching real user files.
    - [ ] Implement `loadConfig()`: Read/Parse `config.json`.
    - [ ] Implement `saveConfig(config)`: Write `config.json` (ensure dir exists).
    - [ ] Define `Config` interface (repo, branch, agent, gitIgnore).
- [ ] Task: Implement Cache Migration Logic in `src/utils/migrate.ts`.
    - [ ] Check for existence of old `~/.gemini/cache/conductor`.
    - [ ] If found and new cache is empty, move/copy to new XDG location.
    - [ ] Log migration status.
- [ ] Task: Update `src/utils/template.ts` to use new `getCacheDir()`.
- [ ] Task: Conductor - User Manual Verification 'Configuration Infrastructure & XDG Setup' (Protocol in workflow.md)

## Phase 2: CLI Integration & Logic Updates
- [ ] Task: Update `src/cli/index.ts` to load config on startup.
    - [ ] Modify `parseArgs` or `main` to merge Config values as defaults for Yargs.
    - [ ] Ensure CLI flags take precedence over Config values.
- [ ] Task: Update `src/commands/install.ts` (Install Handler).
    - [ ] Refactor `promptTemplateSource`, `promptForAgent`, etc., to skip prompts if valid config exists AND flag was not explicitly provided.
    - [ ] Logic: `effectiveValue = flag || config || prompt()`.
    - [ ] **Crucial:** After a successful installation, call `saveConfig()` with the final used values (Repo, Branch, Agent, Scope, GitIgnore).
- [ ] Task: Implement `--reset` flag in `src/cli/index.ts` and `src/commands/install.ts`.
    - [ ] If `--reset` is present, clear config before processing args/prompts.
- [ ] Task: Conductor - User Manual Verification 'CLI Integration & Logic Updates' (Protocol in workflow.md)

## Phase 3: Testing & Documentation
- [ ] Task: Add Unit Tests for `src/utils/config.ts` (Mocking fs/paths).
- [ ] Task: **Update E2E Tests (`tests/cli-e2e.test.ts`)**
    - [ ] Configure tests to set `CONDUCTOR_CONFIG_DIR` to a temporary directory in `beforeEach`.
    - [ ] Test Case: **Persistence Verification**
        1. Run `conductor-init` with specific flags (e.g., `--agent claude-code`).
        2. Verify `config.json` is created in temp dir.
        3. Run `conductor-init` *without* flags.
        4. Assert that it automatically uses `claude-code`.
    - [ ] Test Case: **Reset Verification**
        1. Create a dummy `config.json` with `agent: "cursor"`.
        2. Run `conductor-init --reset`.
        3. Verify config is cleared/ignored (simulated by checking output or prompt behavior if possible, or checking file deletion).
- [ ] Task: Update `README.md` to explain Configuration persistence and the `--reset` flag.
- [ ] Task: Conductor - User Manual Verification 'Testing & Documentation' (Protocol in workflow.md)
