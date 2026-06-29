# Chapter Generation Cycle

单章完整生成循环。从运行启动协议到 STATE 2-6。此模板用于人工单章生成，也用于自动化任务；每次自动化任务只允许处理一个章节或一个 `pending_action`。

## 单章自动化原则

- 每次运行必须显式指定 `novel_id`。
- 每次运行只生成 `run_control.next_chapter_to_generate` 指向的一个章节。
- 每次运行开始时必须先读取 `novels/{novel_id}/state/current-state.md` 的 `运行控制` 区块。
- 如果 `pending_action != none`，本次运行只处理该待办动作，不得进入 STATE 2。
- 如果上次运行未完成到 STATE_6，必须先执行断点恢复，不得重新规划或覆盖已有文件。
- 如果发现章节文件、chapter_plan 或 review 已存在但 state 未推进，必须进入恢复检测。
- 运行结束必须更新 `run_control` 并写入单章运行日志。

## 运行启动协议

正式进入 STATE 2 前，必须先按 `system/templates/run-start-protocol.md` 执行：

1. 读取 state 的运行控制字段，确认 `next_chapter_to_generate`。
2. 检查 `run_lock`。若为 locked 且未确认旧运行已结束或超时，不得继续。
3. 若可继续，设置本次运行锁，并记录锁定时间和原因。
4. 检查 `pending_action`。若不为 none，转入对应模板或修复流程。
5. 检查 `last_run_status` 和 `last_run_completed_state`。若上次运行为 partial 或未到 STATE_6，从断点恢复。
6. 检查目标章节的 plan、正文、review 文件是否已存在，避免重复生成或覆盖。
7. 通过前置条件后，才允许进入 STATE 2。

## 前置条件

- 明确 `novel_id`
- `novels/{novel_id}/bible/premise.md` 已完成
- `premise` 已完成平台上架信息：上架书名、500字以内作品简介、3-6个平台标签、点击信号和标签合规检查
- `premise` 已声明 channel / category / subcategory / tags
- `premise` 已声明 length_tier / target_chapters / target_chapter_chars / target_total_chars
- `novels/{novel_id}/world/worldbuilding.md` 已完成，且包含世界规则、资源、代价、禁止事项和开篇显露策略
- `novels/{novel_id}/characters/cast.md` 已完成，且当前 Volume / Arc 关键人物具备最小画像和阶段命运方向
- `novels/{novel_id}/characters/cast-active.md` 已完成，且覆盖当前 Arc 和后续 3-5 章关键人物
- `novels/{novel_id}/canon/facts.md` 已完成，且当前 Volume / Arc 涉及的历史真相、暗线事实、身份秘密、能力代价、物品真相和揭露窗口已登记
- `novels/{novel_id}/canon/facts-active.md` 已完成，且覆盖当前 Arc 和后续 3-5 章涉及 Fact
- `novels/{novel_id}/structure/long-term-arc.md` 已完成
- 如 length_tier = ultra_long，当前 Part 文件已完成，且已填写 Part 目标、关键 Volume、人物命运、关系线编排、事实显露计划和伏笔计划
- 当前 Volume 文件已完成，且已填写本卷人物配置与命运、关系线编排和事实显露计划
- 当前 Arc 文件已完成，且已通过 Arc 人物门禁、关系线编排和事实显露节拍
- 当前 Arc 的章节级关系线节拍已明确
- 当前 Arc 的章节级事实显露、误导、维持或揭露节点已明确
- 当前 state 文件已更新到最新章节
- 当前 state 已包含 `运行控制` 区块，且 `next_chapter_to_generate = last_completed_chapter + 1`
- 当前 `run_lock` 为 clear，或已确认旧锁可解除
- 当前 `pending_action` 为 none
- `last_run_status` 不是 partial，且 `last_run_completed_state` 可恢复到本次合法起点
- 当前 state 文件的最近章节摘要、时间线、地点、人物位置、战力资源、敌对势力行动、质量风险和错误修复台账已更新到最新章节
- 当前 state 文件未超过归档阈值；若超过，先执行 `pending_action: state_archive`
- 当前 canon/facts 文件已更新到最新章节
- 当前 open_loops 文件已更新到最新章节
- 当前无阻塞级错误修复提案；如有，必须先完成内容补齐或重新规划
- 上一章 review 通过（第一章除外）

缺少任一项，停止章节生成，将 `pending_action` 设置为 content_fill、repair、plan_adjust、stage_review_5ch、stage_review_20ch、arc_transition、volume_transition、part_transition 或 state_archive，并写明 `pending_action_reason`。

## 必读方法论

- `system/methodology/core.md`
- `system/methodology/length-standards.md`
- `system/methodology/scene-chapter.md`
- `system/methodology/prose-style.md`
- `system/methodology/characters.md`
- `system/methodology/relationship-lines.md`
- `system/methodology/canon.md`
- `system/methodology/novel-categories.md`
- `system/methodology/genre-promises.md`
- 第一章额外读取 `system/methodology/opening.md`
- 审阅阶段读取 `system/methodology/review-rubric.md`
- 审阅评分权重以 `system/schemas/scoring.schema.md` 为唯一权威来源
- 伏笔台账遵守 `system/schemas/open-loops.schema.md`

## 按需方法论

以下文件只在本章涉及对应功能时读取，避免常规章节过度结构化：

- `system/methodology/theme.md`：本章承担主题推进、反证、回收或主题漂移修复时读取。
- `system/methodology/subplots.md`：本章新增、推进、休眠、并回或回收子情节时读取。
- `system/methodology/dialogue.md`：本章以对话冲突、谈判、审讯、关系拉扯或潜台词为主要场景时读取。
- `system/methodology/character-exit.md`：本章涉及死亡、离队、长期缺席、背叛、洗白、阵营转向或功能交接时读取。
- `system/methodology/context-compression.md`：执行 state_archive、active-context-refresh、阶段压缩摘要或 100+ 章后接力时读取。
- `system/methodology/review-trends.md`：执行 stage_review_5ch / stage_review_20ch 或连续评分下滑时读取。
- `system/methodology/multi-pov.md`：本章启用多 POV 或反派 POV 时读取。
- `system/methodology/breathing-chapters.md`：本章定位为呼吸章时读取。

## STATE 2: 章节规划

### 输入

- `novels/{novel_id}/bible/premise.md`
- `novels/{novel_id}/world/worldbuilding.md`
- `novels/{novel_id}/characters/cast.md`
- `novels/{novel_id}/characters/cast-active.md`（优先读取）
- `novels/{novel_id}/canon/facts.md`
- `novels/{novel_id}/canon/facts-active.md`（优先读取）
- `novels/{novel_id}/state/current-state.md`
- `novels/{novel_id}/open-loops/loops.md`
- `novels/{novel_id}/structure/long-term-arc.md`
- premise 中的频道、主分类、细分类和标签
- premise 中的篇幅档位和章节字数范围
- 当前 Volume 文件 `novels/{novel_id}/structure/volumes/volume-{N}.md`
- 当前 Part 文件 `novels/{novel_id}/structure/parts/part-{N}.md`（ultra_long 必填）
- 当前 Arc 文件 `novels/{novel_id}/structure/arcs/arc-{N}.md`
- 当前 Volume / Arc 的关系线编排
- 当前 Volume / Arc 的事实显露计划
- 当前 state 中的时间线、地点、人物位置、战力资源、敌对势力行动和最近章节摘要
- 当前 state 中后续 3-5 章节奏窗口、质量风险和错误修复台账
- 上一章的 chapter_plan 和 review（如适用）

### 操作

读取 `system/agents/planner.md`，以 Planner AI 角色生成 chapter_plan。

### 输出

`novels/{novel_id}/structure/chapter-plans/ch-{N}.md`

### 验证

- [ ] chapter_plan 包含所有必填字段
- [ ] classification 继承 premise 的频道、主分类、细分类和标签
- [ ] length_plan 包含 target_chars / min_chars / max_chars / scene_budgets
- [ ] length_plan 符合 premise 中的篇幅档位
- [ ] genre_promise 非空
- [ ] emotional_curve 非空
- [ ] scenes 至少 3 个关键场景
- [ ] conflict.intensity >= 5
- [ ] crisis_choice 包含明确代价
- [ ] must_have_events >= 3
- [ ] ending_hook 非空且钩子类型明确
- [ ] 至少推进 1 个剧情变量
- [ ] 所有角色在 cast.md 中已定义
- [ ] 本章涉及的命名/复登/关键转折人物已具备最小画像
- [ ] 本章人物作用与当前 Volume / Arc 的人物命运安排一致
- [ ] relationship_line_plan 已声明本章推进/维持/暂停的关系线
- [ ] 本章关系线操作与当前 Volume / Arc 的关系线编排一致
- [ ] 未出现未规划恋爱、背叛、牺牲、决裂、同盟转向、手足和解或关系确认
- [ ] canon_fact_plan 已声明本章引用的 Fact ID、显露层级、读者可见信息和角色知情变化
- [ ] 本章涉及的暗线、历史旧案、身份秘密、能力代价、物品真相或制度真相均已在 canon/facts.md 中登记
- [ ] 本章事实显露不超过当前 Volume / Arc 的揭露窗口和揭露上限
- [ ] pre_write_state_check 已确认时间线、地点、人物位置、战力资源、敌对势力行动和上一章钩子
- [ ] time_location_continuity 已声明本章故事时间、地点变化、移动成本和人物可达性
- [ ] 每个关键场景包含前因、目标、阻碍、行动、选择、结果变化和后续影响
- [ ] 每个关键场景包含呈现焦点、至少2个感官锚点、动作节拍、句式节奏和禁止概括项
- [ ] power_resource_plan 已声明战力、能力、资源、道具、伤势或地位变化；无变化也写明“无”
- [ ] antagonist_action_plan 已声明敌对势力或压力源本章主动行动；若本章没有反派出场，也必须说明外部压力如何存在
- [ ] downstream_impact 已说明本章结果影响后续 3-5 章的方式
- [ ] 无用巧合、临场道具、设定补丁、反派降智或主角突然开窍解决核心矛盾
- [ ] 第一章符合黄金三章任务

## STATE 3: 章节生成

### 输入

- 本章 chapter_plan
- 本章 chapter_plan 中每个关键场景的呈现焦点、感官锚点、动作节拍、句式节奏和禁止概括项
- 当前 state
- premise 中的篇幅档位和章节字数范围
- premise、world、characters（只读）
- cast-active（只读，优先于完整 characters）
- canon/facts（只读）
- facts-active（只读，优先于完整 canon/facts）
- 当前 Volume / Arc（只读）
- 当前 Volume / Arc 的关系线编排（只读）
- 当前 Volume / Arc 的事实显露计划（只读）
- 当前时间线、地点、人物位置、战力资源、敌对势力行动和最近章节摘要（只读）

### 操作

读取 `system/agents/writer.md`，以 Writer AI 角色生成正文。

### 输出

`novels/{novel_id}/chapters/ch-{N}.md`

### 验证

- [ ] 正文包含所有 must_have_events
- [ ] 正文实际字数落在 length_plan 的 min_chars 与 max_chars 之间
- [ ] 正文字数统计不包含标题、元数据、审阅报告或空行
- [ ] 按 scenes 顺序完成主要场景
- [ ] 每个关键场景都产生局势、人物、关系、伏笔、情绪、设定显露、战力资源或地点状态中的至少一项变化
- [ ] 每个关键场景都执行了呈现焦点、至少2个感官锚点、动作节拍、句式节奏和禁止概括项
- [ ] 关键动作没有被“一番激战后、很快、转眼、众人震惊”等总结句跳过
- [ ] 情绪主要通过动作、语气、停顿、视线、身体反应或选择外化
- [ ] 存在至少1个冲突点
- [ ] 存在至少1个变化点
- [ ] 类型承诺被明确兑现
- [ ] 情绪曲线完整
- [ ] 结尾兑现 ending_hook 或明确延迟原因
- [ ] 无设定外元素
- [ ] 无未建档关键人物、未规划背叛/死亡/洗白/恋爱推进等重大人物转折
- [ ] 无未规划关系线推进；关系变化符合 chapter_plan.relationship_line_plan
- [ ] 无未登记事实、未规划真相揭露、角色越权知情或违背 canon/facts.md 的内容
- [ ] 事实显露符合 chapter_plan.canon_fact_plan 的显露层级
- [ ] 人物说话、行动和选择符合 cast.md 中的画像、底线和阶段命运方向
- [ ] 时间线、地点、人物位置、战力资源和敌对势力行动与 state 连续
- [ ] 战力、能力、资源、道具和伤势变化符合 world 约束和 chapter_plan.power_resource_plan
- [ ] 反派或压力源有主动性，不只是等待主角触发剧情
- [ ] 重大胜利有铺垫、代价或风险；重大失败会影响后续剧情
- [ ] 第一章前 500 字内出现冲突或异常

## STATE 4: 审阅修正

### 输入

- 本章 chapter_plan
- 本章 chapter_plan 中每个关键场景的呈现焦点、感官锚点、动作节拍、句式节奏和禁止概括项
- 本章正文
- premise、world、characters
- cast-active
- 当前 canon/facts
- facts-active
- 当前 state
- 当前 open_loops
- 当前 Volume / Arc
- 当前 Volume / Arc 的关系线编排
- 当前 Volume / Arc 的事实显露计划
- 当前时间线、地点、战力资源、敌对势力行动、最近章节摘要和错误修复台账

### 操作

读取 `system/agents/reviewer.md`，以 Reviewer AI 角色审阅。

### 输出

`novels/{novel_id}/chapters/ch-{N}-review.md`

### 判定

- 综合分 >= 7.5 且核心维度 >= 6 → 进入 STATE 5
- 综合分 7.0-7.4 → 进入 STATE 4b 小修；小修复核通过后进入 STATE 5
- 综合分 < 7 或核心维度 < 5 → 返回 STATE 3 重写
- 叙事表现评分任一项 < 5 → 返回 STATE 3 重写对应场景
- 叙事表现评分任一项为 5-6 → 进入 STATE 4b 小修；小修复核通过后进入 STATE 5
- 存在阻塞级逻辑问题 → 返回 STATE 2 重新规划
- 存在未建档关键人物或未预设重大命运转折 → 停止正文流程，回到人物画像补齐
- 存在未登记或未预设关系线重大推进 → 停止正文流程，回到关系线台账和 Volume / Arc 编排补齐
- 存在未登记核心事实、违背 canon/facts.md、角色知道未显露真相、或公开超过揭露窗口的事实 → 停止正文流程，回到事实库和章节规划补齐
- 存在时间线矛盾、地点移动不成立、战力资源不守恒、人物行为无触发条件、反派降智、核心矛盾靠巧合解决 → 阻塞，回到规划或内容补齐
- 存在无因果变化场景，且无法合并为有效推进 → 返回 STATE 3 重写
- 正文字数低于 min_chars 15% 以上 → 返回 STATE 3 扩写有效场景
- 正文字数高于 max_chars 20% 且非高潮/终章 → 返回 STATE 3 压缩或拆章
- 第一章开篇额外项低于 7 → 不允许作为自动化续写起点

重写与小修限制：

- STATE 3 重写最多 3 次；超限后设置 `pending_action: repair` 或 `pending_action: plan_adjust`，不得继续消耗本次运行。
- STATE 4b 小修最多 2 次；超限后降级为重写或阻塞修复。
- 任一阻塞级问题不得进入 STATE 5。

## STATE 4b: 小修复核

### 触发条件

- Reviewer 判定综合分 7.0-7.4。
- 叙事表现任一项为 5-6，且问题可通过局部修订解决。
- Review 明确列出可执行的小修项，且不涉及改写核心事实、人物命运、关系性质或世界规则。

### 操作

由 Writer AI 只按 review 指定范围修改正文，不得新增 chapter_plan 未声明的事件、人物、关系推进、事实显露或战力资源变化。

### 输出

- 覆盖或更新 `novels/{novel_id}/chapters/ch-{N}.md`
- 更新 `novels/{novel_id}/chapters/ch-{N}-review.md`，记录小修项、复核结论和是否允许进入 STATE 5

### 验证

- [ ] 小修没有改变 chapter_plan 的核心结构
- [ ] 小修没有改写已登记事实、关系线、人物命运或世界规则
- [ ] 小修后对应评分项达到通过线
- [ ] 小修次数不超过 2 次

## STATE 5: 状态更新

### 输入

- chapter_plan、正文、review 报告
- 当前 characters/cast.md
- 当前 characters/cast-active.md
- 当前 canon/facts.md
- 当前 canon/facts-active.md
- 当前 state 文件
- 当前 open_loops 文件
- 当前 Volume / Arc
- 当前 Volume / Arc 的关系线编排
- 当前 Volume / Arc 的事实显露计划
- 当前 state 的运行控制字段

### 操作

读取 `system/agents/state-manager.md`，以 State Manager AI 角色更新。

### 输出

- 更新 `novels/{novel_id}/state/current-state.md`
- 更新 `novels/{novel_id}/characters/cast.md` 中已登场人物的状态、关系变化、命运推进和已揭示秘密
- 更新 `novels/{novel_id}/characters/cast-active.md` 中当前 Arc 活跃人物、即将入场人物和休眠人物
- 更新 `novels/{novel_id}/canon/facts.md` 中本章涉及事实的当前显露状态、读者已知、角色知情变化、关联章节计划和修订记录（不得临场改写真实事实）
- 更新 `novels/{novel_id}/canon/facts-active.md` 中当前 Arc 活跃事实、即将触发事实和暂不触碰事实
- 更新 state / cast 中已推进的关系线状态、触发事件、信任度或关系强度变化、下一计划节点
- 更新 `novels/{novel_id}/open-loops/loops.md`
- 更新章节摘要、场景因果链、时间线、地点、人物位置、战力资源、敌对势力行动、质量风险和错误修复台账
- 更新 `运行控制`：`last_completed_chapter`、`next_chapter_to_generate`、`last_run_status`、`last_run_completed_state`、`pending_action`、`run_lock` 和 `recovery_note`
- 写入单章运行日志 `novels/{novel_id}/runs/ch-{N}-{date}.md`

### 验证

- [ ] state 中 current_chapter 已更新
- [ ] protagonist 状态已反映本章变化
- [ ] 敌对势力状态已更新
- [ ] unresolved_conflicts 已更新
- [ ] plot_variables 已更新
- [ ] cast.md 已同步本章人物入场、关系变化、命运推进和已揭示秘密
- [ ] 关系线状态已同步，且下一次推进节点不晚于当前 Volume / Arc 规划
- [ ] canon/facts.md 已同步本章事实显露状态、角色知情变化和关联章节计划
- [ ] 未改写 canon/facts.md 的真实事实、公开版本和禁止改写项
- [ ] open_loops 中本章推进/新埋/回收的伏笔已记录
- [ ] 最近章节摘要已追加本章目标、局势变化和下一章承接点
- [ ] 时间线、地点、人物位置、战力资源、伤势、声望和道具变化已同步
- [ ] 敌对势力当前行动、误判、损失、底牌暴露或下一步计划已同步
- [ ] 场景因果链已记录本章关键前因、选择、结果和后续影响
- [ ] 质量风险与错误修复台账已更新；阻塞级问题不得留到下一章
- [ ] 下一章目标承接本章 ending_hook
- [ ] 运行控制字段已同步，且本次运行结束时 `run_lock` 已清除
- [ ] 单章运行日志已写入

## STATE 6: 循环推进

先确认本次章节循环已完成到 STATE_6，并将 `last_run_completed_state` 写为 STATE_6。随后执行单章推进判定，并把 `lifecycle_state` 设置为下一次运行入口：

- 如果全书完成 → 设置 `pending_action: completed`，`lifecycle_state = STATE_6`
- 如果当前 Part 完成 → 设置 `pending_action: part_transition`，下次运行按 `system/templates/part-transition.md` 处理 Part 过渡（仅 ultra_long）
- 如果当前 Volume 完成 → 设置 `pending_action: volume_transition`，下次运行按 `system/templates/arc-transition.md` 处理 Volume 过渡
- 如果当前 Arc 完成 → 设置 `pending_action: arc_transition`，下次运行按 `system/templates/arc-transition.md` 处理 Arc 过渡
- 如果 state 超过归档阈值 → 设置 `pending_action: state_archive`，下次运行按 `system/templates/state-archive.md` 处理归档
- 如果最近 10-20 章剧情单元未闭环 → 设置 `pending_action: stage_review_20ch`
- 如果最近 3-5 章无明显局势变化或爽点重复明显 → 设置 `pending_action: stage_review_5ch` 或 `plan_adjust`
- 如果存在未处理阻塞级修复 → 设置 `pending_action: repair`
- 如果以上均无 → 设置 `pending_action: none`，`next_chapter_to_generate = current_chapter + 1`，`lifecycle_state = STATE_2`

STATE 6 不得在同一次章节运行内直接展开下一章、下一 Arc 或下一 Volume。它只负责写清下一次运行的路由。

## 完整循环检查清单

- [ ] STATE 2: chapter_plan 生成且验证通过
- [ ] STATE 3: 正文生成且包含所有必须事件
- [ ] STATE 4: 审阅通过
- [ ] STATE 4: 叙事表现门禁通过或已完成小修
- [ ] STATE 5: state、canon 和 open_loops 已更新
- [ ] STATE 5: 章节摘要、场景因果链、时间线、地点、战力资源、敌对势力行动和错误修复台账已更新
- [ ] STATE 6: 已设置下一次运行路由、运行控制字段和单章运行日志
- [ ] 所有文件已写入正确路径
- [ ] 未违反任何 P0/P1 规则
