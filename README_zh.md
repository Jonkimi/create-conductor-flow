<div align="center">
  <a href="https://github.com/Jonkimi/create-conductor-flow">
    <img src="./conductor_flow_banner.png" alt="Conductor 脚手架 CLI Logo" width="512" height="384">
  </a>

  <h1>Conductor 脚手架 CLI</h1>

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
    <a href="./README.md">English</a> | <strong>简体中文</strong> | <a href="./README_ja.md">日本語</a> | <a href="./README_ko.md">한국어</a>
  </p>
  <br>
  <blockquote>
    <strong>为任何 AI 编码代理生成规范驱动、可移植的 <a href="https://github.com/gemini-cli-extensions/conductor">Gemini Conductor</a> 工作流的脚手架工具。</strong>
  </blockquote>
  <br>
</div>
立即开始：

```bash
npm create conductor-flow
```

---

**Conductor 脚手架 CLI** 通过即时设置与主流 AI 编码助手兼容的可移植工作流，实现了 **[上下文优先的规范驱动开发演进](https://blog.jonkimi.com/2026/02/01/en/Vibe-Coding-with-context-driven-development-using-Conductor-for-Gemini-CLI/)**。支持的 AI 助手包括：

- **Opencode**
- **Claude Code**
- **Antigravity**
- **Cursor**
- **Github Copilot**
- **Codex**
- **Windsurf**
- **Cline**
- **Kilo Code**
- **Roo Code**
- **Qwen Code**
- **Factory Droid**
- **Gemini CLI**

**Conductor** 最初是为 Gemini CLI 开发的，现在通过本项目解耦，**赋予开发者维护上下文、管理任务和编排复杂功能的能力**。它是人类意图与 AI 执行之间的桥梁，确保在 Agentic AI 时代"上下文为王"。

## ✨ 主要特性

-   **代理无关的设置：** 提供一种机制将 Conductor 命令和模板"安装"到项目中，有效地"启用"它以供多种不同的编码代理使用。
-   **代理无关的工作流**：在不丢失项目上下文或进度的情况下切换代理。
-   **上下文管理**：结构化的工件（`product.md`, `tech-stack.md`, `spec.md`, `plan.md`）让您的 AI 代理保持专注并具备上下文感知能力。
-   **规范驱动开发**：在询问 AI *如何*构建之前，先定义您*想要什么*。
-   **Git 忽略配置**：自动配置 `.gitignore` 或 `.git/info/exclude`，将代理配置文件排除在版本控制之外。
-   **轻松初始化**：使用 `npm create conductor-flow` 单条命令完成设置。

## 🚀 使用方法

### 交互模式（推荐）

最简单的开始方式是运行交互式设置。它将引导您配置工作流规范，选择您的 AI 代理和设置。

```bash
npm create conductor-flow
```
或者如果您喜欢简写别名：

```bash
npx conductor-init
```

系统将提示您选择目标环境：

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
? Select template source:
❯ Bundled Templates (Offline) - Use built-in templates, no network required
  Official Repository (Latest) - Fetch latest from official repository
  Custom Repository - Specify your own repository and branch
```

### 模板来源选项

CLI 提供三种模板来源供选择：

| 选项 | 描述 | 适用场景 |
|--------|-------------|----------|
| **内置模板** | 使用 CLI 自带的内置模板，无需网络连接。 | 离线使用、快速设置、稳定模板 |
| **官方仓库** | 从 [官方 Conductor 仓库](https://github.com/gemini-cli-extensions/conductor) 下载最新模板。 | 获取最新功能和更新 |
| **自定义仓库** | 指定您自己的 Git 仓库和分支作为模板来源。 | 自定义工作流、企业模板 |

**非交互模式（CI/CD）**

在 CI/CD 环境中或当 stdin 不是 TTY 时，CLI 会自动使用内置模板而不显示提示：
- 当设置了 `CI=true` 环境变量时
- 当在非交互式 Shell 中运行时（管道输入）

### 参数与标志

对于高级用户，您可以直接传递参数以跳过提示：

```bash
npm create conductor-flow -a claude-code

# 显式使用官方仓库
npm create conductor-flow --repo

# 指定自定义模板仓库和分支
npm create conductor-flow --repo https://github.com/your-org/custom-conductor --branch v2
```

### 常用选项

```text
npm create conductor-flow [path] [options]

Positionals:
  path  Directory to install Conductor                                                                                                                                                               [string] [default: "."]

Options:
  -a, --agent       Specify the coding agent
                                     [string] [choices: "opencode", "claude-code", "antigravity", "cursor", "github-copilot", "codex", "windsurf", "cline", "kilo-code", "roo-code", "qwen-code", "factory-droid", "gemini"]
  -r, --repo        Git repository URL for templates. Without this flag, interactive template source selection is shown.                                                                                            [string]
  -b, --branch      Branch name for template repository                                                                                                                                           [string] [default: "main"]
  -s, --scope       Installation scope (project or global)                                                                                                                           [string] [choices: "project", "global"]
  -g, --git-ignore  Configure git ignore for Conductor files (gitignore: add to .gitignore, exclude: add to .git/info/exclude, none: remove entries)                      [string] [choices: "gitignore", "exclude", "none"]
  -f, --force       Force overwrite existing installation                                                                                                                                         [boolean] [default: false]
      --reset       Clear saved preferences and show all prompts                                                                                                                                  [boolean] [default: false]
  -h, --help        Show help                                                                                                                                                                                      [boolean]
  -v, --version     Show version number                                                                                                                                                                            [boolean]

Examples:
  npm create conductor-flow                                           Install with interactive prompts (template source selection)
  npm create conductor-flow --agent claude-code                       Install for Claude Code agent
  npm create conductor-flow --repo https://github.com/user/templates  Use custom template repository
  npm create conductor-flow --git-ignore gitignore                    Add Conductor files to .gitignore
  npm create conductor-flow --git-ignore exclude                      Add Conductor files to .git/info/exclude
  npm create conductor-flow --git-ignore none                         Remove Conductor entries from git ignore
  npm create conductor-flow --reset                                   Clear saved preferences and show all prompts
```


### 3. Shell 补全（全局安装/高级设置）

启用特定 Shell (Bash, Zsh) 的 Tab 补全功能，让使用 `conductor-init` 更加轻松。

#### 全局安装

```bash
npm install -g create-conductor-flow
```

或者，如果您喜欢简写别名：

```bash
npm install -g conductor-init
```

安装完成后，您可以使用 `conductor-init completion` 命令生成补全脚本。

#### Zsh (推荐)

**选项 1: 从文件加载 (性能最佳)**

生成脚本到文件并在你的 `.zshrc` 中 source 它：

```zsh
mkdir -p ~/.config/conductor
conductor-init completion > ~/.config/conductor/completion.zsh
echo 'source ~/.config/conductor/completion.zsh' >> ~/.zshrc
source ~/.zshrc
```

**选项 2: 单行命令 (One-liner)**

直接添加到你的 `.zshrc` (设置最简单)：

```zsh
echo 'source <(conductor-init completion)' >> ~/.zshrc
source ~/.zshrc
```

#### Bash

将补全脚本添加到你的 `.bashrc`：

```bash
conductor-init completion >> ~/.bashrc
source ~/.bashrc
```

### 4. 与你的代理一起使用 Conductor

安装完成后，你可以指示你的 AI 代理(Agent)使用安装的命令执行 Conductor 任务。例如：

-   `/conductor-setup` - 初始化项目结构。
-   `/conductor-newTrack` - 开始一个新的功能或错误修复轨道。
-   `/conductor-implement` - 实现选定的轨道。
-   `/conductor-review` - 根据指南和计划审查已完成的轨道工作。
-   `/conductor-revert` - 恢复以前的工作。
-   `/conductor-status` - 检查当前轨道的状态。

*注意：确切的调用语法取决于你的特定代理的斜杠命令或文件上下文功能。*

## 🙏 致谢

本项目受到 [Conductor](https://github.com/gemini-cli-extensions/conductor) 和 [Conductor-for-all](https://github.com/hlhr202/Conductor-for-all) 的启发并基于此构建。
