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
    <a href="./README.md">English</a> | <a href="./README_zh.md">简体中文</a> | <a href="./README_ja.md">日本語</a> | <strong>한국어</strong>
  </p>
  <br>
  <blockquote>
    <strong>모든 AI 코딩 에이전트를 위한 사양 주도형(spec-driven), 휴대용 <a href="https://github.com/gemini-cli-extensions/conductor">Gemini Conductor</a> 워크플로우를 생성하는 스캐폴딩 도구입니다.</strong>
  </blockquote>
  <br>
</div>

즉시 시작하기:

```bash
npm create conductor-flow
```

---

**Conductor 스캐폴딩 CLI**는 주요 AI 코딩 도우미와 호환되는 휴대용 워크플로우를 즉시 설정하여 **[컨텍스트 우선의 사양 주도형 개발의 진화](https://blog.jonkimi.com/2026/02/01/en/Vibe-Coding-with-context-driven-development-using-Conductor-for-Gemini-CLI/)**를 가능하게 합니다. 지원되는 AI 도우미는 다음과 같습니다:

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

원래 Gemini CLI를 위해 개발된 **Conductor**는 이 프로젝트를 통해 분리되어, **개발자가 컨텍스트를 유지하고, 작업을 관리하며, 복잡한 기능을 조율할 수 있도록 지원합니다**. 이는 인간의 의도와 AI 실행 사이의 가교 역할을 하며, Agentic AI 시대에 "컨텍스트가 왕(Context is King)"임을 보장합니다.

## ✨ 주요 기능

-   **에이전트 불가지론적 설정:** 프로젝트에 Conductor 명령과 템플릿을 "설치"하는 메커니즘을 제공하여 사실상 여러 다른 코딩 에이전트가 사용할 수 있도록 "활성화"합니다.
-   **에이전트 불가지론적 워크플로우**: 프로젝트 컨텍스트나 진행 상황을 잃지 않고 에이전트 간에 전환할 수 있습니다.
-   **컨텍스트 관리**: 구조화된 아티팩트(`product.md`, `tech-stack.md`, `spec.md`, `plan.md`)는 AI 에이전트가 집중하고 컨텍스트를 인식하도록 유지합니다.
-   **사양 주도형 개발**: AI에게 *어떻게* 구축할지 묻기 전에 *무엇을* 원하는지 정의하십시오.
-   **Git 무시 설정**: 에이전트 설정 파일을 버전 관리에서 제외하도록 `.gitignore` 또는 `.git/info/exclude`를 자동으로 구성합니다.
-   **간편한 초기화**: `npm create conductor-flow` 명령 하나로 설정할 수 있습니다.

## 🚀 사용법

### 대화형 모드 (권장)

가장 쉬운 시작 방법은 대화형 설정을 실행하는 것입니다. 워크플로우 사양 구성, AI 에이전트 선택 및 설정을 안내합니다.

```bash
npm create conductor-flow
```
또는 짧은 별칭을 선호하는 경우:

```bash
npx conductor-init
```

대상 환경을 선택하라는 메시지가 표시됩니다:

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

### 템플릿 소스 옵션

CLI는 세 가지 템플릿 소스를 제공합니다:

| 옵션 | 설명 | 적합한 사용 사례 |
|--------|-------------|----------|
| **번들 템플릿** | CLI에 포함된 내장 템플릿을 사용합니다. 네트워크가 필요 없습니다. | 오프라인 사용, 빠른 설정, 안정적인 템플릿 |
| **공식 저장소** | [공식 Conductor 저장소](https://github.com/gemini-cli-extensions/conductor)에서 최신 템플릿을 다운로드합니다. | 최신 기능 및 업데이트 가져오기 |
| **커스텀 저장소** | 템플릿 소스로 사용할 자체 Git 저장소와 브랜치를 지정합니다. | 맞춤형 워크플로우, 기업용 템플릿 |

**비대화형 모드 (CI/CD)**

CI/CD 환경이나 stdin이 TTY가 아닌 경우, CLI는 프롬프트 없이 자동으로 번들 템플릿을 사용합니다:
- `CI=true` 환경 변수가 설정된 경우
- 비대화형 셸에서 실행되는 경우 (파이프 입력)

### 인수 및 플래그

고급 사용자의 경우, 프롬프트를 건너뛰기 위해 인수를 직접 전달할 수 있습니다:

```bash
npm create conductor-flow -a claude-code

# 공식 저장소를 명시적으로 사용
npm create conductor-flow --repo

# 사용자 정의 템플릿 저장소 및 브랜치 지정
npm create conductor-flow --repo https://github.com/your-org/custom-conductor --branch v2
```

### 일반적인 옵션

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
      --reset       Clear saved preferences and show all prompts
                                                      [boolean] [default: false]
  -h, --help        Show help                                          [boolean]
  -v, --version     Show version number                                [boolean]

Examples:
  npm create conductor-flow                 Install with interactive prompts
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
  npm create conductor-flow --reset         Clear saved preferences and show all
                                            prompts
```

### 구성 지속성

CLI는 실행 간에 기본 설정을 기억하므로 매번 동일한 옵션을 지정할 필요가 없습니다.

**저장되는 내용:**
- 템플릿 소스 (`--repo`, `--branch`)
- Git 무시 기본 설정 (`--git-ignore`)

**작동 방식:**
1. 첫 실행 시, 대화형 또는 플래그를 통해 기본 설정을 선택합니다.
2. 이후 실행 시, 저장된 기본 설정이 자동으로 적용됩니다.
3. CLI 플래그는 항상 저장된 기본 설정보다 우선합니다.

**예시:**

```bash
# 첫 실행 - 기본 설정 지정
npm create conductor-flow --agent claude-code --git-ignore exclude

# 향후 실행 - 자동으로 exclude 사용
npm create conductor-flow
# 출력: [Config] Using saved git-ignore: exclude
```

**기본 설정 재설정:**

저장된 기본 설정을 지우고 모든 프롬프트와 함께 새로 시작하려면:

```bash
npm create conductor-flow --reset
```

**구성 위치:**

기본 설정은 XDG Base Directory Specification에 따라 저장됩니다:
- **macOS**: `~/Library/Application Support/create-conductor-flow/config.json`
- **Linux**: `~/.config/create-conductor-flow/config.json`
- **Windows**: `%APPDATA%\create-conductor-flow\config.json`
```


### 3. 셸 완성 (글로벌 설치/고급 설정)

`conductor-init`을(를) 더 쉽게 사용할 수 있도록 특정 셸(Bash, Zsh)에 대한 탭 완성 기능을 활성화합니다.

#### 글로벌 설치

```bash
npm install -g create-conductor-flow
```

또는 짧은 별칭을 선호하는 경우:

```bash
npm install -g conductor-init
```

설치 후 `conductor-init completion` 명령을 사용하여 완성 스크립트를 생성할 수 있습니다.

#### Zsh (권장)

**옵션 1: 파일에서 소싱 (성능 최적)**

스크립트를 파일로 생성하고 `.zshrc`에서 소싱합니다:

```zsh
mkdir -p ~/.config/conductor
conductor-init completion > ~/.config/conductor/completion.zsh
echo 'source ~/.config/conductor/completion.zsh' >> ~/.zshrc
source ~/.zshrc
```

**옵션 2: 한 줄 명령 (One-liner)**

`.zshrc`에 직접 추가합니다 (가장 쉬운 설정):

```zsh
echo 'source <(conductor-init completion)' >> ~/.zshrc
source ~/.zshrc
```

#### Bash

완성 스크립트를 `.bashrc`에 추가합니다:

```bash
conductor-init completion >> ~/.bashrc
source ~/.bashrc
```

### 4. 에이전트와 함께 Conductor 사용

설치가 완료되면 설치된 명령을 사용하여 AI 에이전트에게 Conductor 작업을 수행하도록 지시할 수 있습니다. 예를 들어:

-   `/conductor-setup` - 프로젝트 구조를 초기화합니다.
-   `/conductor-newTrack` - 새로운 기능 또는 버그 수정 트랙을 시작합니다.
-   `/conductor-implement` - 선택한 트랙을 구현합니다.
-   `/conductor-review` - 지침 및 계획에 대해 완료된 트랙 작업을 검토합니다.
-   `/conductor-revert` - 이전 작업을 되돌립니다.
-   `/conductor-status` - 현재 트랙의 상태를 확인합니다.

*참고: 정확한 호출 구문은 특정 에이전트의 슬래시 명령 또는 파일 컨텍스트 기능에 따라 다릅니다.*

## 🙏 감사의 말

이 프로젝트는 [Conductor](https://github.com/gemini-cli-extensions/conductor) 및 [Conductor-for-all](https://github.com/hlhr202/Conductor-for-all)에서 영감을 받아 그 위에 구축되었습니다.
