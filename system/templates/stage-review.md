# Stage Review Protocol

阶段审稿协议。此流程由 `pending_action: stage_review_5ch` 或 `pending_action: stage_review_20ch` 触发，本次运行只做横向审稿和修复路由，不生成新章节。

## 触发条件

- 最近 3-5 章无明显局势变化。
- 最近 3-5 章爽点机制重复。
- 关系线出现越界风险或推进过快。
- 最近 10-20 章剧情单元未闭环。
- 压力阶梯没有升级。
- 伏笔、事实显露、时间线、资源战力出现累积风险。

## 必读文件

- `novels/{novel_id}/state/current-state.md`
- `novels/{novel_id}/open-loops/loops.md`
- `novels/{novel_id}/canon/facts.md`
- 当前 Volume 文件
- 当前 Arc 文件
- 最近审稿窗口内的 chapter_plan、正文和 review
- `system/methodology/review-rubric.md`

## 3-5 章审稿

检查：

- 是否每章都有局势、人物、关系、伏笔、事实、情绪或资源变化。
- 是否连续重复同一种爽点机制。
- 主角目标是否漂移。
- 关系线是否未经规划升温、决裂、背叛、确认或转向。
- 敌对势力是否保持主动性。
- 章末钩子是否有效拉动下一章。

输出：

- 最近 3-5 章问题摘要
- 可继续项
- 必须修复项
- 下一章 plan 调整要求
- `pending_action` 路由

## 10-20 章审稿

检查：

- 一个剧情小单元是否闭环或明确进入升级。
- 压力阶梯是否提高。
- 主要伏笔是否推进，是否存在逾期。
- Fact ID 的显露窗口是否被提前突破或长期停滞。
- 人物命运线是否推进或至少保持有效压力。
- 战力、资源、地点、时间线是否可追踪。

输出：

- 单元闭环评估
- 压力升级建议
- 伏笔与事实显露风险
- 下一 3-5 章修正方向
- `pending_action` 路由

## 评分与路由

- 可继续：设置 `pending_action: none`，允许下一次运行生成 `next_chapter_to_generate`。
- 需调整计划：设置 `pending_action: plan_adjust`，写明下一章计划必须调整的内容。
- 需补设定：设置 `pending_action: content_fill`，写明缺失文件和缺口。
- 需修复：设置 `pending_action: repair`，在 repair_log 中登记问题。
- Arc/Volume/Part 到边界：设置 `pending_action: arc_transition`、`volume_transition` 或 `part_transition`。
- State 超过归档阈值：设置 `pending_action: state_archive`，先完成归档再继续生成章节。

## 输出位置

将审稿结果写入：

`novels/{novel_id}/runs/stage-review-{window}-{date}.md`

并同步更新：

- `state/current-state.md` 的质量风险
- `repair_log`
- `pending_action`
- `pending_action_reason`
- `run_lock`

## 结束要求

- 不得修改历史章节正文。
- 不得临场改写核心事实、人物命运或世界规则。
- 常规问题优先使用最小修改、补充铺垫或下一章计划调整。
- 涉及核心事实、人物命运、世界规则或长期关系线的风险，必须回到内容补齐和重新规划。
