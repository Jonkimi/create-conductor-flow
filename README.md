<div align="center">
  <a href="https://github.com/你的用户名/create-conductor-flow">
    <img src="./conductor_flow_banner.png" alt="Conductor Scaffolding CLI Logo" width="512" height="384">
  </a>

  <h1>Conductor Scaffolding CLI</h1>

  <p>
    <a href="https://www.npmjs.com/package/create-conductor-flow">
      <img src="https://img.shields.io/npm/v/create-conductor-flow?color=0470f2&label=npm+version" alt="NPM Version">
    </a>
    <a href="https://github.com/Jonkimi/create-conductor-flow/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/create-conductor-flow?color=blue" alt="License">
    </a>
    <a href="https://npmcharts.com/compare/create-conductor-flow?minimal=true">
      <img src="https://img.shields.io/npm/dm/create-conductor-flow?color=orange" alt="Downloads">
    </a>
  </p>
  <p>
    <strong>English</strong> | <a href="./README_zh.md">简体中文</a> | <a href="./README_ja.md">日本語</a> | <a href="./README_ko.md">한국어</a>
  </p>
  <br>
  <blockquote>
    <strong>The scaffolding tool to generate spec-driven, portable <a href="https://github.com/gemini-cli-extensions/conductor">Gemini Conductor</a> workflows for any AI coding agent.</strong>
  </blockquote>
  <br>
</div>
Get started immediately with:

```bash
npm create conductor-flow
```

---

**Conductor Scaffolding CLI** enables the **[context-first evolution of spec-driven development](https://blog.jonkimi.com/2026/02/01/en/Vibe-Coding-with-context-driven-development-using-Conductor-for-Gemini-CLI/)** by instantly setting up portable workflows compatible with leading AI Coding Assistants, including:
- **Opencode**
- **Claude Code**
- **Antigravity**
- **Cursor**
- **Github Copilot**,
- **Codex**
- **Windsurf**
-  **Cline**, 
- **Kilo Code**
- **Roo Code**
- **Qwen Code**
- **Factory Droid**
- **Gemini CLI**

Originally developed for the Gemini CLI, the **Conductor** is now decoupled by this project, **empowering developers to maintain context, manage tasks, and orchestrate complex features**. It serves as a bridge between human intent and AI execution, ensuring "Context is King" in the era of Agentic AI.



## ✨ Key Features

-   **Agent-Agnostic Setup:** Provide a mechanism to "install" Conductor commands and templates into a project, effectively "enabling" it for consumption by multiple different coding agents.
-   **Agent-Agnostic Workflows**: Switch between agents without losing project context or progress.
-   **Context Management**: Structured artifacts (`product.md`, `tech-stack.md`, `spec.md`, `plan.md`) keep your AI agent focused and context-aware.
-   **Spec-Driven Development**: Define *what* you want before asking the AI *how* to build it.
-   **Git Ignore Configuration**: Automatically configure `.gitignore` or `.git/info/exclude` to exclude agent configuration files from version control.
-   **Easy Initialization**: Single command setup with `npm create conductor-flow`.

## 🚀 Usage

### Interactive Mode (Recommended)

The easiest way to start is to run the interactive setup. It will guide you through configuring your workflow spec, selecting your AI agent, and settings.

```bash
npm create conductor-flow
```
Or if you prefer the shorthand alias:

```bash
npx conductor-init
```

You will be prompted to select your target environment:

```text
? Select your coding agent:
❯ OpenCode (AGENTS.md, .opencode/commands)
  Claude Code (CLAUDE.md, .claude/commands)
  Antigravity (GEMINI.md, .agent/workflows)
  Cursor (AGENTS.md, .cursor/commands)
  Github Copilot (AGENTS.md, .github/prompts)
  Codex (AGENTS.md, .codex/prompts)
  Windsurf (AGENTS.md, .windsurf/workflows)
? Select installation method:
❯ Project (Current Directory)
? Configure git ignore for Conductor files?
  Add to .gitignore
  Add to .git/info/exclude
  Remove existing entries
❯ Don't configure git ignore
```
### Arguments & Flags

For power users, you can pass arguments directly to skip prompts:

```bash
npm create conductor-flow -a claude-code

#specify a custom template repository and branch
npm create conductor-flow --repo https://github.com/your-org/custom-conductor --branch v2
```

### Common Options

```text
npm create conductor-flow [path] [options]

Positionals:
  path  Directory to install Conductor                   [string] [default: "."]

Options:
  -a, --agent       Specify the coding agent
          [string] [choices: "opencode", "claude-code", "antigravity", "cursor",
        "github-copilot", "codex", "windsurf", "cline", "kilo-code", "roo-code",
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
  npm create conductor-flow                 Install with interactive prompts
  npm create conductor-flow --agent         Install for Claude Code agent
  claude-code
  npm create conductor-flow --git-ignore    Add Conductor files to .gitignore
  gitignore
  npm create conductor-flow --git-ignore    Add Conductor files to
  exclude                                   .git/info/exclude
  npm create conductor-flow --git-ignore    Remove Conductor entries from git
  none                                      ignore
```


### 3. Shell Completion for Global Installation(Advanced Setup)

Enable tab completion for specific shells (Bash, Zsh) to make using `conductor-init` easier.

#### Global Installation

```bash
npm install -g create-conductor-flow
```

Or, if you prefer the shorthand alias:

```bash
npm install -g conductor-init
```

After installation, you can use the `conductor-init completion` command to generate the completion script.

#### Zsh (Recommended)

**Option 1: Source from file (Best for performance)**

Generate the script to a file and source it in your `.zshrc`:

```zsh
mkdir -p ~/.config/conductor
conductor-init completion > ~/.config/conductor/completion.zsh
echo 'source ~/.config/conductor/completion.zsh' >> ~/.zshrc
source ~/.zshrc
```

**Option 2: One-liner**

Add this directly to your `.zshrc` (easiest setup):

```zsh
echo 'source <(conductor-init completion)' >> ~/.zshrc
source ~/.zshrc
```

#### Bash

Add the completion script to your `.bashrc`:

```bash
conductor-init completion >> ~/.bashrc
source ~/.bashrc
```

### 4. Using Conductor with Your Agent

Once installed, you can instruct your AI Agent to perform Conductor tasks using the installed commands. For example:

-   `/conductor-setup` - Initialize the project structure.
-   `/conductor-newTrack` - Start a new feature or bug fix track.
-   `/conductor-implement` - Implement the selected track.
-   `/conductor-review` - Review the completed track work against guidelines and the plan.
-   `/conductor-revert` - Revert previous work.
-   `/conductor-status` - Check the status of current tracks.

*Note: The exact invocation syntax depends on your specific agent's slash command or file context capabilities.*



## 🙏 Acknowledgements

This project is inspired by and based on the [Conductor](https://github.com/gemini-cli-extensions/conductor) and [Conductor-for-all](https://github.com/hlhr202/Conductor-for-all).
