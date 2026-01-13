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

## Phase 2: Generator Implementation [checkpoint: 6296436]
- [x] Task: Create ClineGenerator class [067f6b0]
    - [x] Create `src/generators/ClineGenerator.ts`
    - [x] Implement AgentGenerator interface
    - [x] Delegate to createGenerator(AGENT_CONFIGS.cline)
- [x] Task: Update factory to handle cline agent type [9a73b2c]
    - [x] Update `src/generators/index.ts` getGenerator function
    - [x] Add case for 'cline' to return ClineGenerator instance
    - [x] Export ClineGenerator
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: CLI Integration [checkpoint: 73bbdb7]
- [x] Task: Add cline to agent selection prompt [e0d9550]
    - [x] Update `src/cli/prompt.ts` promptForAgent function
    - [x] Add cline option with name "Cline"
    - [x] Add description "Cline AI coding assistant"
- [x] Task: Configure install scope for cline [94c23b8]
    - [x] Update `src/cli/prompt.ts` promptForInstallScope function
    - [x] Add logic to detect cline agent type
    - [x] Restrict options to project-level only for cline
    - [x] Set default to 'project' for cline
- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Command File Format Customization [checkpoint: b4b9f5b]
- [x] Task: Update processTemplateContent for plain markdown format [509b671]
    - [x] Analyze ConfigurableGenerator.processTemplateContent function
    - [x] Add logic to detect cline agent type
    - [x] Generate plain markdown without frontmatter for cline
    - [x] Extract description from TOML and use as command title prefix
- [x] Task: Implement title generation for cline commands [509b671]
    - [x] Create "Conductor <Command Name>" title format
    - [x] Apply titles for all 5 commands (setup, newTrack, implement, status, revert)
- [x] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)

## Phase 5: Testing and Verification [checkpoint: 4d6618a]
- [x] Task: Write unit tests for ClineGenerator [76b75e5]
    - [x] Create test file `src/generators/ClineGenerator.test.ts`
    - [x] Write tests for validate method
    - [x] Write tests for generate method
    - [x] Test directory creation for .clinerules
    - [x] Test command file generation with plain markdown format
- [x] Task: Write tests for CLI prompt integration [e0d9550]
    - [x] Update test file for agent selection
    - [x] Verify cline appears in agent choices
    - [x] Test install scope prompt for cline
    - [x] Verify only project-level option available for cline
- [x] Task: Run full test suite [76b75e5]
    - [x] Execute `pnpm test`
    - [x] Verify all existing tests still pass
    - [x] Verify new tests pass
    - [x] Check code coverage meets >80% requirement
- [x] Task: Conductor - User Manual Verification 'Phase 5' (Protocol in workflow.md)

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
