# Arc / Volume Transition Protocol

Arc 或 Volume 完成后的跨会话过渡协议。此流程由 `pending_action: arc_transition` 或 `pending_action: volume_transition` 触发，本次运行只处理结构过渡，不生成正文。Part 过渡必须使用 `system/templates/part-transition.md`，不得混入本协议。

## 触发条件

- 当前 Arc 已完成，且下一 Arc 文件、人物门禁、关系线编排、事实显露节拍或章节概要未补齐。
- 当前 Volume 已完成，且下一 Volume 的目标、人物配置、压力阶梯、关系线编排或事实显露计划未补齐。
- STATE 6 已将 `pending_action` 设置为 `arc_transition` 或 `volume_transition`。

## 必读文件

- `novels/{novel_id}/state/current-state.md`
- `novels/{novel_id}/bible/premise.md`
- `novels/{novel_id}/world/worldbuilding.md`
- `novels/{novel_id}/characters/cast.md`
- `novels/{novel_id}/canon/facts.md`
- `novels/{novel_id}/canon/items.md`
- `novels/{novel_id}/open-loops/loops.md`
- `novels/{novel_id}/structure/long-term-arc.md`
- 当前 Volume 文件
- 当前 Arc 文件

## Arc 过渡输出

当 `pending_action: arc_transition` 时，必须补齐：

- `novels/{novel_id}/structure/arcs/arc-{N+1}.md`
- 下一 Arc 目标、起点、终点和阶段胜利/失败条件
- 下一 Arc 关键人物门禁：所有命名、复登、关键转折、伏笔功能人物必须已有画像或最小画像
- 下一 Arc 关系线编排：推进、维持、暂停、禁止越界项和计划节点
- 下一 Arc 事实显露节拍：引用 Fact ID、显露层级、误导/维持/揭露窗口和角色知情限制
- 下一 Arc 关键物品生命周期节拍：引用 Item ID、持有/位置/状态变化、代价限制、回收/退场窗口和禁止误用项
- 下一 Arc 敌对势力主动计划：目标、资源、误判点、底牌、压力阶梯
- 下一 Arc 后续至少 3-5 章方向
- 更新 state 的当前 Arc 信息和下一章目标

## Volume 过渡输出

当 `pending_action: volume_transition` 时，必须补齐：

- `novels/{novel_id}/structure/volumes/volume-{N+1}.md`
- 下一 Volume 目标、核心冲突、压力阶梯和卷末状态
- 下一 Volume 人物配置、阶段命运方向和禁越界项
- 下一 Volume 关系线主次和推进窗口
- 下一 Volume 事实显露计划、Fact ID 窗口和禁止提前公开项
- 下一 Volume 关键物品生命周期计划、Item ID 窗口、持有/转移/损毁/回收节点和禁止提前使用项
- 下一 Volume 伏笔计划：新增、推进、回收、逾期风险
- 下一 Volume 关键地点、资源、战力上限和代价约束
- 必要时同步创建下一 Arc 文件
- 更新 state 的当前 Volume / Arc 信息和下一章目标

## 验证清单

- [ ] 没有跨小说引用。
- [ ] 新 Volume/Arc 的目标承接已完成章节的结果和后果。
- [ ] 所有关键人物已在 `characters/cast.md` 建档或补齐最小画像。
- [ ] 所有关系线重大推进已在 Volume/Arc 中提前编排。
- [ ] 所有核心事实、身份秘密、能力真相、制度真相已在 `canon/facts.md` 登记。
- [ ] 所有关键物品已在 `canon/items.md` 登记，并声明持有者、位置、状态、代价限制、生命周期和关联 Fact/Loop。
- [ ] 所有长期伏笔绑定 Fact ID、Item ID 或明确未来答案。
- [ ] 下一章目标、章末承接、敌对势力压力和后续 3-5 章方向明确。
- [ ] state 的 `pending_action` 已在完成后置为 none 或下一项必要动作。
- [ ] `next_chapter_to_generate` 未被跳号。
- [ ] `run_lock` 已清除。

## 失败处理

若缺少人物、关系线、事实库、关键物品、世界规则或伏笔答案：

- 不得生成新章。
- 设置 `pending_action: content_fill`。
- 在 `pending_action_reason` 中写明缺口和必须补齐的文件。
- 写入本次 run 日志。
