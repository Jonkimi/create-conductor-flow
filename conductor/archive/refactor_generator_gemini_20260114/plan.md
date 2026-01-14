# Implementation Plan - Refactor ConfigurableGenerator and Gemini CLI Paths

## Phase 1: Architecture Refactor and Global Folder Restructure
- [x] Task: Define `AgentGeneratorStrategy` interface and update `AgentConfig` type
    - [x] Create `src/generators/types/strategies.ts` defining `ContentStrategy` and `FileStrategy` interfaces.
    - [x] Update `src/generators/types.ts` to include optional strategies in `AgentConfig`.
- [x] Task: Implement Default Strategy
    - [x] Create `src/generators/default/strategy.ts` implementing the current default logic.
    - [x] Create `src/generators/default/index.ts` to export.
- [x] Task: Adapt `ConfigurableGenerator`
    - [x] Refactor `ConfigurableGenerator.ts` to consume strategies.
    - [x] Ensure backward compatibility by defaulting to `DefaultStrategy` if none provided.
- [x] Task: Refactor All Agents to Folder Structure
    - [x] **Create folders and strategy files for all agents.**
    - [x] Update `src/generators/config.ts` to import configs/strategies from these new locations.
    - [x] Verify functionality with existing tests.
- [x] Task: Conductor - User Manual Verification 'Architecture Refactor' (Protocol in workflow.md)

## Phase 2: Gemini CLI Path and Naming Update
- [x] Task: Implement Gemini Strategy
    - [x] Create `src/generators/gemini/strategy.ts`.
    - [x] Create `src/generators/gemini/index.ts`.
    - [x] Implement `processContent` to handle variable replacement.
    - [x] Implement `writeFiles` to target `.gemini/commands/conductor` and remove `conductor:` prefix.
- [x] Task: Update Gemini Configuration
    - [x] Create failing test case for Gemini file paths and content.
    - [x] Update `config.ts` to use `GeminiStrategy`.
    - [x] Verify tests pass.
- [x] Task: Conductor - User Manual Verification 'Gemini CLI Path and Naming Update' (Protocol in workflow.md)
