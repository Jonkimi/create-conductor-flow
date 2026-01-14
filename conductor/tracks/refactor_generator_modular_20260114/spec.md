# Specification - Modularize Agent Generators and Configs

## Overview
Refactor the generator architecture to be fully modular by moving agent-specific generator classes and configurations into their respective agent folders.

## Requirements

### 1. Folder Restructuring
For each agent (e.g., `antigravity`, `gemini`, `cline`, etc.), move or create the following files within `src/generators/<agent>/`:
- `generator.ts`: The generator class (e.g., `AntigravityGenerator`).
- `config.ts`: The `AgentConfig` object for that agent.
- `index.ts`: Export both the generator class and the config.

### 2. Registry Update
Update `src/generators/config.ts` to act as a registry that imports configurations from the individual agent folders, rather than defining them all in one place.

### 3. Generator Factory
Ensure `src/generators/factory.ts` remains functional and correctly uses the new modular structure.

### 4. Cleanup
Remove the top-level agent generator files (e.g., `src/generators/AntigravityGenerator.ts`, etc.) once they are moved.

## Acceptance Criteria
- All agent generators are located in their respective `src/generators/<agent>/` folders.
- All agent configurations are located in their respective `src/generators/<agent>/` folders.
- `src/generators/config.ts` is a clean registry file.
- `npm test` passes with 100% success.
- No circular dependencies are introduced.
