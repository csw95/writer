# 多小说AI长篇写作系统 — 完整规范

## 一、系统最高原则（Priority Rules）

以下规则按优先级排序，必须严格执行：

### P0（绝对规则 / 不可违反）
- 不同小说之间完全隔离（禁止信息共享）
- 禁止跳过剧情结构直接写正文
- 禁止修改已完成章节
- 禁止无冲突章节
- 禁止无因果变化场景；关键场景必须产生局势、人物、关系、伏笔、情绪或设定显露变化
- 禁止引入未定义世界观元素
- 禁止未建档人物承担关键转折、伏笔功能或长期剧情功能
- 禁止未编排关系线承担恋爱、背叛、牺牲、决裂、同盟转向或长期情绪回报
- 禁止未登记事实承担历史因果、身份秘密、能力真相、暗线反转或伏笔回收功能
- 禁止临场发明、推翻或改写已登记的幕后事实、历史真相、身份秘密、能力规则和真相揭露节点
- 禁止用巧合、反派降智、道具突然出现、能力临场补丁解决核心矛盾
- 禁止发现矛盾后直接覆盖历史正文、硬圆核心设定或跳过错误修复记录
- 禁止在 premise / world / characters / canon / volume / arc 未补齐前启动单章自动化
- 禁止当前 Arc 的 cast-active / facts-active 缺失或过期时继续生成章节
- 禁止 ultra_long 在 Part 文件未补齐前启动对应阶段章节自动化
- 禁止第一章未通过开篇审阅就进入自动化续写
- 禁止忽略 state 的运行控制字段直接进入章节生成
- 禁止让 `state/current-state.md` 无限追加历史明细；超过活跃窗口必须归档
- 禁止在多个文件中维护互相冲突的评分权重；评分权重唯一权威来源为 `system/schemas/scoring.schema.md`

### P1（结构规则）
- 所有内容必须由 chapter_plan 驱动生成
- 所有章节必须基于 state 状态生成
- 每章写作前必须读取当前时间线、地点、战力资源、敌对势力行动、伏笔状态和最近章节摘要
- 每章写作后必须更新章节摘要、场景因果链、时间地点、战力资源、人物关系、敌对势力行动和质量风险
- `state/current-state.md` 默认只保留最近 20 章章节摘要和最近 10 章场景因果链，旧章节明细必须归档到 `state/archive/`
- 单章运行优先读取 active context；完整 cast / canon 只在 active 文件不足时定向读取
- 每本小说必须声明 channel / category / subcategory / tags
- 每本小说必须声明上架书名 / 500字以内作品简介 / 平台标签 / 点击信号
- 每本小说必须声明 length_tier / target_chapters / target_chapter_chars / target_total_chars
- 每章必须推进剧情变量
- 每章必须声明类型承诺兑现项
- 每章必须声明情绪曲线和章末钩子类型
- 每章正文文件末尾必须包含 `## 名词与剧情说明`，用于解释本章已显露层级内的专有名词、规则口径、证据链和复杂剧情逻辑
- 每个关键场景必须声明目标、阻碍、行动、选择、结果变化和后续影响
- 每 3-5 章必须出现一次明显局势变化；每 10-20 章必须完成一个剧情小单元或阶段闭环

### P2（爽文规则）
- 每章必须包含至少一个：冲突 / 压制 / 反转 / 升级 / 情绪释放
- 连续3章不得重复同一种爽点机制

### P3（优化规则）
- 保持节奏紧凑
- 避免冗长解释
- 优先推进剧情而不是设定解释
- 用冲突带设定，不用百科式说明开篇
- 用行动和选择呈现人物，不用履历表式说明人物

## 二、多小说隔离机制

每本小说必须拥有完全独立系统。novel_id 是唯一隔离单位。

禁止行为：
- 引用其他小说角色
- 引用其他小说世界规则
- 使用跨小说记忆
- 混合状态数据

所有 AI 操作必须显式绑定 novel_id。

## 三、小说生命周期状态机

```
STATE 0: 初始化 → 创建 bible / world / characters / canon / state / open_loops
STATE 1: 结构生成 → 按篇幅档位生成 long_term_arc / part / volume / arc
STATE 2: 章节规划 → 逐章生成 chapter_plan
STATE 3: 章节生成 → AI写正文
STATE 4: 审阅修正 → 检查逻辑 / 爽点 / 连贯性
STATE 5: 状态更新 → 更新 state / canon / open_loops
STATE 6: 循环推进 → 进入下一章节
```

禁止跳过状态。

## 四、超长篇稳定性闭环

超长篇写作必须优先保证长期稳定性，而不是单章炫技。系统必须同时维护四类闭环。

### 1. 写作前状态确认

每次生成 chapter_plan 或正文前，必须确认：

1. 当前总主线、Part / Volume / Arc 目标和本章目标。
2. 上一章 ending_hook、最近 3 章摘要、后续至少 3 章方向。
3. 当前时间线、地点、人物位置、行动连续性和地理移动成本。
4. 主角战力、资源、道具、伤势、情绪、声望和内在弧光状态。
5. 核心配角状态、关系线状态、命运节点、禁止行为边界。
6. 敌对势力目标、当前行动、资源、误判点、底牌和下一步压力。
7. 未回收伏笔、逾期风险、关联 Fact ID、计划回收和最晚回收章节。
8. 世界规则、能力代价、资源守恒、禁用设定和当前可显露信息上限。

### 2. 场景因果闭环

每个关键场景必须满足：

```text
前因 → 角色目标 → 阻碍冲突 → 行动选择 → 结果变化 → 后续影响
```

场景结束后，至少一项必须发生变化：

- 主线局势
- 人物状态或选择
- 关系线状态
- 伏笔状态
- 事实显露或证据链
- 情绪曲线
- 战力、资源、地点或风险

不满足变化要求的场景应删除、合并或重写。

### 3. 写作后状态更新

每章完成并通过审阅后，State Manager 必须更新：

1. 本章剧情摘要、完成目标、局势变化和下一章承接点。
2. 场景因果链、关键选择、结果后果和后续影响。
3. 时间线、地点、人物位置、行动消耗和移动连续性。
4. 主角与关键人物的战力、资源、伤势、情绪、声望、关系和知情状态。
5. 敌对势力行动结果、损失、误判、下一步计划和威胁等级。
6. 伏笔新增 / 推进 / 回收 / 废弃状态，计划回收和最晚回收章节。
7. 事实显露状态、读者已知、角色知情变化和禁止改写项。
8. 后续 3-5 章节奏风险、爽点疲劳、目标偏移、伏笔逾期和事实越界风险。
9. 章节后补充说明：本章专有名词、规则口径、证据链、剧情详解和暂不展开边界。

### 4. 阶段审稿与错误修复闭环

审稿频率：

- 每章：连续性、场景因果、人物一致性、设定边界、事实显露和伏笔状态。
- 每 3-5 章：局势变化、爽点轮换、情绪曲线、关系线越界风险。
- 每 10-20 章：剧情单元闭环、压力阶梯升级、敌对势力主动性、伏笔推进。
- 每卷结束：主线目标、人物命运、关系线、事实库、世界规则、资源战力和未解决问题总检。

发现矛盾时，必须先分类：

```text
设定矛盾 / 时间线矛盾 / 人物行为矛盾 / 战力资源矛盾 / 伏笔冲突 / 动机不成立
```

然后记录修复方案：

```text
最小修改方案 / 补充铺垫方案 / 删除重写方案 / 后文解释方案
```

常规章节不得直接改写历史正文；涉及核心事实、人物命运、世界规则或长期关系线的修复，必须返回内容补齐和重新规划。

## 五、小说内部结构标准

每本小说必须包含：

1. **bible（故事圣经）**: 上架书名、500字以内作品简介、平台标签、点击信号、一句话卖点、分类定位、类型承诺、读者期待、黄金三章目标、禁止偏离项
2. **world（世界观）**: 世界规则、力量体系（必须可计算）、社会结构、资源体系、代价体系、时间历法、地图地点、移动成本、禁用补丁
3. **characters（角色系统）**: 主角 Want/Need/Lie/Wound、核心配角、敌对势力、反派主动计划、关系网、人物分级、登场前最小画像、阶段命运方向、新增人物规则，以及当前 Arc 活跃人物索引 cast-active
4. **canon（事实库）**: 幕后事实、历史关键事实、暗线真相、身份秘密、能力/物品/制度真相、公开版本、知情状态、显露窗口、禁止改写项，以及当前 Arc 活跃事实索引 facts-active
5. **story_structure（故事结构）**: 长期主线（按 length_tier）、Part（ultra_long 必填）、冲突升级路线、节奏审稿节点、主要人物长期命运线、关系线主次规划、Volume（按篇幅档位）、Arc（按篇幅档位）、章节目标
6. **state（核心运行状态）**: 当前剧情阶段、运行控制字段、章节摘要活跃窗口、时间线、地点、主角状态（战力/情绪/资源）、敌对势力状态、事实显露状态、未解决冲突、质量风险、错误修复台账、归档索引、下一章目标
7. **open_loops（伏笔系统）**: 未解决剧情线索、关联事实、计划回收章节、最晚回收章节、当前状态
8. **runs（运行日志）**: 单章运行、断点恢复、阶段审稿、State 归档和 Arc/Volume/Part 过渡记录，质量风险和下一次运行路由

## 六、篇幅标准

所有小说必须遵守 `system/methodology/length-standards.md`。

| 档位 | length_tier | 目标章数 | 单章正文字数 | 全书总字数 |
|------|-------------|----------|--------------|------------|
| 短篇 | short | 30-60 章 | 2000-3000 字 | 6-18 万字 |
| 中篇 | medium | 80-180 章 | 2500-3500 字 | 20-63 万字 |
| 长篇 | long | 200-500 章 | 3000-4000 字 | 60-200 万字 |
| 超长篇 | ultra_long | 1000-3000+ 章 | 2500-4000 字 | 250 万字以上，常规 250-1200 万字 |

默认档位为 `medium`：120 章、每章约 3000 字、全书约 36 万字。

`target_total_chars` 必须约等于 `target_chapters × target_chapter_chars`，允许 10% 以内偏差。

## 七、章节生成协议

每一章必须严格遵守：

1. STEP 1: 冲突建立
2. STEP 2: 压力/压制
3. STEP 3: 信息变化 / 事件发生
4. STEP 4: 反转 / 升级 / 爆点
5. STEP 5: 收束 + 钩子

最低要求：至少1个冲突点 + 至少1个变化点 + 至少1个推进点

每个章节文件还必须在正文、元数据、场景执行记录、爽点记录、伏笔记录和已显露事实之后，追加 `## 名词与剧情说明`。该区块必须遵守 `system/methodology/chapter-supplement.md`：只解释本章已写出且已允许显露的信息，不计入正文字数，不得替正文补关键因果，不得公开未显露事实。

每个 chapter_plan 还必须声明：

- 本章类型承诺
- 本章字数计划
- 本章情绪曲线
- 本章场景列表
- 写作前状态确认：时间线、地点、人物状态、敌对势力行动、伏笔和资源约束
- 场景因果链：前因、场景目标、阻碍、行动、选择、结果、后续影响
- 叙事呈现计划：呈现焦点、感官锚点、动作节拍、句式节奏和禁止概括项
- 危机选择
- 章末钩子类型
- 伏笔操作
- 事实/真相操作：引用的 Fact ID、显露层级、读者可见信息、角色知情变化、禁止越界
- 战力 / 能力 / 资源操作：变化来源、代价、消耗、限制和守恒检查
- 时间线 / 地点连续性：本章发生时间、地点变更、移动合理性和人物位置
- 敌对势力主动行动：反派或压力源本章做了什么，而不是只等待主角行动
- 后续影响：本章结果如何影响后续 3-5 章
- 与当前 Volume / Arc 目标的关系
- 本章涉及人物的画像状态、叙事功能和命运推进
- 本章关系线操作、关系状态变化和主次约束

## 八、AI角色分工

- **Planner AI**: 生成 chapter_plan，控制剧情节奏和场景呈现计划
- **Writer AI**: 只负责写正文，不允许修改剧情结构，并执行场景呈现计划
- **Reviewer AI**: 检查逻辑错误、爽点不足、设定冲突和叙事表现
- **State Manager AI**: 更新 state、characters、canon、open_loops、power progression

## 九、章节计划标准（chapter_plan）

每章计划必须包含：
- chapter_id
- classification（频道 / 主大类 / 细分类 / 标签）
- length_plan（target_chars / min_chars / max_chars / scene_budgets）
- goal（章节目标）
- genre_promise（类型承诺）
- emotional_curve（情绪曲线）
- conflict（冲突）
- escalation（升级路径）
- crisis_choice（危机选择）
- relationship_line_plan（关系线操作）
- canon_fact_plan（事实/真相操作）
- pre_write_state_check（写作前连续性确认）
- power_resource_plan（战力 / 能力 / 资源操作）
- antagonist_action_plan（敌对势力主动行动）
- time_location_continuity（时间地点连续性）
- downstream_impact（后续 3-5 章影响）
- scenes（场景列表，含前因、行动选择、结果变化、后续影响和叙事呈现字段）
- must_have_events（必须发生事件）
- ending_hook（结尾钩子）

## 十、爽点评分系统

评分权重和判定规则的唯一权威来源是 `system/schemas/scoring.schema.md`。其他文件只能引用或同步该 schema，不得维护不同权重。

每章输出必须包含评分（1-10）：
- conflict_strength
- pacing_speed
- satisfaction_level
- hook_strength
- genre_promise
- logic_consistency
- world_fidelity
- character_consistency
- setup_payoff
- causal_chain
- continuity_control
- power_resource_consistency
- novelty

叙事表现门禁独立评分，不纳入综合分权重，但会影响是否允许进入状态更新：

- scene_texture
- action_clarity
- prose_vividness
- pov_embodiment

综合低于7分必须重写章节。第一章还必须通过开篇额外评分，否则不得作为自动化续写起点。

## 十一、开篇门禁

第一章生成前必须读取：

- `system/methodology/core.md`
- `system/methodology/opening.md`
- `system/methodology/length-standards.md`
- `system/methodology/prose-style.md`
- `system/methodology/characters.md`
- `system/methodology/relationship-lines.md`
- `system/methodology/canon.md`
- `system/methodology/chapter-supplement.md`
- `system/methodology/novel-categories.md`
- `system/methodology/genre-promises.md`
- `novels/<novel_id>/bible/premise.md`
- `novels/<novel_id>/world/worldbuilding.md`
- `novels/<novel_id>/characters/cast.md`
- `novels/<novel_id>/canon/facts.md`
- `novels/<novel_id>/structure/volumes/volume-001.md`
- `novels/<novel_id>/structure/arcs/arc-001.md`

第一章必须完成：

1. `premise` 已完成平台上架信息：上架书名、500字以内作品简介、3-6个平台标签和点击信号。
2. 前500字内出现冲突或异常。
3. 主角身份、处境、当前目标清晰。
4. 分类定位和类型承诺有明确可感知信号。
5. 金手指或特殊优势露出一角，但不能无代价完全解决问题。
6. 世界观不得百科式开场；必要说明必须服务当前场景，并通过冲突、压迫、选择、代价或异常逐步显露。
7. 主角画像、压迫关系、第一阶段命运方向必须可感知。
8. 章末钩子直接拉动第二章。

## 十二、单章自动化门禁

每次自动化任务只允许处理一个章节或一个 `pending_action`。运行前必须先执行 `system/templates/run-start-protocol.md`，并检查：

- 最新章节 review 已通过。
- state 已包含运行控制字段，且 `run_lock` 可用。
- `pending_action` 已按路由处理；若不为 none，不得生成新章节。
- `pending_action = state_archive` 时，必须先按 `state-archive.md` 归档 state。
- `pending_action = part_transition` 时，必须先按 `part-transition.md` 补齐下一 Part。
- `last_run_status` 不是 partial；若为 partial，必须先断点恢复。
- `next_chapter_to_generate = last_completed_chapter + 1`。
- 当前小说已声明并遵守频道、主分类、细分类和标签。
- 当前小说已补齐平台上架信息，且作品简介不超过500字、平台标签符合目标平台或标签库。
- 当前小说已声明并遵守篇幅档位和章节字数范围。
- 当前小说已补齐 world/worldbuilding.md，且第一章通过世界观显露检查。
- 当前小说已补齐 characters/cast.md，且当前 Volume / Arc 人物门禁已完成。
- 当前小说已补齐 characters/cast-active.md，且覆盖当前 Arc 和后续 3-5 章关键人物。
- 当前小说已补齐 canon/facts.md，且当前 Volume / Arc 涉及的幕后事实、历史真相、身份秘密、能力代价和揭露窗口已登记。
- 当前小说已补齐 canon/facts-active.md，且覆盖当前 Arc 和后续 3-5 章涉及 Fact。
- 当前小说已补齐关系线主次规划，且当前 Volume / Arc 的关系线编排和章节级节拍已完成。
- state 当前章节与最新章节一致。
- state 的最近章节摘要、时间线、地点、人物位置、战力资源和敌对势力行动已更新到最新章节。
- canon/facts.md 的显露状态、读者已知和角色知情变化与最新章节一致。
- 当前 Arc 后续至少3章目标清晰。
- 当前 Arc 后续至少3章涉及的 Fact ID、显露层级、误导/维持节点和角色知情变化清晰。
- 当前 Arc 后续至少3章的节奏功能、爽点机制、关系线操作和敌对势力行动清晰。
- 如 length_tier = ultra_long，当前 Part 文件已补齐，且当前章节处于 Part 章节范围内。
- state/current-state.md 未超过归档阈值；若超过，必须先设置或处理 `pending_action: state_archive`。
- 活跃伏笔没有逾期未处理。
- 连续爽点无疲劳风险。
- 最近 3-5 章存在明确局势变化；如没有，必须先调整下一章计划。
- 当前无未处理的阻塞级错误修复提案。
- 本次单章 run 日志路径已确定。
- STATE 6 只设置下一次运行路由，不得在同一次运行内继续生成下一章。

## 十三、禁止行为列表

- 自行添加世界规则
- 临场添加或改写幕后事实、历史真相、身份秘密、能力代价、阵营隐情或物品真相
- 跳过章节计划
- 写无事件推进段落
- 写没有因果变化和后续影响的场景
- 修改历史章节
- 合并不同小说逻辑
- 写"说明性废话"
- 用章节后补充说明替代正文中必须呈现的关键因果、行动选择、证据来源或情绪转折
- 用巧合、道具突然出现、设定补丁、反派降智或主角突然开窍解决核心矛盾
- 跳过时间线、地点、战力资源、敌对势力和章节摘要状态更新
- 以自动化为由跳过开篇补齐、审阅和状态更新
- 绕过 `run_lock`、`pending_action` 或断点恢复检测直接生成章节
- 绕过 `state_archive` 或 `part_transition` 继续生成章节
- 在 chapter_plan 未声明的情况下推进恋爱、手足和解、同袍决裂、背叛、牺牲、离队或阵营站位变化
- 在 chapter_plan 未声明 Fact ID 和显露层级的情况下揭露、误导或反转核心事实

## 十四、系统目标

持续稳定生成高密度爽点且可长期接力的长篇 / 超长篇小说系统。

输出必须满足：
- 可按 short / medium / long / ultra_long 四档连续更新
- 逻辑稳定
- 节奏可控
- 爽点密集
- 世界观一致
- 幕后事实稳定
- 场景因果完整
- 人物行为稳定且允许有因有果地成长
- 伏笔可追踪、可推进、可回收
- 时间线、地点、战力、资源和敌对势力行动可追踪
- 发现矛盾时有最小修复流程

## 十五、Flow 保护与上下文压缩

为避免单章流程过度结构化，系统采用“核心必读 + 按需方法论”：

- 常规章节只执行章节循环中列出的核心门禁。
- 主题、子情节、对话、角色退场、多 POV、呼吸章、审阅趋势和上下文压缩只在本章涉及对应功能时读取对应方法论。
- Planner / Writer 优先使用 `cast-active.md`、`facts-active.md` 和 `current-state.md`；只有 active 文件无法覆盖本章需求时，才定向读取完整 `cast.md` 或 `facts.md`。
- 每次阶段过渡、关键人物变化或 Fact 窗口变化后，必须刷新 active context，避免长期全量读取导致上下文预算被设定文件吞没。
