# Track Specification: Add Gemini CLI Agent Support

## Overview
Add support for the Gemini CLI agent to the Conductor-for-All framework. This track implements the necessary configuration and generation logic to enable Conductor workflows for Gemini CLI users.

## Track Type
Feature

## Functional Requirements

### 1. Agent Configuration
- Add Gemini CLI as a supported agent in the agent registry
- Configure agent-specific settings:
  - **Display Name:** "Gemini CLI"
  - **Agent Type:** "gemini" (internal identifier)
  - **Agent Directory:** `.gemini`
  - **Install Path:** `.gemini/conductor`
  - **Commands Directory:** `.gemini/commands`
  - **Install Scope:** Project level only (no global installation support)
  - **File Format:** TOML (same structure as original templates)
  - **Extension:** `.toml`

### 2. Template Processing
- Use the existing `ConfigurableGenerator` class for generating Gemini CLI artifacts
- Substitute only the `CODE_AGENT_INSTALL_PATH` variable in TOML templates
- Preserve the original TOML structure including:
  - `description` field
  - `prompt` field
  - All other TOML metadata

### 3. Generated Files

#### 3.1 Core Conductor Files (in `.gemini/conductor/`)
- `workflow.md` - Project workflow and development methodology
- `tech-stack.md` - Technology stack documentation
- `product.md` - Product vision and goals
- `templates/` - Template files directory (copied from source)

#### 3.2 Command Files (in `.gemini/commands/`)
All 5 Conductor commands in TOML format:
- `conductor:setup.toml` - Initialize Conductor in project
- `conductor:newTrack.toml` - Create new feature/bug fix tracks
- `conductor:implement.toml` - Implement selected tracks
- `conductor:status.toml` - Check track status
- `conductor:revert.toml` - Revert previous work

Each command file should contain:
- `description` field - Brief description of the command
- `prompt` field - Full command implementation with substituted install path

### 4. Installation Flow
1. User selects "Gemini CLI" from agent selection menu
2. System validates project directory exists
3. System checks for existing installation in `.gemini/conductor` and `.gemini/commands/conductor:setup.toml`
4. System creates directory structure:
   - `.gemini/`
   - `.gemini/commands/`
   - `.gemini/conductor/`
   - `.gemini/conductor/templates/`
5. System copies template files to `.gemini/conductor/templates/`
6. System generates all 5 command TOML files with:
   - Original TOML structure preserved
   - `CODE_AGENT_INSTALL_PATH` replaced with `.gemini/conductor`
   - Description field intact
   - Prompt content intact with variable substitution

### 5. Variable Substitution Logic
- Target variable: `__$CODE_AGENT_INSTALL_PATH$__`
- Replacement value: `.gemini/conductor` (project-level)
- For global scope: Not applicable (Gemini CLI only supports project-level)
- Additional variables: None required (only basic install path substitution)

## Non-Functional Requirements

### Code Quality
- Follow existing TypeScript patterns in `src/generators/`
- Maintain type safety with proper interfaces
- Reuse existing `ConfigurableGenerator` class

### Testing
- Add unit tests for Gemini CLI configuration
- Test TOML generation and variable substitution
- Verify generated files match expected structure
- Test installation flow end-to-end

### Compatibility
- Maintain backward compatibility with existing agents
- Ensure Gemini CLI integration follows same patterns as other agents

### Documentation
- Update agent selection prompts to include Gemini CLI option
- Document Gemini CLI-specific behavior (TOML format, project-level only)
- Update any relevant README or usage documentation

## Acceptance Criteria

1. **Agent Selection:** "Gemini CLI" appears in agent selection menu
2. **Directory Structure:** Installation creates correct `.gemini/` directory structure
3. **File Generation:** All 5 command TOML files are generated in `.gemini/commands/`
4. **TOML Structure:** Generated TOML files preserve `description` and `prompt` fields
5. **Variable Substitution:** `CODE_AGENT_INSTALL_PATH` correctly replaced with `.gemini/conductor`
6. **Core Files:** All core Conductor files (workflow.md, tech-stack.md, product.md) are created
7. **No Global Installation:** System rejects global installation attempts for Gemini CLI agent
8. **Validation:** Installation correctly detects and prevents duplicate installations
9. **Tests:** All new unit tests pass with >80% code coverage
10. **Existing Functionality:** All existing agent installations continue to work correctly

## Out of Scope

- Global installation support for Gemini CLI (project-level only)
- Custom Gemini CLI-specific commands beyond the 5 core Conductor commands
- Conversion from TOML to markdown format (keep original TOML)
- Additional Gemini CLI-specific templates or workflows
- CLI features specific to Gemini CLI beyond the scope of existing agent framework

## Technical Notes

- The `ConfigurableGenerator` class already handles TOML processing and variable substitution
- Only requires adding a new agent configuration entry
- TOML format is the same structure used by original Gemini CLI Conductor extension
- The `CODE_AGENT_INSTALL_PATH` substitution pattern is already implemented in `processTemplateContent()`
