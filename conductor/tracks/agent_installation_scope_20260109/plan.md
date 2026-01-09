# Implementation Plan - Agent Installation Scope Control

The goal of this track is to enforce installation scope constraints (Global vs. Project) based on the selected Agent type while maintaining user awareness through a mandatory, albeit single-option, confirmation prompt.

## User Review Required
> [!NOTE]
> Breaking Change: `conductor install` will now introduce an additional interactive step for all agents.
> *   For **Codex**, users MUST hit Enter to confirm "Global" installation.
> *   For **All Other Agents**, users MUST hit Enter to confirm "Project" installation.
> *   The "Codex" agent will now install to `~/.codex` instead of the local directory.

## Proposed Changes

### CLI & Interaction Layer
#### [MODIFY] [prompt.ts](file:///Users/liuhaoranhuang/workspace/hlhr202/Conductor-for-all/src/cli/prompt.ts)
- Add `InstallScope` type and `promptForInstallScope(agent: AgentType)` function.
- Implement logic to present a single-choice list based on the agent type:
    - If `agent === 'codex'`, choices = `['Global']`
    - Else, choices = `['Project']`

#### [MODIFY] [install.ts](file:///Users/liuhaoranhuang/workspace/hlhr202/Conductor-for-all/src/commands/install.ts)
- Integrate `promptForInstallScope` into the installation flow after agent selection.
- Pass the selected scope to the generator.

#### [MODIFY] [types.ts](file:///Users/liuhaoranhuang/workspace/hlhr202/Conductor-for-all/src/types.ts)
- Update `Generator` interface to accept `scope`.

### Generator Layer
#### [MODIFY] [CodexGenerator.ts](file:///Users/liuhaoranhuang/workspace/hlhr202/Conductor-for-all/src/generators/CodexGenerator.ts)
- Update `validate` or `generate` method to resolve `~/.codex` using `os.homedir()` when scope is Global.
- Ensure files are written to the global path.

#### [MODIFY] [ConfigurableGenerator.ts](file:///Users/liuhaoranhuang/workspace/hlhr202/Conductor-for-all/src/generators/ConfigurableGenerator.ts)
- Update to handle the scope parameter (defaulting to Project behavior if largely unchanged).

## Plan

### Phase 1: Core Logic & Tests
- [x] Task: Create `InstallScope` type and update `Generator` interface <!-- 819f2ac -->
    - [x] Update `src/types.ts` to include `InstallScope` ('global' | 'project').
    - [x] Update `Generator` interface in `src/generators/types.ts` (or similar) to accept scope in `validate` or `generate`.
- [x] Task: Implement `promptForInstallScope` with TDD <!-- be93f55 -->
    - [x] Create test `__tests__/cli/prompt.test.ts` (or relevant) verifying correct single-option behavior for Codex vs others.
    - [x] Implement `promptForInstallScope` in `src/cli/prompt.ts`.
- [x] Task: Update `CodexGenerator` for Global Path Resolution <!-- 2440184 -->
    - [x] Create test `__tests__/generators/CodexGenerator.test.ts` verifying path resolution to `~/.codex`.
    - [x] Implement path resolution logic using `os.homedir()`.
- [ ] Task: Conductor - User Manual Verification 'Core Logic & Tests' (Protocol in workflow.md)

### Phase 2: Integration
- [ ] Task: Wire up `install` command
    - [ ] Update `src/commands/install.ts` to call `promptForInstallScope`.
    - [ ] Pass the result to the generator.
- [ ] Task: Verify End-to-End Installation Flow
    - [ ] Run manual installation of Codex (verify `~/.codex` creation).
    - [ ] Run manual installation of OpenCode (verify local creation).
- [ ] Task: Conductor - User Manual Verification 'Integration' (Protocol in workflow.md)
