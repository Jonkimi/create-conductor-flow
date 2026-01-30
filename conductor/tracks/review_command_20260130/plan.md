# Implementation Plan: Add Review Command Support to All Agent Generators

## Phase 1: Test-Driven Development Setup

### Task 1.1: Write Failing Tests for Review Command Inclusion
- [x] Create unit test to verify ConfigurableGenerator includes 'review' in commands array
- [x] Create integration test to verify review command file is generated
- [x] Create test to verify review.toml template is loadable
- [x] Run tests and confirm they fail (Red phase)
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Implementation

### Task 2.1: Add Review Command to ConfigurableGenerator
- [x] Modify `src/generators/ConfigurableGenerator.ts` line 89
- [x] Add 'review' to commands array: `['setup', 'newTrack', 'implement', 'status', 'revert', 'review']`
- [x] Verify the change compiles without errors
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Verification and Testing

### Task 3.1: Run Tests to Verify Implementation
- [~] Run unit tests: `CI=true npm test`
- [~] Verify all tests pass (Green phase)
- [~] Run coverage report: `npm run coverage`
- [~] Verify coverage remains >80%

### Task 3.2: Manual Integration Testing
- [ ] Build the project: `npm run build`
- [ ] Verify review.toml is copied to `dist/templates/commands/`
- [ ] Run local installation test in a test project
- [ ] Verify review.md command file is created for selected agent
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Documentation and Completion

### Task 4.1: Documentation Synchronization
- [ ] Review if Product Definition needs updates (unlikely for this change)
- [ ] Review if Tech Stack needs updates (no changes required)
- [ ] Confirm no documentation updates needed
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
