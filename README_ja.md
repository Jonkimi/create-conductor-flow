# Conductor Install

[![npm version](https://badge.fury.io/js/conductor-install.svg)](https://badge.fury.io/js/conductor-install)

<img src="./conductor_install_banner.png" height="400" alt="Conductor Install Banner" />

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md) | [한국어](./README_ko.md)

**Conductor Install** は、**Gemini CLI 拡張機能 [Conductor](https://github.com/gemini-cli-extensions/conductor)** を **あらゆる** AI コーディングエージェント環境にもたらすユニバーサルなコマンドラインツールです。**Claude Code**、**OpenCode**、**Cursor**、**Kilo Code**、およびその他の主要な AI コーディングアシスタントのために、**コンテキストファーストの進化した仕様駆動開発**（context-first evolution of spec-driven development）を可能にします。

もともと Gemini CLI 用に開発された **Conductor** は、このプロジェクトによって分離され、**開発者がコンテキストを維持し、タスクを管理し、複雑な機能をオーケストレーションできるようにします**。これは、Agentic AI の時代において「コンテキストは王様」であることを保証し、人間の意図と AI の実行との間の架け橋として機能します。

## 🎯 目標

-   **普遍的な互換性:** Gemini CLI エコシステム外で Conductor 手法を有効にします。
-   **エージェントに依存しないセットアップ:** Conductor のコマンドとテンプレートをプロジェクトに「インストール」するメカニズムを提供し、事実上、複数の異なるコーディングエージェントが利用できるように「有効化」します。
-   **標準化:** 人間の意図と AI の実行との間のギャップを埋める、プロジェクトオーケストレーションのための統一されたインターフェースを作成します。


## ✨ 主な機能

-   **ユニバーサルな AI 互換性**: **Opencode**、**Claude Code**、**Antigravity**、**Cursor**、**VS Code Copilot**、**Codex**、**Windsurf**、**Cline**、**Kilo Code**、**Roo Code**、**Qwen Code**、および **Gemini CLI** ですぐに使用できます。
-   **コンテキスト管理**: 構造化された成果物（`spec.md`、`plan.md`）により、AI エージェントの集中力とコンテキスト認識を維持します。
-   **仕様駆動型開発**: AI に *どのように*構築するかを尋ねる前に、*何を*したいかを定義します。
-   **エージェントに依存しないワークフロー**: プロジェクトのコンテキストや進行状況を失うことなく、エージェントを切り替えることができます。
-   **簡単な初期化**: `npx conductor-install` を使用した単一コマンドのセットアップ。

## 🚀 使用方法

### 1. プロジェクトでの Conductor のセットアップ

```text
conductor-install [path] [options]

Positionals:
  path  Directory to install Conductor                   [string] [default: "."]

Options:
  -a, --agent    Specify the coding agent
          [string] [choices: "opencode", "claude-code", "antigravity", "cursor",
        "vscode-copilot", "codex", "windsurf", "cline", "kilo-code", "roo-code",
                                                          "qwen-code", "gemini"]
  -r, --repo     Git repository URL for conductor. If used without value,
                 defaults to official repository.                       [string]
  -b, --branch   Branch name for conductor repository [string] [default: "main"]
  -s, --scope    Installation scope (project or global)
                                         [string] [choices: "project", "global"]
  -f, --force    Force overwrite existing installation[boolean] [default: false]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

プロジェクトで Conductor を初期化するには、プロジェクトのルートで次のコマンドを実行するだけです：

```bash
npx conductor-install
```

### 2. 代替手段：ソースからビルド

ソースからビルドする場合：

```bash
pnpm install
pnpm build
node dist/index.js install
```

AI コーディングエージェントを選択するように求められます：
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
-   **Gemini CLI**

これにより、環境が検証され、必要な Conductor ファイルがインストールされます：
-   **Commands:** エージェントが実行できるエージェント固有のプロンプトまたはコマンドファイル（例：`.opencode/commands/conductor:setup.md` または `.gemini/commands/conductor:setup.toml`）。
-   **Templates:** ワークフローガイドとスタイルガイド（例：`.opencode/conductor/templates/`）。

### 3. エージェントでの Conductor の使用

インストールが完了すると、インストールされたコマンドを使用して Conductor タスクを実行するように AI エージェントに指示できます。例えば：

-   `/conductor:setup` - プロジェクト構造を初期化します。
-   `/conductor:newTrack` - 新しい機能またはバグ修正トラックを開始します。
-   `/conductor:implement` - 選択したトラックを実装します。
-   `/conductor:review` - 完了したトラックの作業をガイドラインと計画に照らしてレビューします。
-   `/conductor:revert` - 以前の作業を元に戻します。
-   `/conductor:status` - 現在のトラックのステータスを確認します。

*注：正確な呼び出し構文は、特定のエージェントのスラッシュコマンドまたはファイルコンテキスト機能によって異なります。*



## 🙏 謝辞

このプロジェクトは、**Gemini CLI** のために最初に開発された [Conductor](https://github.com/gemini-cli-extensions/conductor) 手法に触発され、それに基づいています。私たちはその利点をより広い開発者エコシステムに拡大することを目指しています。
