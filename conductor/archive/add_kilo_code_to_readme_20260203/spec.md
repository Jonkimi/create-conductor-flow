# Specification: Add Kilo Code to Documentation

## Overview
The goal of this track is to update the project documentation to explicitly mention support for the "Kilo Code" coding agent. This will ensure users across all supported languages are aware of this compatibility.

## Functional Requirements
1.  **Update `README.md` (English):**
    -   Add "Kilo Code" to the "Key Features" list under "Universal AI Compatibility".
    -   Add "kilo-code" to the `choices` list in the "Usage" section (CLI options).
    -   Add "Kilo Code" to the list of agents in the "Alternative: Build from Source" section.
2.  **Update `README_zh.md` (Chinese):**
    -   Apply the same updates as the English README, ensuring appropriate context/translation if necessary.
3.  **Update `README_ja.md` (Japanese):**
    -   Apply the same updates as the English README.
4.  **Update `README_ko.md` (Korean):**
    -   Apply the same updates as the English README.

## Non-Functional Requirements
-   **Consistency:** Ensure "Kilo Code" is formatted consistently with other agents (e.g., bolding, capitalization) in all files.
-   **Ordering:** Where applicable, insert "Kilo Code" alphabetically or logically within the existing lists to maintain order.

## Acceptance Criteria
-   [ ] "Kilo Code" is listed in the "Key Features" section of `README.md`, `README_zh.md`, `README_ja.md`, and `README_ko.md`.
-   [ ] "kilo-code" is listed in the "Usage" section (CLI options) of `README.md`, `README_zh.md`, `README_ja.md`, and `README_ko.md`.
-   [ ] "Kilo Code" is listed in the "Alternative: Build from Source" section of `README.md`, `README_zh.md`, `README_ja.md`, and `README_ko.md`.
