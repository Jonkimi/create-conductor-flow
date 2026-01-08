# Conductor for All

[![npm version](https://badge.fury.io/js/conductor-4-all.svg)](https://badge.fury.io/js/conductor-4-all)

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md)

**Conductor for All** は、[Conductor](https://github.com/google/labs-prototypes/tree/main/gemini-cli) の仕様駆動型開発手法を *あらゆる* コーディング環境にもたらすために設計されたスタンドアロンのコマンドラインツールです。

もともと Gemini CLI 拡張機能に紐付いていたこのプロジェクトは、その手法を分離し、開発者が自分のプロジェクトに Conductor ワークフローをインストールして初期化できるようにすることで、**あらゆる** AI コーディングエージェント（Claude Code、Cline、Cursor、Windsurf など）や IDE で活用できるようにすることを目指しています。

## 🎯 目標

-   **普遍的な互換性:** Gemini CLI エコシステム外で Conductor 手法を有効にします。
-   **エージェントに依存しないセットアップ:** Conductor のコマンドとテンプレートをプロジェクトに「インストール」するメカニズムを提供し、事実上、複数の異なるコーディングエージェントが利用できるように「有効化」します。
-   **標準化:** 人間の意図と AI の実行との間のギャップを埋める、プロジェクトオーケストレーションのための統一されたインターフェースを作成します。

## 🚀 使用方法

### 1. インストール

#### pnpm によるグローバルインストール（推奨）

```bash
pnpm add -g conductor-4-all
```

#### npx 経由での実行（インストール不要）

```bash
npx conductor-4-all install
```

#### ソースから

```bash
pnpm install
pnpm build
```

### 2. プロジェクトでの Conductor のセットアップ

プロジェクトのルートで `install` コマンドを実行します：

```bash
# グローバルにインストールされている場合:
conductor install

# ソースからビルドした場合:
node dist/index.js install
```

AI コーディングエージェントを選択するように求められます：
-   **Opencode**
-   **Claude Code**

これにより、環境が検証され、必要な Conductor ファイルがインストールされます：
-   **Commands:** エージェントが実行できるエージェント固有のプロンプトファイル（例：`.opencode/commands/conductor:setup.md`）。
-   **Templates:** ワークフローガイドとスタイルガイド（例：`.opencode/conductor/templates/`）。

### 3. エージェントでの Conductor の使用

インストールが完了すると、インストールされたコマンドを使用して Conductor タスクを実行するように AI エージェントに指示できます。例えば：

-   `@agent /conductor:setup` - プロジェクト構造を初期化します。
-   `@agent /conductor:newTrack` - 新しい機能またはバグ修正トラックを開始します。
-   `@agent /conductor:implement` - 選択したトラックを実装します。
-   `@agent /conductor:status` - 現在のトラックのステータスを確認します。

*注：正確な呼び出し構文は、特定のエージェントのスラッシュコマンドまたはファイルコンテキスト機能によって異なります。*

## 🛠️ 貢献ガイド

私たち自身、厳格な仕様駆動型開発ワークフローに従っています！

-   **Workflow:** 私たちの詳細な開発プロトコル（タスク、TDD、コミット）については、[`conductor/workflow.md`](./conductor/workflow.md) をお読みください。
-   **Tech Stack:** 承認された技術（TypeScript/Node.js）については、[`conductor/tech-stack.md`](./conductor/tech-stack.md) を確認してください。
-   **Product Guidelines:** 設計哲学については、[`conductor/product-guidelines.md`](./conductor/product-guidelines.md) を参照してください。

貢献を開始するには：
1.  上記のドキュメントを読みます。
2.  `conductor/tracks.md` からタスクを選択します（または提案します）。
3.  **Conductor Workflow** に従い実装します。

## 🙏 謝辞

このプロジェクトは、**Gemini CLI** のために最初に開発された **Conductor** 手法に触発され、それに基づいています。私たちはその利点をより広い開発者エコシステムに拡大することを目指しています。
