# Specification: Add Factory Droid Coding Agent Type

## Overview
This track adds support for the "Factory Droid" coding agent to the Conductor CLI. This allows users to initialize and manage Conductor tracks specifically for the Factory Droid agent, similar to existing supports for Claude Code or Qwen Code.

## Functional Requirements
- **Agent Registration:** Register `factory-droid` as a valid agent type in the system.
- **Generator Implementation:** Create a `FactoryDroidGenerator` that inherits from `ConfigurableGenerator` (or the appropriate base class) to handle artifact creation.
- **Configuration:**
  - Command Alias: `factory-droid`
  - Target Directory: `.factory/`
  - File Extension: `.md`
- **Installation Scopes:** Support both `--global` and project-level installation.
- **Artifacts:** Generate standard Conductor instruction files (e.g., `README.md`, or specific command instructions) within the `.factory/` directory.

## Non-Functional Requirements
- **Consistency:** The implementation must follow the patterns established by `QwenCodeGenerator` and other recently added agents.
- **Testability:** Include unit tests for the new generator to verify correct file paths and content generation.

## Acceptance Criteria
- [ ] Running `conductor install --agent factory-droid` successfully creates the `.factory/` directory with the correct templates.
- [ ] The agent is selectable via the interactive `conductor install` prompt.
- [ ] Unit tests for `FactoryDroidGenerator` pass.
- [ ] The `package.json` or registry is updated to include the new agent type.

## Out of Scope
- Implementation of the actual Factory Droid agent itself.
- Integration with non-standard Factory Droid plugins.
