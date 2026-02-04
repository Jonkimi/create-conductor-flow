# Conductor Install

[![npm version](https://badge.fury.io/js/conductor-install.svg)](https://badge.fury.io/js/conductor-install)

<img src="./conductor_install_banner.png" height="400" alt="Conductor Install Banner" />

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md) | [한국어](./README_ko.md)

**Conductor Install** is a **Conductor Scaffolding CLI** that generates spec-driven, portable **Gemini [Conductor](https://github.com/gemini-cli-extensions/conductor)** workflows for **any** AI coding agent via `npx`. It enables the **[context-first evolution of spec-driven development](https://blog.jonkimi.com/2026/02/01/en/Vibe-Coding-with-context-driven-development-using-Conductor-for-Gemini-CLI/)** for **Claude Code**, **OpenCode**, **Cursor**, **Kilo Code**, and other leading AI Coding Assistants.

Originally developed for the Gemini CLI, the **Conductor** is now decoupled by this project, **empowering developers to maintain context, manage tasks, and orchestrate complex features**. It serves as a bridge between human intent and AI execution, ensuring "Context is King" in the era of Agentic AI.

## 🎯 Goals

-   **Universal Compatibility:** Enable the Conductor methodology outside of the Gemini CLI ecosystem.
-   **Agent-Agnostic Setup:** Provide a mechanism to "install" Conductor commands and templates into a project, effectively "enabling" it for consumption by multiple different coding agents.
-   **Standardization:** Create a unified interface for project orchestration that bridges the gap between human intent and AI execution.

## ✨ Key Features

-   **Universal AI Compatibility**: Works out-of-the-box with **Opencode**, **Claude Code**, **Antigravity**, **Cursor**, **VS Code Copilot**, **Codex**, **Windsurf**, **Cline**, **Kilo Code**, **Roo Code**, **Qwen Code**, **Factory Droid**, and **Gemini CLI**.
-   **Context Management**: Structured artifacts (`spec.md`, `plan.md`) keep your AI agent focused and context-aware.
-   **Spec-Driven Development**: Define *what* you want before asking the AI *how* to build it.
-   **Agent-Agnostic Workflows**: Switch between agents without losing project context or progress.
-   **Easy Initialization**: Single command setup with `npx conductor-install`.
-   **Git Ignore Configuration**: Automatically configure `.gitignore` or `.git/info/exclude` to exclude agent configuration files from version control.

## 🚀 Usage

### 1. Setup Conductor in Your Project

```text
conductor-install [path] [options]

Positionals:
  path  Directory to install Conductor                   [string] [default: "."]

Options:
  -a, --agent       Specify the coding agent
          [string] [choices: "opencode", "claude-code", "antigravity", "cursor",
        "vscode-copilot", "codex", "windsurf", "cline", "kilo-code", "roo-code",
                                         "qwen-code", "factory-droid", "gemini"]
  -r, --repo        Git repository URL for conductor. If used without value,
                    defaults to official repository.                    [string]
  -b, --branch      Branch name for conductor repository
                                                      [string] [default: "main"]
  -s, --scope       Installation scope (project or global)
                                         [string] [choices: "project", "global"]
  -g, --git-ignore  Configure git ignore for Conductor files (gitignore: add to
                    .gitignore, exclude: add to .git/info/exclude, none: remove
                    entries)  [string] [choices: "gitignore", "exclude", "none"]
  -f, --force       Force overwrite existing installation
                                                      [boolean] [default: false]
  -h, --help        Show help                                          [boolean]
  -v, --version     Show version number                                [boolean]

Examples:
  conductor-install                         Install with interactive prompts
  conductor-install --agent claude-code     Install for Claude Code agent
  conductor-install --git-ignore gitignore  Add Conductor files to .gitignore
  conductor-install --git-ignore exclude    Add Conductor files to
                                            .git/info/exclude
  conductor-install --git-ignore none       Remove Conductor entries from git
                                            ignore
```

To initialize Conductor in your project, simply run the following command in your project root:

```bash
npx conductor-install
```

You can also specify a custom template repository and branch:

```bash
npx conductor-install --repo https://github.com/your-org/custom-conductor --branch v2
```

Or specify the agent directly:

```bash
npx conductor-install --agent claude-code
```

### 2. Alternative: Build from Source

If you prefer to build from source:

```bash
pnpm install
pnpm build
node dist/conductor-install.js
```

You will be prompted to select your AI Coding Agent:
-   **Opencode**
-   **Claude Code**
-   **Antigravity**
-   **Cursor**
-   **VS Code Copilot**
-   **Codex**
-   **Windsurf**
-   **Cline**
-   **Kilo Code**
-   **Roo Code**
-   **Qwen Code**
-   **Factory Droid**
-   **Gemini CLI**

This will verify the environment and install the necessary Conductor files:
-   **Commands:** Agent-specific prompt or command files (e.g., `.opencode/commands/conductor:setup.md` or `.gemini/commands/conductor:setup.toml`) that your agent can execute.
-   **Templates:** Workflow guides and style guides (e.g., `.opencode/conductor/templates/`).

### 3. Shell Completion

Enable tab completion for specific shells (Bash, Zsh) to make using `conductor-install` easier.

#### Zsh (Recommended)

**Option 1: Source from file (Best for performance)**

Generate the script to a file and source it in your `.zshrc`:

```zsh
mkdir -p ~/.config/conductor
conductor-install completion > ~/.config/conductor/completion.zsh
echo 'source ~/.config/conductor/completion.zsh' >> ~/.zshrc
source ~/.zshrc
```

**Option 2: One-liner**

Add this directly to your `.zshrc` (easiest setup):

```zsh
echo 'source <(conductor-install completion)' >> ~/.zshrc
source ~/.zshrc
```

#### Bash

Add the completion script to your `.bashrc`:

```bash
conductor-install completion >> ~/.bashrc
source ~/.bashrc
```

### 4. Using Conductor with Your Agent

Once installed, you can instruct your AI Agent to perform Conductor tasks using the installed commands. For example:

-   `/conductor:setup` - Initialize the project structure.
-   `/conductor:newTrack` - Start a new feature or bug fix track.
-   `/conductor:implement` - Implement the selected track.
-   `/conductor:review` - Review the completed track work against guidelines and the plan.
-   `/conductor:revert` - Revert previous work.
-   `/conductor:status` - Check the status of current tracks.

*Note: The exact invocation syntax depends on your specific agent's slash command or file context capabilities.*



## 🙏 Acknowledgements

This project is inspired by and based on the [Conductor](https://github.com/gemini-cli-extensions/conductor) methodology originally developed for the **Gemini CLI**. We aim to extend its benefits to the broader developer ecosystem.
