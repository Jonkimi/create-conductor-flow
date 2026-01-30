# Specification: Fix Missing Conductor Review Workflow

## 1. Overview
The `conductor install` command is failing to generate the `conductor:review.md` workflow file for the Antigravity agent, and potentially others. This track aims to investigate the root cause in the `ConfigurableGenerator` and specific agent configurations, and ensure that the `review` workflow is correctly generated for all supported agents.

## 2. Goals
- Ensure `conductor:review.md` is generated during `conductor install` for Antigravity.
- Verify and ensure `conductor:review.md` is generated for all other supported agents (Cursor, Windsurf, etc.).
- Add automated tests to prevent regression.

## 3. Functional Requirements
- **Command Generation:** The `conductor install` command MUST generate `conductor:review.md` (or equivalent extension) in the agent's commands directory.
- **Template Availability:** The `conductor:review.toml` template MUST be correctly loaded and processed.
- **Agent Coverage:** The fix MUST apply to all agents using the `ConfigurableGenerator` or custom implementations.

## 4. Non-Functional Requirements
- **Idempotency:** Re-running install should not duplicate or error if the file exists (handled by existing logic).
- **Maintainability:** The solution should use the existing configuration patterns.

## 5. Out of Scope
- Creating new workflows other than `review`.
- changing the content of the `review` workflow itself (unless necessary for generation).
