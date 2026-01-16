# Specification: Welcome ASCII Banner

## 1. Overview
Implement a high-impact, "Cyberpunk" styled ASCII art banner displaying "CONDUCTOR 4 ALL" that appears immediately when the CLI is executed.

## 2. Functional Requirements
- **Content:** Display the text "CONDUCTOR 4 ALL" in ASCII art.
- **Timing:** Must be the very first output to the console when `conductor` is run (before any checks or prompts).
- **Style:**
  - **Art:** Use a static, pre-generated ASCII art string (Font style: 'Standard' or similar readable block font).
  - **Color:** Apply a gradient effect transitioning from **Green to Blue** to achieve a "futuristic/cyberpunk" aesthetic.

## 3. Technical Requirements
- **Dependency:** Add `gradient-string` (or similar lightweight library) to handle the gradient coloring easily.
- **Implementation:**
  - Store the raw ASCII string as a constant (e.g., in `src/constants.ts` or `src/utils/banner.ts`).
  - Use `gradient-string` to print it to `stdout` in the main entry point (`src/index.ts`).
  - Ensure zero significant performance impact on startup.
