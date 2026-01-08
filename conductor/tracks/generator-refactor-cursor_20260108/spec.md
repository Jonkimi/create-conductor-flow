# Spec: Generator Refactor and Cursor Agent Support

## Overview
Refactor the agent generator architecture to a configuration-driven factory pattern while maintaining backward-compatible wrapper classes, and add support for Cursor IDE's custom slash commands.

## Functional Requirements

### FR1: Configuration-Driven Generator Architecture
- Define an `AgentConfig` interface containing all agent-specific configuration values:
  - `agentType`: Agent identifier string
  - `agentDir`: Root directory for agent files (e.g., `.cursor`, `.claude`)
  - `commandsDir`: Subdirectory for command files (e.g., `commands`, `workflows`)
  - `displayName`: Display name for error messages
- Create a `AGENT_CONFIGS` registry mapping `AgentType` to `AgentConfig`
- Implement a `createGenerator(config: AgentConfig): AgentGenerator` factory function
- Implement a `ConfigurableGenerator` class that uses the provided configuration
- Move `processTemplateContent()` from `src/generators/utils.ts` to the generator module

### FR2: Wrapper Classes (Backward Compatibility)
- Refactor existing generator classes as thin wrappers around the factory function:
  - `AntigravityGenerator` → delegates to `createGenerator(AGENT_CONFIGS.antigravity)`
  - `ClaudeCodeGenerator` → delegates to `createGenerator(AGENT_CONFIGS['claude-code'])`
  - `OpenCodeGenerator` → delegates to `createGenerator(AGENT_CONFIGS.opencode)`
- Add new `CursorGenerator` wrapper class

### FR3: Cursor Agent Support
- Add `cursor` as a new supported `AgentType`
- Cursor configuration:
  - `agentDir`: `.cursor`
  - `commandsDir`: `commands`
  - Command file format: `conductor:${cmd}.md`
  - Conductor path: `.cursor/conductor`

### FR4: CLI Integration
- Add `cursor` option to the agent selection prompt in the `install` command
- Update the `AgentType` type definition to include `'cursor'`

### FR5: Project Directory Validation
- Update `validateProjectDirectory` in `src/utils/install.ts` to detect Cursor agent installations
- Check for `.cursor/commands/conductor:setup.md` and `.cursor/conductor` paths

### FR6: File Cleanup
- Delete `src/generators/utils.ts` after moving `processTemplateContent()` to the generator module
- Keep `src/utils/template.ts` unchanged (generic template utilities)

## Non-Functional Requirements

### NFR1: Test Coverage
- Maintain >80% code coverage
- Add/update unit tests for:
  - `createGenerator` factory function
  - `ConfigurableGenerator` class
  - All wrapper classes (including new `CursorGenerator`)
  - Updated `validateProjectDirectory` logic

### NFR2: Documentation
- Update README.md to include Cursor as a supported agent
- Update README_zh.md accordingly

## Acceptance Criteria
- [ ] All existing agents (opencode, claude-code, antigravity) continue to work correctly
- [ ] Cursor agent can be installed via `npx conductor-4-all install`
- [ ] Generated Cursor files are placed in `.cursor/commands/` and `.cursor/conductor/`
- [ ] All unit tests pass with >80% coverage
- [ ] `src/generators/utils.ts` is deleted; logic moved to generator module
- [ ] README documents Cursor support

## Out of Scope
- Cursor-specific template customizations (use same templates as other agents)
- Team commands feature (Cursor Dashboard integration)
- Global commands (`~/.cursor/commands/`)
