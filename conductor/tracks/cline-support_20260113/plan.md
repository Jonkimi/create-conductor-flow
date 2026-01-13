# Implementation Plan: Add Cline Agent Support

## Phase 1: Type System and Configuration [checkpoint: 4924368]
- [x] Task: Add 'cline' to AgentType union type [33d29f2]
    - [x] Update `src/types.ts` to include 'cline' in AgentType union
- [x] Task: Add cline configuration to AGENT_CONFIGS [aad79f1]
    - [x] Update `src/generators/config.ts` with cline configuration
    - [x] Configure agentDir as '.clinerules'
    - [x] Configure commandsDir as 'workflows'
    - [x] Set displayName as 'Cline'
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Generator Implementation
- [x] Task: Create ClineGenerator class [067f6b0]
    - [x] Create `src/generators/ClineGenerator.ts`
    - [x] Implement AgentGenerator interface
    - [x] Delegate to createGenerator(AGENT_CONFIGS.cline)
- [x] Task: Update factory to handle cline agent type
    - [x] Update `src/generators/index.ts` getGenerator function
    - [x] Add case for 'cline' to return ClineGenerator instance
    - [x] Export ClineGenerator
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: CLI Integration
- [ ] Task: Add cline to agent selection prompt
    - [ ] Update `src/cli/prompt.ts` promptForAgent function
    - [ ] Add cline option with name "Cline"
    - [ ] Add description "Cline AI coding assistant"
- [ ] Task: Configure install scope for cline
    - [ ] Update `src/cli/prompt.ts` promptForInstallScope function
    - [ ] Add logic to detect cline agent type
    - [ ] Restrict options to project-level only for cline
    - [ ] Set default to 'project' for cline
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Command File Format Customization
- [ ] Task: Update processTemplateContent for plain markdown format
    - [ ] Analyze ConfigurableGenerator.processTemplateContent function
    - [ ] Add logic to detect cline agent type
    - [ ] Generate plain markdown without frontmatter for cline
    - [ ] Extract description from TOML and use as command title prefix
- [ ] Task: Implement title generation for cline commands
    - [ ] Create "Conductor <Command Name>" title format
    - [ ] Apply titles for all 5 commands (setup, newTrack, implement, status, revert)
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)

## Phase 5: Testing and Verification
- [ ] Task: Write unit tests for ClineGenerator
    - [ ] Create test file `src/generators/ClineGenerator.test.ts`
    - [ ] Write tests for validate method
    - [ ] Write tests for generate method
    - [ ] Test directory creation for .clinerules
    - [ ] Test command file generation with plain markdown format
- [ ] Task: Write tests for CLI prompt integration
    - [ ] Update test file for agent selection
    - [ ] Verify cline appears in agent choices
    - [ ] Test install scope prompt for cline
    - [ ] Verify only project-level option available for cline
- [ ] Task: Run full test suite
    - [ ] Execute `pnpm test`
    - [ ] Verify all existing tests still pass
    - [ ] Verify new tests pass
    - [ ] Check code coverage meets >80% requirement
- [ ] Task: Conductor - User Manual Verification 'Phase 5' (Protocol in workflow.md)

## Phase 6: Documentation and Finalization
- [ ] Task: Update README documentation
    - [ ] Review README for agent mentions
    - [ ] Add cline to supported agents list
    - [ ] Update usage examples if needed
- [ ] Task: Final verification
    - [ ] Build project with `pnpm build`
    - [ ] Test installation with cline agent
    - [ ] Verify command files are created in correct location
    - [ ] Verify command files have correct format
- [ ] Task: Conductor - User Manual Verification 'Phase 6' (Protocol in workflow.md)
