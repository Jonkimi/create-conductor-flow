# Implementation Plan: CLI Bundled Templates

## Phase 1: Refactor Template Resolution Logic

- [x] Task: Add `getBundledTemplateRoot()` function to `template.ts`
    - [x] Create function that returns bundled templates path (`__dirname/../templates`)
    - [x] Verify path exists before returning

- [x] Task: Refactor `getTemplateRoot()` to conditionally skip remote
    - [x] If `repo` and `branch` are both undefined/null → return bundled path
    - [x] Skip `ensureTemplates()` call when using bundled
    - [x] Keep existing behavior when repo/branch are provided

- [x] Task: Refactor `loadTemplate()` for fallback behavior
    - [x] Try bundled path first (existing)
    - [x] If bundled not found AND no repo args → print log, call `ensureTemplates()`, then load from remote
    - [x] If bundled not found AND repo args provided → use remote (existing)

- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Update ConfigurableGenerator

- [x] Task: Add `copyBundledToCache()` helper function
    - *Note: Skipped implementing explicit copy to cache as it is redundant. `getTemplateRoot` and `loadTemplate` handle bundled templates directly.*

- [x] Task: Update `ConfigurableGenerator.generate()` to use bundled templates
    - [x] Check if using bundled mode (no repo/branch args)
    - [x] If bundled mode: *Directly use bundled path via `getTemplateRoot`*
    - [x] Continue with existing template root resolution

- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Update Tests [checkpoint: 0b00abe]

- [x] Task: Add unit tests for new bundled template behavior
    - [x] Test `getTemplateRoot()` returns bundled path when no repo args
    - [x] Test `getTemplateRoot()` returns remote path when repo args provided
    - [x] Test fallback behavior with log message

- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
