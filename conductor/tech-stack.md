# Technology Stack

## Core Technology
- **Language:** TypeScript
- **Runtime:** Node.js (v18+)
- **Build System & Package Manager:** pnpm

## Libraries & Dependencies
- **CLI Framework:** `yargs` (Command Line Argument Parser)
- **Interactive Prompts:** `@inquirer/select`, `@inquirer/input` (For user input, selections, and text entry)
- **Bundler:** `tsup` (TypeScript bundler for building distribution files)
- **Testing Framework:** `vitest` (Unit and integration testing)
- **File System:** Built-in `fs/promises` with `fs-extra` for advanced operations
- **TOML Parser:** `smol-toml` (For processing command templates)
- **Template Delivery:** Git (Dynamic fetching/caching of templates from remote repositories) and Bundled resources (Offline fallback)

## Development Tools
- **TypeScript Compiler:** For type checking and compilation
- **Code Coverage:** Vitest coverage with >80% target
- **Linting:** (To be configured as needed)
