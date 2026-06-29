# Part Transition Protocol

超长篇 Part 完成后的跨会话过渡协议。此流程由 `pending_action: part_transition` 触发，本次运行只处理 Part 级结构过渡，不生成正文。

## 触发条件

- `length_tier = ultra_long`。
- 当前 Part 已完成，且下一 Part 文件、核心 Volume 列表、人物命运、关系线、事实显露、伏笔计划或地图/阶层/规则跃迁未补齐。
- STATE 6 已将 `pending_action` 设置为 `part_transition`。

## 必读文件

- `novels/{novel_id}/state/current-state.md`
- `novels/{novel_id}/bible/premise.md`
- `novels/{novel_id}/world/worldbuilding.md`
- `novels/{novel_id}/characters/cast.md`
- `novels/{novel_id}/canon/facts.md`
- `novels/{novel_id}/open-loops/loops.md`
- `novels/{novel_id}/structure/long-term-arc.md`
- 当前 Part 文件
- 当前 Volume 文件
- 当前 Arc 文件
- 最近一个 Part 内的阶段审稿记录和卷末审稿记录

## Part 过渡输出

必须补齐：

- `novels/{novel_id}/structure/parts/part-{N+1}.md`
- 下一 Part 目标、章节范围、起点状态、终点状态和阶段胜利/失败条件。
- 下一 Part 地图/阶层/势力/规则跃迁路线。
- 下一 Part 核心敌人或制度压力：目标、资源、底牌、误判点、压力阶梯。
- 下一 Part 关键 Volume 列表，并至少补齐下一 Volume 文件。
- 下一 Part 主要人物命运节点、关系线推进/暂停/分裂/重构/回收计划。
- 下一 Part 事实显露计划：Fact ID、显露层级、误导/维持/揭露窗口和角色知情限制。
- 下一 Part 伏笔计划：新增、推进、回收、废弃处理和逾期风险。
- 下一 Part 后续至少 3-5 章方向，以及首个 Arc 的人物门禁、关系线节拍和事实显露节拍。
- 更新 state 的当前 Part / Volume / Arc 信息、下一章目标和运行控制字段。

## 验证清单

- [ ] 没有跨小说引用。
- [ ] 新 Part 的目标承接已完成 Part 的结果、代价和遗留问题。
- [ ] 新 Part 至少包含一个地图、阶层、势力规模或世界规则认知跃迁。
- [ ] 新 Part 的核心敌人或制度压力具备主动计划，而不是等待主角触发剧情。
- [ ] 所有关键人物已在 `characters/cast.md` 建档或补齐最小画像和 Part 命运方向。
- [ ] 所有关系线重大推进、暂停、分裂、重构或回收已在 Part 文件中提前编排。
- [ ] 所有核心事实、身份秘密、能力真相、制度真相已在 `canon/facts.md` 登记，并声明 Part 内显露上限。
- [ ] 所有长期伏笔绑定 Fact ID 或明确未来答案，并处理上一 Part 的逾期伏笔。
- [ ] 下一 Volume 与下一 Arc 文件已可支持下一章规划。
- [ ] state 的 `pending_action` 已在完成后置为 none 或下一项必要动作。
- [ ] `next_chapter_to_generate` 未被跳号。
- [ ] `run_lock` 已清除。

## 失败处理

若缺少人物、关系线、事实库、世界规则、伏笔答案或下一 Volume/Arc：

- 不得生成新章。
- 设置 `pending_action: content_fill`。
- 在 `pending_action_reason` 中写明缺口和必须补齐的文件。
- 写入本次 run 日志。
