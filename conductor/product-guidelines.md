# Product Guidelines

## Design Philosophy
- **Minimalist & Unix-like:** The tool should adhere to the Unix philosophy of doing one thing well. Commands should be composable, relying on standard text streams (stdin/stdout) and predictable behavior.
- **Machine-First Compatibility:** While usable by humans, the primary design constraint is robust integration with AI agents. This means predictable parsing, stable interfaces, and standard protocol adherence.

## Error Handling & Output
- **Strict Adherence to Standards:** Success must return exit code 0. Any failure must return a non-zero exit code.
- **Standard Streams:** Informational output goes to `stdout`. Errors and diagnostics go to `stderr`.
- **Parsing Reliability:** Avoid interactive prompts that block execution unless explicitly requested.

## Installation & Configuration
- **Idempotency:** All installation and initialization commands (`conductor init`, `conductor install`) must be idempotent. Re-running them should verify the state, repair missing components, or update outdated ones without overwriting user customizations or causing data loss.
- **Embedded Resources:** The binary should be self-contained, including all necessary default templates and scripts to function without external runtime dependencies or network fetches during basic initialization.

## Documentation Style
- **Technical & Precise:** Help messages, usage guides, and error messages should be concise, accurate, and devoid of fluff, resembling traditional `man` pages. This clarity benefits both human power-users and AI context processing.

## Performance & Distribution
- **Single Static Binary:** The product will be distributed as a statically compiled Rust binary to ensure it works immediately in any environment without dependency hell (no Python venvs, no Node_modules).
- **Fast Startup:** Execution must be near-instantaneous. High latency is unacceptable as it compounds when called repeatedly inside agent loops.
- **Small Footprint:** The tool should minimize its impact on the target system's disk space and file clutter.
