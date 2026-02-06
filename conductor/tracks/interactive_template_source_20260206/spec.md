# Interactive Template Source Selection

## Overview

增强 CLI 的模板来源设置功能，当用户未指定 `--repo` 参数时，提供交互式选择界面让用户选择模板来源：
1. Bundled Templates（内置离线模板）
2. Official Repository（官方远程仓库最新版）
3. Custom Repository（自定义仓库与分支）

## Functional Requirements

### FR-1: Interactive Template Source Prompt

**When:** 用户运行 CLI 且未指定 `--repo` 参数，且标准输入为 TTY（交互终端）

**Then:** 显示交互式选择提示：
```
? Select template source:
❯ Bundled Templates (Offline) - Use built-in templates, no network required
  Official Repository (Latest) - Fetch latest from official repository
  Custom Repository - Specify your own repository and branch
```

**Default Selection:** `Bundled Templates (Offline)`

### FR-2: Bundled Templates Option

**When:** 用户选择 "Bundled Templates (Offline)"

**Then:** 使用 `getBundledTemplateRoot()` 获取本地打包的模板路径

### FR-3: Official Repository Option

**When:** 用户选择 "Official Repository (Latest)"

**Then:** 
- 使用 `DEFAULT_REPO` (`https://github.com/gemini-cli-extensions/conductor`)
- 使用 `DEFAULT_BRANCH` (`main`)
- 调用 `ensureTemplates()` 下载/更新模板

### FR-4: Custom Repository Option

**When:** 用户选择 "Custom Repository"

**Then:** 依次显示两个输入提示：
1. **Repository URL:** 提示用户输入完整的 Git 仓库 URL
   - 无默认值，必填
2. **Branch name:** 提示用户输入分支名
   - 默认值: `main`

### FR-5: Non-Interactive Mode Fallback

**When:** 以下任一条件满足：
- 环境变量 `CI=true`
- 标准输入不是 TTY (`!process.stdin.isTTY`)
- 用户显式指定了 `--repo` 参数

**Then:** 跳过交互式提示，使用以下逻辑：
- 若 `--repo` 已指定 → 使用指定的远程仓库
- 若未指定 → 静默使用 bundled templates

## Non-Functional Requirements

### NFR-1: Dependency Consistency
使用项目现有的 `@inquirer/select` 和 `@inquirer/input` 库实现交互式提示

### NFR-2: Error Handling
- Custom Repository URL 验证失败时显示友好错误信息
- 网络请求失败时提供回退到 bundled templates 的建议

### NFR-3: Logging
选择结果应在控制台输出，如 `Using bundled Conductor templates` 或 `Downloading templates from <url> [<branch>]...`

## Acceptance Criteria

- [ ] 运行 `npx conductor-init` 无 `--repo` 参数时显示三选项提示
- [ ] 选择 "Bundled Templates" 后正确使用本地模板
- [ ] 选择 "Official Repository" 后正确下载官方仓库模板
- [ ] 选择 "Custom Repository" 后依次提示 URL 和 branch，并正确使用
- [ ] CI 环境下自动使用 bundled templates，无交互提示
- [ ] `--repo <url>` 参数仍可跳过交互，直接使用指定仓库
- [ ] 单元测试覆盖所有分支路径

## Out of Scope

- 模板缓存管理（清除缓存、查看缓存等）
- 模板来源偏好的持久化保存
- 多仓库模板的合并/叠加
