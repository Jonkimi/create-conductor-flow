# Specification: Refactor Installation Logic into Generators

## Overview
The goal of this track is to refactor the current installation logic for different coding agents (OpenCode, Claude Code, Antigravity) into a modular, generator-based architecture. Instead of a single utility file with conditional logic, each agent type will have its own generator class responsible for its specific installation requirements. This refactor aims to improve maintainability and scalability without changing existing features or business logic.

## Functional Requirements

### 1. Generator Architecture
- **Interface Definition:**
  - Create an interface `AgentGenerator` (or similar) in `src/generators/types.ts` (or `src/types.ts`).
  - Required methods:
    - `validate(targetDir: string): Promise<string>`
    - `generate(targetDir: string): Promise<void>` (covers directory creation and file copying)
- **Composition over Inheritance:**
  - Implement shared logic (file operations, template processing) as composable utilities or helper classes, not via class inheritance.
  - Generators will import and use these utilities.

### 2. Specific Generators
- **OpenCodeGenerator:**
  - Class: `OpenCodeGenerator`
  - Location: `src/generators/OpenCodeGenerator.ts`
  - Logic: Handles standard `opencode` installation (`.opencode/commands`).
- **ClaudeCodeGenerator:**
  - Class: `ClaudeCodeGenerator`
  - Location: `src/generators/ClaudeCodeGenerator.ts`
  - Logic: Handles `claude-code` installation (`.claude/commands`).
- **AntigravityGenerator:**
  - Class: `AntigravityGenerator`
  - Location: `src/generators/AntigravityGenerator.ts`
  - Logic: Handles `antigravity` installation (`.agent/workflows`).

### 3. Integration
- **Factory/Selection Logic:**
  - Create a factory function or update the main installation entry point to select and instantiate the correct generator based on the user's agent choice.
- **Replacement:**
  Replace the direct calls to `validateProjectDirectory`, `createConductorDirectories`, and `copyTemplateFiles` in `src/utils/install.ts` (or wherever they are consumed) with calls to the appropriate generator instance.

## Non-Functional Requirements
- **No Behavioral Change:** The end result of the installation (files created, directories made) must be identical to the current implementation.
- **Code Quality:** Ensure strict type safety and cleaner code organization.
- **Testability:** The new structure should be easier to unit test.

## Acceptance Criteria
- [ ] `AgentGenerator` interface is defined.
- [ ] `OpenCodeGenerator`, `ClaudeCodeGenerator`, and `AntigravityGenerator` are implemented and adhere to the interface.
- [ ] Shared logic is extracted into composable functions (e.g., `src/utils/file-ops.ts` or similar).
- [ ] The original `src/utils/install.ts` is refactored or deprecated in favor of the new generators.
- [ ] Installation commands (`conductor:setup`) work exactly as before for all three agent types.
- [ ] Tests (existing or new) pass and verify the correct directory structures and files are created.

## Out of Scope
- Adding new agent types.
- Changing the content of the installed templates.
