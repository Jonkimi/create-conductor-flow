# Product Guidelines

## Design Philosophy
- **Minimalist & Unix-like:** The tool should adhere to the Unix philosophy of doing one thing well. Commands should be composable, relying on standard text streams (stdin/stdout) and predictable behavior.
- **Machine-First Compatibility:** While usable by humans, the primary design constraint is robust integration with AI agents. This means predictable parsing, stable interfaces, and standard protocol adherence.

## Error Handling & Output
- **Strict Adherence to Standards:** Success must return exit code 0. Any failure must return a non-zero exit code.
- **Standard Streams:** Informational output goes to `stdout`. Errors and diagnostics go to `stderr`.
- **Parsing Reliability:** Avoid interactive prompts that block execution unless explicitly requested.

## Installation & Configuration
- **Idempotency:** All installation commands (`conductor install`) must be idempotent. Re-running them should verify the state, repair missing components, or update outdated ones without overwriting user customizations or causing data loss.
- **Dynamic Resources:** The CLI fetches templates dynamically from remote Git repositories to ensure developers always have access to the latest best practices and agent configurations without requiring a binary update.

## Documentation Style
- **Technical & Precise:** Help messages, usage guides, and error messages should be concise, accurate, and devoid of fluff, resembling traditional `man` pages. This clarity benefits both human power-users and AI context processing.

## Performance & Distribution
- **Single Static Binary:** The product will be distributed as a statically compiled Rust binary to ensure it works immediately in any environment without dependency hell (no Python venvs, no Node_modules).
- **Fast Startup:** Execution must be near-instantaneous. High latency is unacceptable as it compounds when called repeatedly inside agent loops.
- **Small Footprint:** The tool should minimize its impact on the target system's disk space and file clutter.

## CLI Testing
- **Isolated Test Directories:** Use temporary directories (`mkdtemp` or `tmp-<test-case>`) for each test to ensure isolation. Clean up after tests complete.
- **Suppress Banner Output:** Set `CONDUCTOR_NO_BANNER=1` environment variable to suppress ASCII art banner for cleaner test output and parsing.
- **Non-Interactive Mode:** Use `--force` flag and explicit CLI arguments to bypass interactive prompts in automated tests.
- **Git Repository Setup:** Initialize git repos (`git init`) in test directories when testing features that require a git context (e.g., `.git/info/exclude`).
- **Test Command Pattern:**
  ```bash
  CONDUCTOR_NO_BANNER=1 node dist/index.js <test-dir> --agent <agent> --scope project --force
  ```
- **Cleanup:** Always remove temporary test directories after tests, even on failure (`rm -rf` or `rmSync` with `force: true`).
