# Specification: Sync Factory Droid to Multilingual READMEs

## Overview
This track ensures that the newly added "Factory Droid" agent type is properly documented across all localized README files in the repository. This provides consistency between the tool's capabilities and its user-facing documentation.

## Functional Requirements
- **Documentation Update:** Add "Factory Droid" to the list of supported agents in the following files:
  - `README.md` (English)
  - `README_zh.md` (Chinese)
  - `README_ja.md` (Japanese)
  - `README_ko.md` (Korean)
- **Target Locations:**
  1.  **Key Features Section:** Add "Factory Droid" to the bullet point listing compatible AI agents.
  2.  **Agent Selection List:** Add "Factory Droid" to the list of agents presented during the "Build from Source" or manual installation instructions.

## Non-Functional Requirements
- **Consistency:** Ensure the formatting and placement of the new entry match the existing style in each localized file.
- **Accuracy:** Use the correct localized name/casing for "Factory Droid" where applicable (though "Factory Droid" is likely kept as a proper name).

## Acceptance Criteria
- [ ] `README.md` contains "Factory Droid" in the Features and Agent Selection sections.
- [ ] `README_zh.md` contains "Factory Droid" in the Features and Agent Selection sections.
- [ ] `README_ja.md` contains "Factory Droid" in the Features and Agent Selection sections.
- [ ] `README_ko.md` contains "Factory Droid" in the Features and Agent Selection sections.

## Out of Scope
- Updating the help output code blocks within the READMEs.
- Translating other parts of the READMEs.
