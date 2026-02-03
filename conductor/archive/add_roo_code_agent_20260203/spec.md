# Specification: Add Roo Code Agent Support

## Overview
Add "Roo Code" as a supported AI coding agent in the Conductor framework. This involves adding the necessary configuration, generator logic, CLI options, and documentation updates.

## Functional Requirements
1.  **Core Types:**
    - Update `src/types.ts` to include `roo-code` in the `AgentType` union.
2.  **Generator Implementation:**
    - Create a new directory `src/generators/roo-code/`.
    - Implement `rooCodeConfig` in `src/generators/roo-code/config.ts`:
        - `agentType`: `roo-code`
        - `agentDir`: `.roo`
        - `commandsDir`: `commands`
        - `displayName`: `Roo Code`
        - `protocolFilename`: `AGENTS.md`
    - Implement `RooCodeGenerator` (leveraging `ConfigurableGenerator`).
3.  **Registration:**
    - Register Roo Code in `src/generators/registry.ts` and `src/generators/index.ts`.
4.  **CLI Updates:**
    - Add `roo-code` to the choices list in `src/cli/index.ts` and `src/conductor-install.ts`.
5.  **Documentation:**
    - Update `README.md`, `README_zh.md`, `README_ja.md`, and `README_ko.md` to include Roo Code in the "Universal AI Compatibility" and "Usage" sections.
6.  **Testing:**
    - Add unit tests for the new generator and configuration.
    - Update prompt tests to include Roo Code validation.

## Non-Functional Requirements
- **Consistency:** Ensure the implementation follows the patterns established by other agents like Kilo Code.
- **Style:** Adhere to the TypeScript style guide in `conductor/code_styleguides/typescript.md`.

## Acceptance Criteria
- [ ] `npx conductor-install --agent roo-code` successfully initializes a project with `.roo/commands/` and `AGENTS.md`.
- [ ] Roo Code is selectable via the interactive CLI menu.
- [ ] All unit tests pass, and coverage for new code is >80%.
- [ ] Multilingual documentation is updated and accurate.
