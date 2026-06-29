# Run Start Protocol

单章自动化任务的启动协议。任何章节生成、断点恢复、阶段审稿、Arc/Volume 过渡或内容补齐运行，都必须先执行本协议。

## 适用范围

- 手动生成下一章
- 定时自动化生成下一章
- 上次运行中断后的恢复
- `pending_action` 指向的修复、审稿、规划调整或过渡任务

## 必读文件

- `novels/{novel_id}/state/current-state.md`
- `system/schemas/state.schema.md`
- 本次路由对应模板：
  - `system/templates/chapter-cycle.md`
  - `system/templates/arc-transition.md`
  - `system/templates/stage-review.md`

## 启动步骤

### 1. 绑定小说

- 明确 `novel_id`。
- 只读取和修改 `novels/{novel_id}/` 下的文件。
- 禁止引用其他小说状态、设定、人物、事实或章节。

### 2. 读取运行控制

从 `state/current-state.md` 读取：

- `next_chapter_to_generate`
- `last_completed_chapter`
- `last_run_status`
- `last_run_completed_state`
- `pending_action`
- `pending_action_reason`
- `run_lock`
- `recovery_note`

缺少任一字段时，不得生成章节。先补齐 `运行控制` 区块。

### 3. 检查运行锁

- 若 `run_lock = clear`，可继续。
- 若 `run_lock = locked`，必须确认旧运行已经结束、超时或人工允许解除。
- 未确认前不得写入 chapter_plan、正文、review、state、canon、open_loops 或 run 日志。

可继续时，先把 `run_lock` 设置为 locked，并记录：

- 锁定时间
- 锁定原因
- 本次目标章节或 pending_action

### 4. 路由 pending_action

若 `pending_action != none`：

| pending_action | 本次运行处理方式 |
|----------------|------------------|
| content_fill | 补齐缺失的 premise/world/characters/canon/volume/arc/state/open_loops，不生成章节 |
| repair | 处理 `repair_log` 中未解决问题，不生成新章 |
| plan_adjust | 调整下一章 chapter_plan 或后续 3-5 章节奏，不写正文 |
| stage_review_5ch | 按 `stage-review.md` 执行最近 3-5 章审稿 |
| stage_review_20ch | 按 `stage-review.md` 执行最近 10-20 章审稿 |
| arc_transition | 按 `arc-transition.md` 补齐下一 Arc |
| volume_transition | 按 `arc-transition.md` 补齐下一 Volume |
| completed | 不再生成章节，只确认完结状态 |

处理完成后必须更新 `pending_action`、`pending_action_reason`、`last_run_status`、`last_run_completed_state`、`recovery_note`，并清除 `run_lock`。

### 5. 断点恢复检测

若满足任一条件，进入恢复模式：

- `last_run_status = partial`
- `last_run_completed_state` 不是 STATE_6，且不是合法的初始 STATE_0/STATE_1
- `structure/chapter-plans/ch-{N}.md` 已存在但正文不存在
- `chapters/ch-{N}.md` 已存在但 review 不存在
- `chapters/ch-{N}-review.md` 已存在但 state 的 `current_chapter` 未更新到 N
- 章节文件存在且 `last_completed_chapter < N`

恢复规则：

- 已存在且通过检查的文件不得覆盖。
- 从最晚已完成 STATE 的下一步继续。
- 恢复完成后写入 run 日志，`last_run_status` 改为 success。
- 若无法判断文件有效性，设置 `pending_action: repair`，并写明原因。

### 6. 正常章节生成入口

只有同时满足以下条件，才允许进入 `chapter-cycle.md` 的 STATE 2：

- `pending_action = none`
- `run_lock = locked` 且锁属于本次运行
- `last_run_status != partial`
- `last_completed_chapter + 1 = next_chapter_to_generate`
- 当前无未处理阻塞级 repair
- 上一章 review 通过（第一章除外）
- premise/world/characters/canon/volume/arc/state/open_loops 已补齐

## 结束要求

任一运行结束时必须：

- 清除 `run_lock`
- 更新运行控制字段
- 写入或更新 `novels/{novel_id}/runs/ch-{N}-{date}.md`
- 若阻塞，写清 `pending_action` 和 `pending_action_reason`
