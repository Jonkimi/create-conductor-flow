# Track Specification: Optimize README Content

## Overview
Optimize the `README.md` opening statement style, improve usage instructions with full help content, and remove `@agent` references. Sync these changes to all localized README files.

## Functional Requirements
1.  **Opening Statement Optimization:** Refine the opening statement of `README.md` to match the style of: *"Bring Conductor, a spec-driven development extension for Gemini CLI, to any coding agent environment."*
2.  **Usage Section:** Add the complete command usage instructions (from `npx conductor-install -h`) to the Usage section.
3.  **Using Conductor with Your Agent:** Remove `@agent` references from this section.
4.  **Localization:** Synchronize the above changes to:
    *   `README_ja.md` (Japanese)
    *   `README_ko.md` (Korean)
    *   `README_zh.md` (Chinese)

## Acceptance Criteria
- [ ] `README.md` and all localized versions (`ja`, `ko`, `zh`) start with the optimized opening statement style.
- [ ] `README.md` and all localized versions contain the full help output of `npx conductor-install -h` in the Usage section.
- [ ] `README.md` and all localized versions have `@agent` references removed from the "Using Conductor with Your Agent" section.
