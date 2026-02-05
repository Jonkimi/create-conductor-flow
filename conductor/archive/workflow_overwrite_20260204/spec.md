# Track: Workflow File Overwrite Check

## Overview

在 `conductor-install` 安装流程的最后阶段，增加对 `conductor/workflow.md` 文件的存在性检测。如果文件已存在（可能由之前的 `conductor setup` 生成），则需要提示用户是否覆盖。`--force` 标记应该在此步骤生效，自动覆盖而不提示。

## Functional Requirements

### FR-1: Workflow File Detection
- 在 Step 4 (Generate) 完成后，检测 `${targetDir}/conductor/workflow.md` 是否已存在。
- 该检测逻辑应该独立于现有的 `protocolFile` 覆盖逻辑。

### FR-2: Interactive Overwrite Prompt
- 如果 `conductor/workflow.md` 已存在，且 `--force` 标记未启用：
  - 使用 `@inquirer/select` 提示用户选择：
    - "Overwrite" - 覆盖现有文件
    - "Skip" - 跳过，保留现有文件
- 提示消息应清楚说明文件路径和操作含义。

### FR-3: Force Flag Support
- 如果 `--force` 标记已启用，自动覆盖 `conductor/workflow.md` 而不提示用户。
- 行为应与现有的 `protocolFilename` 覆盖逻辑保持一致。

### FR-4: Workflow File Source
- `workflow.md` 模板应从 `templateRoot` 的 `conductor/workflow.md` 路径读取。
- 如果模板源文件不存在，应优雅地跳过此步骤并输出警告日志。

### FR-5: Target Location
- 目标文件路径：`${targetDir}/conductor/workflow.md`
- 需要确保 `${targetDir}/conductor/` 目录存在（在写入前创建）。

## Non-Functional Requirements

### NFR-1: Consistency
- 覆盖提示的 UI 和行为应与现有的 `protocolFilename` 覆盖逻辑保持一致。

### NFR-2: Logging
- 成功复制时输出日志：`✔ Workflow file copied`
- 跳过时输出日志：`⚠ Skipping workflow file (already exists)`
- 使用 force 覆盖时输出日志：`⚠ Force mode: Overwriting workflow file`

## Acceptance Criteria

1. **AC-1:** 当 `conductor/workflow.md` 不存在时，直接从模板复制文件，不提示用户。
2. **AC-2:** 当 `conductor/workflow.md` 存在且 `--force` 未启用时，显示交互式选择提示。
3. **AC-3:** 用户选择 "Overwrite" 时，覆盖现有文件。
4. **AC-4:** 用户选择 "Skip" 时，保留现有文件。
5. **AC-5:** 当 `--force` 启用时，无条件覆盖现有文件而不提示。
6. **AC-6:** 模板源文件不存在时，跳过此步骤并输出警告。

## Out of Scope

- 不涉及其他 Conductor 上下文文件（如 `product.md`, `tech-stack.md`）的覆盖检测。
- 不涉及对 `workflow.md` 内容的修改或模板变量替换。
- 不涉及对现有验证逻辑 (`validate` 方法) 的修改。
