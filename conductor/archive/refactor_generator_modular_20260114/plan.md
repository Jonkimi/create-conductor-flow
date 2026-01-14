# Implementation Plan - Modularize Agent Generators and Configs

## Phase 1: Modularize Each Agent
Iterate through all supported agents and move their logic into dedicated folders.

- [x] **Task: Modularize Gemini**
    - [x] Create `src/generators/gemini/generator.ts` (move from `src/generators/GeminiGenerator.ts`).
    - [x] Create `src/generators/gemini/config.ts` (extract from `src/generators/config.ts`).
    - [x] Update `src/generators/gemini/index.ts`.
- [x] **Task: Modularize Cline**
    - [x] Create `src/generators/cline/generator.ts`.
    - [x] Create `src/generators/cline/config.ts`.
    - [x] Update `src/generators/cline/index.ts`.
- [x] **Task: Modularize VS Code Copilot**
    - [x] Create `src/generators/vscode-copilot/generator.ts`.
    - [x] Create `src/generators/vscode-copilot/config.ts`.
    - [x] Update `src/generators/vscode-copilot/index.ts`.
- [x] **Task: Modularize Other Agents** (OpenCode, Claude Code, Antigravity, Cursor, Codex, Windsurf)
    - [x] Repeat the same pattern for each.

## Phase 2: Registry and Factory Refactor
- [x] **Task: Update AGENT_CONFIGS Registry**
    - [x] Refactor `src/generators/config.ts` to import configs from agent folders.
- [x] **Task: Verification**
    - [x] Run `npm test`.
    - [x] Perform manual verification.

## Phase 3: Cleanup
- [x] **Task: Remove Legacy Files**
    - [x] Delete top-level generator files in `src/generators/`.
