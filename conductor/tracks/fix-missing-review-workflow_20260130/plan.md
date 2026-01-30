# Implementation Plan - Fix Missing Conductor Review Workflow

## Phase 1: Analysis and Test Definition
- [x] Task: Analyze each generator implementation (Antigravity, Cursor, Windsurf, etc.) to define its specific expected output files list.
- [x] Task: Create a parameterized test or specific test cases that verify the **correct set of files** for each specific agent type.
    - [x] Antigravity: Expect all standard workflows including `review`.
    - [x] Other Agents: Define expectations based on their capabilities (e.g., some might not support all commands).
- [x] Task: Conductor - User Manual Verification 'Analysis and Test Definition' (Protocol in workflow.md)

## Phase 2: Diagnosis and Implementation
- [x] Task: Run the new agent-specific tests to identify gaps (specifically confirming Antigravity is missing `review`).
- [x] Task: Modify `src/generators/ConfigurableGenerator.ts` to include `review` in the command list (if it's missing globally) OR updated specific agent configs.
- [x] Task: Ensure the fix respects the specific capabilities mapping defined in Phase 1.
- [x] Task: Conductor - User Manual Verification 'Diagnosis and Implementation' (Protocol in workflow.md)

## Phase 3: Verification
- [x] Task: Run the agent-specific test suite and confirm all agents produce exactly their expected files.
- [x] Task: particular focus: Verify Antigravity now generates `conductor:review.md`.
- [x] Task: Conductor - User Manual Verification 'Verification' (Protocol in workflow.md)
