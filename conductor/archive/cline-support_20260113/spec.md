# Spec: Add Cline Agent Support

## Overview
Add support for the Cline AI coding agent to enable Conductor methodology installation and command generation for Cline users.

## Background
Cline is an AI coding agent that uses a different directory structure compared to other supported agents:
- Agent directory: `.clinerules`
- Command directory: `.clinerules/workflows/`
- Template directory: `.clinerules/conductor`
- Invocation mechanism: Reads commands from the `.clinerules/workflows/` directory

## Functional Requirements

### 1. Configuration Updates

#### 1.1 Add Cline to Agent Type System
- Add `'cline'` to the `AgentType` union type in `src/types.ts`
- Add cline configuration to `AGENT_CONFIGS` in `src/generators/config.ts` with the following settings:
  ```typescript
  cline: {
    agentType: 'cline',
    agentDir: '.clinerules',
    commandsDir: 'workflows',
    displayName: 'Cline',
  }
  ```

#### 1.2 Create Cline Generator Class
- Create `src/generators/ClineGenerator.ts` following the same pattern as other agents (e.g., OpenCodeGenerator, CursorGenerator)
- The generator should delegate to `createGenerator(AGENT_CONFIGS.cline)`

#### 1.3 Update Factory
- Add cline to the `getGenerator` function in `src/generators/index.ts`
- Return `ClineGenerator` instance when `'cline'` agent type is requested

### 2. CLI Prompt Integration

#### 2.1 Add Cline to Agent Selection
- Add Cline as an option in `promptForAgent()` function in `src/cli/prompt.ts`
- Display name: "Cline"
- Description: "Cline AI coding assistant"
- Ensure cline appears in the agent selection list alongside other agents

#### 2.2 Configure Install Scope Prompt
- Cline only supports project-level installation
- Update `promptForInstallScope()` in `src/cli/prompt.ts` to handle cline
- When agent is 'cline', only offer "Project (Current Directory)" option
- Set default to 'project' for cline

### 3. Command File Format

#### 3.1 Plain Markdown Format
- Command files should be plain markdown with simple title headers
- No frontmatter metadata (unlike other agents)
- Title format: `Conductor <Command Name>` (e.g., "Conductor Implement", "Conductor New Track")
- Use description extracted from the original TOML template as the command description

#### 3.2 Command List
Generate the following commands for cline:
- `conductor:setup.md`
- `conductor:newTrack.md`
- `conductor:implement.md`
- `conductor:status.md`
- `conductor:revert.md`

### 4. Validation

#### 4.1 Installation Validation
- Validate that target directory exists before installation
- Check if Conductor is already installed by verifying existence of:
  - `.clinerules/workflows/conductor:setup.md`
  - `.clinerules/conductor/`
- Throw error if already installed with appropriate message

#### 4.2 No Special Handling Required
- Follow the same pattern as other agents (no extra validation or warnings)
- Do not create directories if they don't exist (user must create `.clinerules` manually)

## Non-Functional Requirements

- **Compatibility**: Must work with existing Cline workflow directory structure
- **Consistency**: Follow established patterns from other agent generators
- **Maintainability**: Code should be consistent with existing generator implementations

## Acceptance Criteria

- [ ] Cline appears in agent selection prompt
- [ ] Selecting cline offers only project-level installation
- [ ] Running `conductor-4-all install` with cline agent creates:
  - `.clinerules/workflows/` directory with 5 command files
  - `.clinerules/conductor/` directory with templates
- [ ] Command files are in plain markdown format with "Conductor <Command>" titles
- [ ] Command files include descriptions extracted from TOML templates
- [ ] Installation validates target directory and detects existing installations
- [ ] All existing tests continue to pass
- [ ] New tests added for cline generator

## Out of Scope

- Modifying existing agent generators
- Changing the TOML template processing logic
- Creating custom command formats beyond plain markdown with titles
- Global installation support for cline (project-level only)

## Technical Notes

### Current Template Processing
The existing `processTemplateContent()` function in `ConfigurableGenerator`:
- Parses TOML to extract `prompt` and `description` fields
- Replaces `__$$CODE_AGENT_INSTALL_PATH$$__` with install path
- Substitutes `{agent_type}` variable
- For cline: Should generate plain markdown with "Conductor <Command>" title header

### File Naming
Command files follow pattern: `conductor:<command>.md`
- e.g., `conductor:setup.md`, `conductor:newTrack.md`

### Template Directory Structure
Source templates: `dist/templates/commands/*.toml`
Destination: `.clinerules/workflows/conductor:<command>.md`
Templates directory: `dist/templates/` → `.clinerules/conductor/templates/`
