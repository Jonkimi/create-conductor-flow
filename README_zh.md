# Conductor for All

[![npm version](https://badge.fury.io/js/conductor-4-all.svg)](https://badge.fury.io/js/conductor-4-all)

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md)

**Conductor for All** 是一个独立的命令行工具，旨在将 [Conductor](https://github.com/google/labs-prototypes/tree/main/gemini-cli) 规范驱动的开发方法论带入 *任何* 编码环境。

该项目最初与 Gemini CLI 扩展绑定，旨在解耦该方法论，允许开发人员在他们的项目中安装和初始化 Conductor 工作流，以便可以被 **任何** AI 编码代理（例如 Claude Code, Cline, Cursor, Windsurf）或 IDE 利用。

## 🎯 目标

-   **通用兼容性：** 在 Gemini CLI 生态系统之外启用 Conductor 方法论。
-   **代理无关的设置：** 提供一种机制来将 Conductor 命令和模板“安装”到项目中，有效地“启用”它以供多种不同的编码代理使用。
-   **标准化：** 创建一个统一的项目编排接口，弥合人类意图与 AI 执行之间的差距。

## 🚀 使用方法

### 1. 安装

#### 通过 pnpm 全局安装（推荐）

```bash
pnpm add -g conductor-4-all
```

#### 通过 npx 运行（无需安装）

```bash
npx conductor-4-all install
```

#### 从源码安装

```bash
pnpm install
pnpm build
```

### 2. 在你的项目中设置 Conductor

在你的项目根目录下运行 `install` 命令：

```bash
# 如果已全局安装：
conductor install

# 如果从源码构建：
node dist/index.js install
```

你将被提示选择你的 AI 编码代理：
-   **Opencode**
-   **Claude Code**

这将验证环境并安装必要的 Conductor 文件：
-   **Commands:** 代理特定的提示文件（例如 `.opencode/commands/conductor:setup.md`），你的代理可以执行这些文件。
-   **Templates:** 工作流指南和风格指南（例如 `.opencode/conductor/templates/`）。

### 3. 与你的代理一起使用 Conductor

安装完成后，你可以指示你的 AI 代理使用安装的命令执行 Conductor 任务。例如：

-   `@agent /conductor:setup` - 初始化项目结构。
-   `@agent /conductor:newTrack` - 开始一个新的功能或错误修复轨道。
-   `@agent /conductor:implement` - 实现选定的轨道。
-   `@agent /conductor:status` - 检查当前轨道的状态。

*注意：确切的调用语法取决于你的特定代理的斜杠命令或文件上下文功能。*

## 🛠️ 贡献指南

我们自己遵循严格的规范驱动开发工作流！

-   **Workflow:** 请阅读 [`conductor/workflow.md`](./conductor/workflow.md) 了解我们详细的开发协议（任务、TDD、提交）。
-   **Tech Stack:** 查看 [`conductor/tech-stack.md`](./conductor/tech-stack.md) 了解批准的技术（TypeScript/Node.js）。
-   **Product Guidelines:** 参阅 [`conductor/product-guidelines.md`](./conductor/product-guidelines.md) 了解设计理念。

开始贡献：
1.  阅读上述文档。
2.  从 `conductor/tracks.md` 中选择一个任务（或提议一个）。
3.  遵循 **Conductor Workflow** 来实现它。

## 🙏 致谢

本项目受到最初为 **Gemini CLI** 开发的 **Conductor** 方法论的启发并基于此构建。我们旨在将其优势扩展到更广泛的开发者生态系统。
