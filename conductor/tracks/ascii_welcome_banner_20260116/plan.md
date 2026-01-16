# Plan: Welcome ASCII Banner

## Phase 1: Setup and Assets
- [x] Task: Install `gradient-string` dependency <!-- id: 1 --> [b82e208]
- [ ] Task: Create `src/utils/banner.ts` with static ASCII art constant <!-- id: 2 -->
    - [ ] Create file `src/utils/banner.ts`
    - [ ] Add `CONDUCTOR_BANNER` string constant with the ASCII art
    - [ ] Export the constant

## Phase 2: Implementation
- [ ] Task: Implement banner display logic <!-- id: 3 -->
    - [ ] Create strict unit test for banner output in `tests/banner.test.ts` (Red Phase)
    - [ ] Modify `src/index.ts` to import `CONDUCTOR_BANNER` and `gradient-string`
    - [ ] Implement strict logic to print banner using gradient-string before any other output (Green Phase)
    - [ ] Verify functionality with manual run

## Phase 3: Verification
- [ ] Task: Verify banner appearance and timing <!-- id: 4 -->
    - [ ] Run `conductor` and visually confirm:
        - Banner appears first
        - Text is "CONDUCTOR 4 ALL"
        - Gradient is Green -> Blue
    - [ ] Conductor - User Manual Verification 'Welcome ASCII Banner' (Protocol in workflow.md)
