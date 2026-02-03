# Conductor Install 

## 1. 引言

在 2026 年的今天，AI Coding Agent 已经从“新鲜概念”变成了每个开发者的标配。无论是 Cursor、Claude Code 还是各种开源的 Cline、Gemini CLI，我们已经习惯了在编辑器里大喊一声“帮我实现这个功能”。

但是，随之而来的问题也愈发明显：
- **频繁幻觉**：Agent 指着一段不存在的代码说它修好了 Bug。
- **上下文丢失**：任务做到一半，Agent 忘了它最初的目标是什么。
- **指令漂移**：在复杂的工程中，Agent 的执行路径变得不可预测。

究其原因，是因为我们与 Agent 之间缺乏一种**结构化的契约**。这就是 **Conductor** 诞生的背景。Conductor 最初是 Google Gemini CLI 的一个工作流指令 extension，现在它通过 `conductor-install` 已实现独立，旨在为所有 AI 编码助手提供一套标准化的、Agent 友好的工作流规范。

## 2. 核心理念：规格驱动开发 (Spec-Driven Development)

Conductor 的灵魂在于 **SDD (Spec-Driven Development)** —— **规格驱动开发**。

传统的开发模式往往是“感性编程”：写一段模糊的指示，然后祈祷 Agent 能理解。而 SDD 提倡的是：**在写任何代码之前，先和 Agent 达成共识。**

### SDD 的双螺旋结构

在 Conductor 的世界里，一份完整的工作任务由两个维度的文档组成：

1.  **规格书 (`spec.md`)**：解答“**做什么**”。它定义了功能的边界、验收标准（Acceptance Criteria）以及非功能性需求（如性能、安全）。
2.  **计划书 (`plan.md`)**：解答“**怎么做**”。它将复杂的规格拆解为一个个可验证的任务（Task）和子任务。

这种结构对 Agent 极其友好，因为它：
- **降低了上下文噪音**：Agent 只需要关注当前的 Task，而不需要在海量代码中迷失。
- **提供了“执行地图”**：Agent 清晰地知道自己在哪，下一步要去哪。
- **建立了人机信任**：人类通过审计 Plan 来确保 Agent 的每一步都符合预期。

## 3. 快速上手：三步开启高效流

准备好体验结构化开发的魅力了吗？只需三步：

### 第一步：安装

```bash
npm install -g conductor-install
```

或者通过 `npx conductor-install` 直接执行。

### 第二步：初始化项目

在你的项目根目录下，运行：
```
/conductor:setup
```
这个命令会引导你完成环境搭建，创建一个专属的 `conductor/` 目录，并为你喜欢的 AI Agent（如 Cursor 或 Claude Code）安装量身定制的指令集。

### 第三步：实践 SDD

1.  **开启一个 Track**：当你要开始一个新功能时，运行 `/conductor:newTrack`。它会引导你填写 `spec.md`。
2.  **让 Agent 执行**：将任务交给 Agent。它会根据你定义的 `plan.md` 逐步执行，每完成一个 Task 都会自动更新进度。

## 4. 万物皆可 Conductor：全 Agent 兼容

Conductor-for-all 的最大魅力在于**通用性**。

以前，Conductor 与 Gemini CLI 深度绑定。而现在，通过 `conductor-install`，你可以将这套成熟的 methodology 带到任何你习惯使用的工具中：
- **Cursor/Windsurf/Cline**：通过配置 `.cursorrules` 或相关指令，让这些 Agent 完美遵循 Conductor 规范。
- **Claude Code**：业界领先的终端 Agent，配合 Conductor 后，复杂工程的执行效率提升显著。
- **Antigravity**：深度集成的智能助手，原生支持 Conductor 协议。

最硬核的是，Conductor 会从远程 GitHub 仓库**动态获取模板**。这意味着当社区有了更高效的 Agent 配置时，你只需更新一下即可享用。

## 5. 技术亮点：简洁、透明、高效

`conductor-install` 不仅仅是一个 CLI 工具，它在设计上也充分考虑了现代开发的需求：
- **TypeScript/Node.js 实现**：保证了工具的类型安全和全平台兼容（v18+）。
- **本地缓存机制**：动态获取的模板会缓存在本地，即便在网络不佳的环境下也能稳定运行。
- **yargs + inquirer**：提供了丝滑的交互体验，无论是新手还是老鸟都能快速上手。

## 6. 结语

在 AI 编码的“混沌时代”，我们需要一套明确的逻辑来约束 Agent，让它们从“偶尔好用”变成“稳定可靠”。Conductor 提供的不仅是工具，更是一种**结构化思考**的架构。

结构化思维，是 AI 时代的开发者核心竞争力。

如果你觉得这个项目对你有帮助，欢迎：
- 🌟 在 GitHub 上点个 **Star**：[conductor-install](https://github.com/jonkimi/conductor-install)
- 🐛 提交 **Issue** 或 **PR**，加入我们的社区。
- 🚀 在你的下一个项目里，试着用 Conductor 开启 SDD 之旅。

让 AI 辅助开发，先从写好一份规格书开始！

