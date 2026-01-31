# Conductor Install

[![npm version](https://badge.fury.io/js/conductor-install.svg)](https://badge.fury.io/js/conductor-install)

<img src="./conductor_banner.png" height="400" alt="Conductor Install Banner" />

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md) | [한국어](./README_ko.md)

**Conductor Install** is a standalone command-line tool designed to bring the [Conductor](https://github.com/gemini-cli-extensions/conductor) spec-driven development methodology to *any* coding environment.

Originally tied to the Gemini CLI extension, this project aims to decouple the methodology, allowing developers to install and initialize Conductor workflows in their projects so they can be leveraged by **any** AI Coding Agent (e.g., Claude Code, Cursor, VS Code Copilot, Codex) or IDE.

## 🎯 Goals

-   **Universal Compatibility:** Enable the Conductor methodology outside of the Gemini CLI ecosystem.
-   **Agent-Agnostic Setup:** Provide a mechanism to "install" Conductor commands and templates into a project, effectively "enabling" it for consumption by multiple different coding agents.
-   **Standardization:** Create a unified interface for project orchestration that bridges the gap between human intent and AI execution.

## 🚀 Usage

### 1. Setup Conductor in Your Project

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
-   **Gemini CLI**

This will verify the environment and install the necessary Conductor files:
-   **Commands:** Agent-specific prompt or command files (e.g., `.opencode/commands/conductor:setup.md` or `.gemini/commands/conductor:setup.toml`) that your agent can execute.
-   **Templates:** Workflow guides and style guides (e.g., `.opencode/conductor/templates/`).

### 3. Using Conductor with Your Agent

Once installed, you can instruct your AI Agent to perform Conductor tasks using the installed commands. For example:

-   `@agent /conductor:setup` - Initialize the project structure.
-   `@agent /conductor:newTrack` - Start a new feature or bug fix track.
-   `@agent /conductor:implement` - Implement the selected track.
-   `@agent /conductor:status` - Check the status of current tracks.

*Note: The exact invocation syntax depends on your specific agent's slash command or file context capabilities.*



## 🙏 Acknowledgements

This project is inspired by and based on the [Conductor](https://github.com/gemini-cli-extensions/conductor) methodology originally developed for the **Gemini CLI**. We aim to extend its benefits to the broader developer ecosystem.
