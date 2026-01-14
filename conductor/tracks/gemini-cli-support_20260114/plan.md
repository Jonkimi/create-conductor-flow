# Implementation Plan: Add Gemini CLI Agent Support

## Phase 1: Configuration Setup

### Task: Write failing tests for Gemini CLI agent configuration [x]
- [x] Test agent configuration properties (displayName, agentType, agentDir, commandsDir, etc.)
- [x] Test install scope is restricted to project-level only
- [x] Test TOML extension is set correctly
- [x] Test that configuration validates correctly

### Task: Implement Gemini CLI agent configuration [x]
- [x] Add Gemini CLI agent configuration to agent registry
- [x] Configure displayName as "Gemini CLI"
- [x] Configure agentType as "gemini"
- [x] Configure agentDir as ".gemini"
- [x] Configure installPath as ".gemini/conductor"
- [x] Configure commandsDir as "commands"
- [x] Configure extension as ".toml"
- [x] Configure scope to project-level only
- [x] Ensure no global installation support for Gemini CLI

### Task: Verify configuration tests pass [x]
- [x] Run unit tests for Gemini CLI configuration
- [x] Verify all tests pass
- [x] Check code coverage for new configuration code

### Task: Conductor - User Manual Verification 'Phase 1: Configuration Setup' (Protocol in workflow.md)

## Phase 2: TOML Generation Testing

### Task: Write failing tests for TOML file generation
- [ ] Test TOML structure preservation (description and prompt fields)
- [ ] Test CODE_AGENT_INSTALL_PATH variable substitution
- [ ] Test generation of all 5 command TOML files
- [ ] Test that generated TOML files are valid TOML format

### Task: Implement TOML generation verification
- [ ] Ensure ConfigurableGenerator correctly processes Gemini CLI configuration
- [ ] Verify TOML template loading works correctly
- [ ] Verify CODE_AGENT_INSTALL_PATH substitution to ".gemini/conductor"
- [ ] Verify TOML structure is preserved (description and prompt fields intact)

### Task: Verify TOML generation tests pass
- [ ] Run unit tests for TOML generation
- [ ] Verify all tests pass
- [ ] Check that generated TOML files match expected structure

### Task: Conductor - User Manual Verification 'Phase 2: TOML Generation Testing' (Protocol in workflow.md)

## Phase 3: CLI Integration

### Task: Write failing tests for CLI agent selection
- [ ] Test Gemini CLI appears in agent selection menu
- [ ] Test user can select Gemini CLI from menu
- [ ] Test selection returns correct configuration

### Task: Integrate Gemini CLI into CLI agent selection
- [ ] Add Gemini CLI option to agent selection menu
- [ ] Ensure proper sorting/placement in menu options
- [ ] Test menu displays correctly to users

### Task: Verify CLI integration tests pass
- [ ] Run unit tests for CLI integration
- [ ] Verify all tests pass
- [ ] Manual test: Verify agent selection menu shows Gemini CLI option

### Task: Conductor - User Manual Verification 'Phase 3: CLI Integration' (Protocol in workflow.md)

## Phase 4: End-to-End Installation Testing

### Task: Write integration tests for complete installation flow
- [ ] Test installation creates correct directory structure (.gemini/, .gemini/commands/, .gemini/conductor/)
- [ ] Test all 5 command TOML files are generated
- [ ] Test core Conductor files are copied (workflow.md, tech-stack.md, product.md)
- [ ] Test templates directory is copied
- [ ] Test CODE_AGENT_INSTALL_PATH substitution in generated files
- [ ] Test duplicate installation detection and prevention
- [ ] Test global installation is rejected for Gemini CLI

### Task: Execute integration tests and verify installation
- [ ] Run integration tests for complete installation
- [ ] Verify all tests pass
- [ ] Manual test: Run `conductor-4-all install` and select Gemini CLI
- [ ] Verify directory structure is created correctly
- [ ] Verify all files are generated with correct content
- [ ] Verify TOML files have correct structure with description and prompt fields

### Task: Conductor - User Manual Verification 'Phase 4: End-to-End Installation Testing' (Protocol in workflow.md)

## Phase 5: Documentation

### Task: Update documentation for Gemini CLI support
- [ ] Update README.md to include Gemini CLI in supported agents list
- [ ] Document Gemini CLI-specific behavior (TOML format, project-level only)
- [ ] Document agent directory structure for Gemini CLI (.gemini/)

### Task: Verify documentation
- [ ] Review updated documentation for accuracy
- [ ] Ensure Gemini CLI is prominently featured in agent list
- [ ] Verify all Gemini CLI-specific details are clearly documented

### Task: Conductor - User Manual Verification 'Phase 5: Documentation' (Protocol in workflow.md)

## Phase 6: Quality Assurance

### Task: Run full test suite
- [ ] Execute all unit tests
- [ ] Execute all integration tests
- [ ] Verify test coverage >80%
- [ ] Fix any failing tests

### Task: Verify no regressions
- [ ] Test installation of other agents (Codex, Cline, Cursor, etc.)
- [ ] Verify existing functionality still works
- [ ] Ensure backward compatibility is maintained

### Task: Final verification
- [ ] Run linting and type checking
- [ ] Verify all code follows project guidelines
- [ ] Check for any security vulnerabilities

### Task: Conductor - User Manual Verification 'Phase 6: Quality Assurance' (Protocol in workflow.md)
