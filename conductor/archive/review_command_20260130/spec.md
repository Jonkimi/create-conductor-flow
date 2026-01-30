# Track Specification: Add Review Command Support to All Agent Generators

## Overview

Add the `review` command to all agent generators in conductor-4-all. The review command enables AI agents to perform code reviews on completed tracks, checking implementation against project standards, design guidelines, and original plans.

**Type:** Feature  
**Priority:** Medium  
**Estimated Effort:** 1-2 hours

## Background

The original Gemini Conductor includes a review command that acts as a Principal Software Engineer to:
- Review track implementations against project standards
- Verify compliance with plan.md, product-guidelines.md, and code styleguides
- Execute test suites and verify coverage
- Provide structured review reports with severity-classified findings
- Offer post-review actions: apply fixes, archive, or delete tracks

The review.toml template already exists at `gemini-conductor-codebase/commands/review.toml` (159 lines), but the command is not being generated for any agents.

## Functional Requirements

### FR1: Enable Review Command Generation
**Priority:** Must Have

Add `'review'` to the commands array in `ConfigurableGenerator.ts` (line 89), joining the existing commands:
- Current: `['setup', 'newTrack', 'implement', 'status', 'revert']`
- New: `['setup', 'newTrack', 'implement', 'status', 'revert', 'review']`

### FR2: Universal Agent Support
**Priority:** Must Have

The review command must be automatically generated for all 9 supported agents:
1. OpenCode (`.opencode/`)
2. Claude Code (`.claude/`)
3. Cursor (`.cursor/`)
4. Windsurf (`.windsurf/`)
5. VS Code Copilot (`.vscode/`)
6. Cline (`.cline/`)
7. Codex (`.codex/`)
8. Gemini CLI (`.gemini/`)
9. Antigravity (`.antigravity/`)

### FR3: Template Integration
**Priority:** Must Have

The existing `review.toml` template must be processed and converted to agent-specific formats:
- Markdown format (`.md`) for most agents
- TOML format (`.toml`) for Gemini CLI
- Frontmatter must include command description: "Reviews the completed track work against guidelines and the plan"

### FR4: Build System Compatibility
**Priority:** Must Have

The implementation must work with the existing build process:
- `tsup.config.ts` copies `gemini-conductor-codebase` to `dist/templates` on build
- Template loading via `loadTemplate('commands/review.toml')` must succeed
- No changes required to build configuration

## Non-Functional Requirements

### NFR1: Code Coverage
**Priority:** Must Have

- New code must maintain >80% coverage target
- Unit tests must verify review command inclusion in generator output

### NFR2: Backward Compatibility
**Priority:** Should Have

- Existing installations should not be affected
- New installations get the review command automatically
- No breaking changes to existing command structure

### NFR3: Zero Configuration
**Priority:** Should Have

- Users should not need to configure anything to enable the review command
- Works out of the box after running `npx conductor-4-all install`

## Acceptance Criteria

- [ ] The review command is added to the ConfigurableGenerator commands array
- [ ] All 9 agent generators (OpenCode, Claude Code, Cursor, etc.) can generate the review command
- [ ] The review.toml template is copied to dist/templates during build
- [ ] Running `npx conductor-4-all install` creates review.md command files for the selected agent
- [ ] Unit tests verify the review command is included in the generator output
- [ ] Integration tests verify review command files are created during installation
- [ ] Test coverage remains >80% after implementation

## Out of Scope

- Modifying the review.toml template content (using existing template as-is)
- Adding new review functionality or features
- Supporting agents beyond the existing 9
- Changes to the build system or template loading mechanism
- Documentation updates (will be handled by existing sync protocols)

## Technical Notes

**Key Files:**
- `src/generators/ConfigurableGenerator.ts` (line 89) - Add 'review' to commands array
- `gemini-conductor-codebase/commands/review.toml` - Already exists, 159 lines

**Testing Strategy:**
1. Unit test: Verify ConfigurableGenerator includes 'review' in commands list
2. Integration test: Verify generator produces review command file
3. Coverage check: Ensure no coverage regression
