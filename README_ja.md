<div align="center">
  <a href="https://github.com/Jonkimi/create-conductor-flow">
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
    <a href="./README.md">English</a> | <a href="./README_zh.md">简体中文</a> | <strong>日本語</strong> | <a href="./README_ko.md">한국어</a>
  </p>
  <br>
  <blockquote>
    <strong>あらゆる AI コーディングエージェント向けに、仕様駆動型でポータブルな <a href="https://github.com/gemini-cli-extensions/conductor">Gemini Conductor</a> ワークフローを生成するスキャフォールディングツール。</strong>
  </blockquote>
  <br>
</div>
すぐに始める：

```bash
npm create conductor-flow
```

---

**Conductor Scaffolding CLI** は、主要な AI コーディングアシスタントと互換性のあるポータブルなワークフローを即座にセットアップすることで、**[コンテキストファーストな仕様駆動型開発の進化](https://blog.jonkimi.com/2026/02/01/en/Vibe-Coding-with-context-driven-development-using-Conductor-for-Gemini-CLI/)** を実現します。対応する AI アシスタントは以下の通りです：

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

もともと Gemini CLI 用に開発された **Conductor** は、このプロジェクトによって分離され、**開発者がコンテキストを維持し、タスクを管理し、複雑な機能をオーケストレーションできるようにします**。これは、Agentic AI の時代において「コンテキストは王様」であることを保証し、人間の意図と AI の実行との間の架け橋として機能します。

## ✨ 主な機能

-   **エージェントに依存しないセットアップ:** Conductor のコマンドとテンプレートをプロジェクトに「インストール」するメカニズムを提供し、事実上、複数の異なるコーディングエージェントが利用できるように「有効化」します。
-   **エージェントに依存しないワークフロー**: プロジェクトのコンテキストや進行状況を失うことなく、エージェントを切り替えることができます。
-   **コンテキスト管理**: 構造化された成果物（`product.md`, `tech-stack.md`, `spec.md`, `plan.md`）により、AI エージェントの集中力とコンテキスト認識を維持します。
-   **仕様駆動型開発**: AI に *どのように*構築するかを尋ねる前に、*何を*したいかを定義します。
-   **Git 除外設定**: エージェント設定ファイルをバージョン管理から除外するために `.gitignore` または `.git/info/exclude` を自動設定します。
-   **簡単な初期化**: `npm create conductor-flow` を使用した単一コマンドのセットアップ。

## 🚀 使用方法

### インタラクティブモード (推奨)

最も簡単な開始方法は、インタラクティブなセットアップを実行することです。ワークフロー仕様の設定、AI エージェントの選択、および設定をガイドします。

```bash
npm create conductor-flow
```
または、短縮エイリアスを使用する場合：

```bash
npx conductor-init
```

ターゲット環境を選択するように求められます：

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

### テンプレートソースのオプション

CLI は3つのテンプレートソースを提供しています：

| オプション | 説明 | 適用シーン |
|--------|-------------|----------|
| **バンドルテンプレート** | CLI に同梱されている組み込みテンプレートを使用します。ネットワーク不要。 | オフライン使用、クイックセットアップ、安定したテンプレート |
| **公式リポジトリ** | [公式 Conductor リポジトリ](https://github.com/gemini-cli-extensions/conductor) から最新のテンプレートをダウンロードします。 | 最新機能とアップデートの取得 |
| **カスタムリポジトリ** | テンプレートソースとして独自の Git リポジトリとブランチを指定します。 | カスタムワークフロー、エンタープライズテンプレート |

**非インタラクティブモード（CI/CD）**

CI/CD 環境または stdin が TTY でない場合、CLI はプロンプトを表示せずに自動的にバンドルテンプレートを使用します：
- `CI=true` 環境変数が設定されている場合
- 非インタラクティブシェルで実行されている場合（パイプ入力）

### 引数とフラグ

パワーユーザー向けに、引数を直接渡してプロンプトをスキップできます：

```bash
npm create conductor-flow -a claude-code

# 公式リポジトリを明示的に使用
npm create conductor-flow --repo

# カスタムテンプレートリポジトリとブランチを指定
npm create conductor-flow --repo https://github.com/your-org/custom-conductor --branch v2
```

### 一般的なオプション

```text
npm create conductor-flow [path] [options]

Positionals:
  path  Directory to install Conductor                   [string] [default: "."]

Options:
  -a, --agent       Specify the coding agent
          [string] [choices: "opencode", "claude-code", "antigravity", "cursor",
        "github-copilot", "codex", "windsurf", "cline", "kilo-code", "roo-code",
                                         "qwen-code", "factory-droid", "gemini"]
  -r, --repo        Git repository URL for templates. Without this flag,
                    interactive template source selection is shown.     [string]
  -b, --branch      Branch name for template repository
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
                                            (template source selection)
  npm create conductor-flow --agent         Install for Claude Code agent
  claude-code
  npm create conductor-flow --repo          Use custom template repository
  https://github.com/user/templates
  npm create conductor-flow --git-ignore    Add Conductor files to .gitignore
  gitignore
  npm create conductor-flow --git-ignore    Add Conductor files to
  exclude                                   .git/info/exclude
  npm create conductor-flow --git-ignore    Remove Conductor entries from git
  none                                      ignore
```


### 3. シェル補完 (グローバルインストール/高度な設定)

特定のシェル (Bash, Zsh) のタブ補完を有効にして、`conductor-init` をより簡単に使用できるようにします。

#### グローバルインストール

```bash
npm install -g create-conductor-flow
```

または、短縮エイリアスを使用する場合：

```bash
npm install -g conductor-init
```

インストール後、`conductor-init completion` コマンドを使用して補完スクリプトを生成できます。

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
-   `/conductor-review` - ガイドラインと計画に照らして、完了したトラックの作業をレビューします。
-   `/conductor-revert` - 以前の作業を元に戻します。
-   `/conductor-status` - 現在のトラックのステータスを確認します。

*注：正確な呼び出し構文は、特定のエージェントのスラッシュコマンドまたはファイルコンテキスト機能によって異なります。*

## 🙏 謝辞

このプロジェクトは、[Conductor](https://github.com/gemini-cli-extensions/conductor) および [Conductor-for-all](https://github.com/hlhr202/Conductor-for-all) に触発され、それに基づいています。
