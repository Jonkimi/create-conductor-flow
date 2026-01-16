# Plan: Welcome ASCII Banner

## Phase 1: Setup and Assets
- [x] Task: Install `gradient-string` dependency <!-- id: 1 --> [b82e208]
- [x] Task: Create `src/utils/banner.ts` with static ASCII art constant <!-- id: 2 --> [db3ac37]
    - [x] Create file `src/utils/banner.ts`
    - [x] Add `CONDUCTOR_BANNER` string constant with the ASCII art
    - [x] Export the constant

## Phase 2: Implementation
- [x] Task: Implement banner display logic <!-- id: 3 --> [801cfa4]
    - [x] Create strict unit test for banner output in `tests/banner.test.ts` (Red Phase)
    - [x] Implement strict logic to print banner using gradient-string before any other output (Green Phase)
    - [x] Modify `src/index.ts` to import `CONDUCTOR_BANNER` and `gradient-string`
    - [x] Verify functionality with manual run

## Phase 3: Verification
- [ ] Task: Verify banner appearance and timing <!-- id: 4 -->
    - [~] Run `conductor` and visually confirm:
        - Banner appears first
        - Text is "CONDUCTOR 4 ALL"
        - Gradient is Green -> Blue
    - [x] Refine ASCII art based on user feedback (Font choice) [8b2e934]
    - [x] Fix line wrapping [11a702a]
    - [x] Conductor - User Manual Verification 'Welcome ASCII Banner' (Protocol in workflow.md)
