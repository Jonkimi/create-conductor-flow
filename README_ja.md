# Conductor Init

[![npm version](https://badge.fury.io/js/conductor-init.svg)](https://badge.fury.io/js/conductor-init)

<img src="./conductor_init_banner.png" height="400" alt="Conductor Init Banner" />

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md) | [한국어](./README_ko.md)

**Conductor Init** は、`npx` を介して**あらゆる** AI コーディングエージェント向けに、仕様駆動型でポータブルな **Gemini [Conductor](https://github.com/gemini-cli-extensions/conductor)** ワークフローを生成する **Conductor スキャフォールディング CLI** です。これは、**Claude Code**、**OpenCode**、**Cursor**、**Kilo Code**、その他の主要な AI コーディングアシスタントのための**[コンテキストファーストな仕様駆動型開発の進化](https://blog.jonkimi.com/2026/02/01/en/Vibe-Coding-with-context-driven-development-using-Conductor-for-Gemini-CLI/)**を実現します。

もともと Gemini CLI 用に開発された **Conductor** は、このプロジェクトによって分離され、**開発者がコンテキストを維持し、タスクを管理し、複雑な機能をオーケストレーションできるようにします**。これは、Agentic AI の時代において「コンテキストは王様」であることを保証し、人間の意図と AI の実行との間の架け橋として機能します。

## 🎯 目標

-   **普遍的な互換性:** Gemini CLI エコシステム外で Conductor 手法を有効にします。
-   **エージェントに依存しないセットアップ:** Conductor のコマンドとテンプレートをプロジェクトに「インストール」するメカニズムを提供し、事実上、複数の異なるコーディングエージェントが利用できるように「有効化」します。
-   **標準化:** 人間の意図と AI の実行との間のギャップを埋める、プロジェクトオーケストレーションのための統一されたインターフェースを作成します。


## ✨ 主な機能

-   **ユニバーサルな AI 互換性**: **Opencode**、**Claude Code**、**Antigravity**、**Cursor**、**VS Code Copilot**、**Codex**、**Windsurf**、**Cline**、**Kilo Code**、**Roo Code**、**Qwen Code**、**Factory Droid**、および **Gemini CLI** ですぐに使用できます。
-   **コンテキスト管理**: 構造化された成果物（`spec.md`、`plan.md`）により、AI エージェントの集中力とコンテキスト認識を維持します。
-   **仕様駆動型開発**: AI に *どのように*構築するかを尋ねる前に、*何を*したいかを定義します。
-   **エージェントに依存しないワークフロー**: プロジェクトのコンテキストや進行状況を失うことなく、エージェントを切り替えることができます。
-   **簡単な初期化**: `npx conductor-init` を使用した単一コマンドのセットアップ。
-   **Git 除外設定**: エージェント設定ファイルをバージョン管理から除外するために `.gitignore` または `.git/info/exclude` を自動設定します。

## 🚀 使用方法

### 1. プロジェクトでの Conductor のセットアップ

```text
conductor-init [path] [options]

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
  conductor-init                         Install with interactive prompts
  conductor-init --agent claude-code     Install for Claude Code agent
  conductor-init --git-ignore gitignore  Add Conductor files to .gitignore
  conductor-init --git-ignore exclude    Add Conductor files to
                                         .git/info/exclude
  conductor-init --git-ignore none       Remove Conductor entries from git
                                         ignore
```

プロジェクトで Conductor を初期化するには、プロジェクトのルートで次のコマンドを実行するだけです：

```bash
npx conductor-init
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
-   **Factory Droid**
-   **Gemini CLI**

これにより、環境が検証され、必要な Conductor ファイルがインストールされます：
-   **Commands:** エージェントが実行できるエージェント固有のプロンプトまたはコマンドファイル（例：`.opencode/commands/conductor:setup.md` または `.gemini/commands/conductor:setup.toml`）。
-   **Templates:** ワークフローガイドとスタイルガイド（例：`.opencode/conductor/templates/`）。

-   **Templates:** ワークフローガイドとスタイルガイド（例：`.opencode/conductor/templates/`）。

### 3. シェル補完 (Shell Completion)

特定のシェル (Bash, Zsh) のタブ補完を有効にして、`conductor-init` をより簡単に使用できるようにします。

#### Zsh (推奨)

**オプション 1: ファイルから読み込む (パフォーマンス最適)**

スクリプトをファイルに生成し、`.zshrc` で source します：

```zsh
mkdir -p ~/.config/conductor
conductor-init completion > ~/.config/conductor/completion.zsh
echo 'source ~/.config/conductor/completion.zsh' >> ~/.zshrc
source ~/.zshrc
```

**オプション 2: ワンライナー**

`.zshrc` に直接追加します (最も簡単な設定)：

```zsh
echo 'source <(conductor-init completion)' >> ~/.zshrc
source ~/.zshrc
```

#### Bash

補完スクリプトを `.bashrc` に追加します：

```bash
conductor-init completion >> ~/.bashrc
source ~/.bashrc
```

### 4. エージェントでの Conductor の使用

インストールが完了すると、インストールされたコマンドを使用して Conductor タスクを実行するように AI エージェントに指示できます。例えば：

-   `/conductor-setup` - プロジェクト構造を初期化します。
-   `/conductor-newTrack` - 新しい機能またはバグ修正トラックを開始します。
-   `/conductor-implement` - 選択したトラックを実装します。
-   `/conductor-review` - 完了したトラックの作業をガイドラインと計画に照らしてレビューします。
-   `/conductor-revert` - 以前の作業を元に戻します。
-   `/conductor-status` - 現在のトラックのステータスを確認します。

*注：正確な呼び出し構文は、特定のエージェントのスラッシュコマンドまたはファイルコンテキスト機能によって異なります。*



## 🙏 謝辞

このプロジェクトは、[Conductor](https://github.com/gemini-cli-extensions/conductor) および [Conductor-for-all](https://github.com/hlhr202/Conductor-for-all) に触発され、それに基づいています。
