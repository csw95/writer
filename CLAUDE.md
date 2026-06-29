# Multi-Novel AI Writing Engine

多小说AI长篇写作系统。用于生成多个独立长篇小说，每本小说拥有完整生命周期管理。

## 超长篇持续输出目标

本项目面向超长篇小说 AI 辅助创作，最高目标不是单章华丽度，而是长期稳定地 **接力、记忆、规划、校验、闭环**。

持续输出必须满足：

> 人物不漂、设定不崩、剧情有因果、节奏有起伏、伏笔能回收、长线目标不丢。

每次写作前，AI 必须确认：

1. 当前总主线、当前 Part / Volume / Arc 目标。
2. 当前章节目标、上一章钩子和后续至少 3 章方向。
3. 当前时间线、地点、人物位置和行动连续性。
4. 主角战力、资源、道具、伤势、情绪和内在弧光状态。
5. 主要人物状态、关系线状态、命运节点和禁止越界项。
6. 敌对势力当前目标、资源、主动行动计划、误判点和底牌。
7. 未回收伏笔、逾期伏笔、关联 Fact ID 和计划回收窗口。
8. 已知设定限制、能力代价、资源守恒和世界规则边界。

每次写作后，AI 必须更新：

1. 本章剧情摘要、完成目标和局势变化。
2. 场景因果链：前因、行动、冲突、选择、结果、后果。
3. 人物状态、关系状态、知情状态、战力资源和位置变化。
4. 新增 / 推进 / 回收伏笔及其计划回收窗口。
5. 事实显露状态、读者已知、角色知情变化和禁止改写项。
6. 未解决问题、下一章承接点和后续 3-5 章节奏风险。

所有关键剧情必须遵守：

```text
前因 → 行动 → 冲突 → 选择 → 结果 → 后果
```

所有关键场景必须满足：

```text
角色目标 + 阻碍冲突 + 行动选择 + 局势变化 + 后续影响
```

如果场景不能推动主线、人物、关系、伏笔、情绪或设定显露中的至少一项，则应删除、合并或重写。

## 目录结构

```
writer/
├── CLAUDE.md                       # 项目总规范（本文件）
├── system/                         # 系统级配置
│   ├── spec.md                     # 完整系统规范
│   ├── methodology/                # 写作方法论与质量门禁
│   │   ├── core.md
│   │   ├── opening.md
│   │   ├── length-standards.md
│   │   ├── long-form-structure.md
│   │   ├── scene-chapter.md
│   │   ├── prose-style.md
│   │   ├── characters.md
│   │   ├── relationship-lines.md
│   │   ├── canon.md
│   │   ├── novel-categories.md
│   │   ├── genre-promises.md
│   │   └── review-rubric.md
│   ├── agents/                     # AI 子系统 Prompt
│   │   ├── planner.md              # Planner AI — 章节规划
│   │   ├── writer.md               # Writer AI — 正文生成
│   │   ├── reviewer.md             # Reviewer AI — 审阅修正
│   │   └── state-manager.md        # State Manager AI — 状态更新
│   ├── schemas/                    # 数据结构标准
│   │   ├── chapter-plan.schema.md
│   │   ├── canon-fact.schema.md
│   │   ├── state.schema.md
│   │   └── scoring.schema.md
│   └── templates/                  # 操作模板
│       ├── novel-init.md           # 初始化新小说
│       ├── chapter-cycle.md        # 单章生成循环
│       ├── run-start-protocol.md   # 单章自动化启动、路由和恢复协议
│       ├── arc-transition.md       # Arc / Volume 过渡协议
│       └── stage-review.md         # 阶段审稿协议
├── novels/                         # 小说实例（强隔离）
│   └── <novel_id>/                 # 每本小说独立目录
│       ├── bible/premise.md
│       ├── world/worldbuilding.md
│       ├── characters/cast.md
│       ├── canon/facts.md
│       ├── structure/
│       │   ├── long-term-arc.md
│       │   ├── volumes/
│       │   ├── arcs/
│       │   └── chapter-plans/
│       ├── state/current-state.md
│       ├── open-loops/loops.md
│       ├── chapters/
│       └── runs/
└── tools/
    └── validate-chapter.md         # 章节验证清单
```

## 核心工作流

### 1. 创建新小说

```
1. 分配 novel_id（如 novel-001）
2. 复制 novels/_template/ → novels/<novel_id>/
3. 按 system/templates/novel-init.md 执行 STATE 0 → STATE 1
4. 输出 bible, world, characters, canon, structure, state, open-loops 初始化内容
5. 完成开篇门禁后才允许进入章节循环
```

### 2. 生成章节

```
对指定 novel_id 执行 STATE 2 → STATE 6 循环：
  STATE 2: Planner AI 生成 chapter_plan
  STATE 3: Writer AI 写正文
  STATE 4: Reviewer AI 审阅评分
  STATE 5: State Manager AI 更新状态
  STATE 6: 进入下一章循环
```

### 3. 开篇与单章自动化门禁

每次自动化任务只允许处理一个章节或一个 `pending_action`。在任何单章自动化任务前，必须先读取 `system/templates/run-start-protocol.md`，再补齐：

- `bible/premise.md`：一句话卖点、类型承诺、读者期待、黄金三章目标、篇幅档位、目标章数、单章字数范围、目标总字数
- `world/worldbuilding.md`：世界基础规则、力量/能力体系、资源体系、社会结构、势力体系、关键地点、历史背景、代价体系、禁止事项、开篇显露策略
- `characters/cast.md`：主角 Want/Need/Lie/Wound、核心配角、敌对势力、关系网、人物分级、登场前最小画像、阶段命运方向、新增人物规则
- `canon/facts.md`：幕后事实台账、历史关键事实、暗线真相、身份秘密、能力/物品/制度真相、公开版本、知情状态、显露窗口、禁止改写项、关联伏笔
- `structure/long-term-arc.md`：全书阶段目标、冲突升级路线、节奏审稿节点、主要人物长期命运线、全书关系线主次规划
- `structure/volumes/volume-001.md`：第一卷目标、人物配置与命运、关系线编排、反派主动计划、压力阶梯、伏笔计划
- `structure/arcs/arc-001.md`：按篇幅档位规划的第一 Arc 目标、Arc 人物门禁、章节级关系线节拍、3-5章节奏窗口
- `state/current-state.md`：当前剧情、时间线、地点、人物、战力资源、敌对势力、章节摘要、质量风险和错误修复台账
- `open-loops/loops.md`：伏笔台账格式

缺少以上任一项，只允许进行内容补齐，不允许生成章节。

每次自动化运行开始前，必须先检查 `state/current-state.md` 的 `运行控制` 区块：

- `run_lock` 必须可用；若为 locked 且无法确认旧运行已结束，不得继续。
- `pending_action` 不为 none 时，只处理该待办动作，不得进入章节生成。
- `last_run_status` 为 partial 或 `last_run_completed_state` 未到 STATE_6 时，必须先断点恢复。
- `next_chapter_to_generate` 必须等于 `last_completed_chapter + 1`。
- STATE 6 只写入下一次运行路由，不得在同一次自动化任务中继续生成下一章。

开篇正文不得用百科式世界观开场。世界观允许在合适时机进行必要的局部说明，但必须服务当前场景，并通过章节中的冲突、压迫、选择、代价和异常逐步显露。

任何会命名、反复登场、改变冲突结果、影响主角选择或承担伏笔功能的人物，必须先在 `characters/cast.md` 建立人物纲要；每个 Volume / Arc 等大情节开始前，必须确认本阶段关键人物画像和命运方向。人物可在后续篇章逐渐丰富，但不得在正文中临时新增关键人物或临场改写命运。

情感线、手足线、同袍线、师徒线、敌友线和阵营信任线必须按 `system/methodology/relationship-lines.md` 提前确定主次。凡会影响主角选择、阵营站位、证据链、牺牲、背叛、离队、救赎或恋爱推进的关系线，必须在 long-term-arc、当前 Volume、当前 Arc 和对应 chapter_plan 中提前编排；不得在正文中临场升温、确认、决裂或改写关系性质。

幕后事实、历史关键事件、身份秘密、能力真相、阵营隐情、物品真相和制度底层规则必须按 `system/methodology/canon.md` 提前进入 `canon/facts.md`。凡会影响主角选择、阵营站位、人物动机、证据链、能力代价、伏笔回收、反转或终局因果的事实，必须拥有稳定 `FACT-*`；chapter_plan 引用相关暗线时必须标明 Fact ID。正文可以误导读者或只显露局部，但不得违背事实库，不得让角色知道未显露事实，不得临场改写核心真相。

### 4. 阶段审稿与错误修复

超长篇必须定期自检，不能等写崩后再硬圆。

- 每章：执行连续性、场景因果、人物一致性、设定边界和伏笔状态检查。
- 每 3-5 章：检查是否有明显局势变化、爽点是否重复、关系线是否越界。
- 每 10-20 章：检查一个剧情单元是否闭环，压力阶梯是否升级，伏笔是否推进。
- 每卷结束：检查主线目标、人物命运、关系线、事实库、世界规则和资源战力总账。

发现矛盾时，AI 不得直接覆盖历史章节或硬圆设定，必须先分类：

```text
设定矛盾 / 时间线矛盾 / 人物行为矛盾 / 战力资源矛盾 / 伏笔冲突 / 动机不成立
```

然后提出并记录：

```text
最小修改方案 / 补充铺垫方案 / 删除重写方案 / 后文解释方案
```

常规章节只能执行不改写历史正文的最小修复；涉及核心事实、人物命运或世界规则的修复必须回到内容补齐和重新规划。

### 5. 隔离规则（强制）

- 每次操作必须显式指定 `novel_id`
- 禁止跨小说引用任何内容
- 每个 novel_id 的状态完全独立

## 快节奏命令

- **初始化小说**: 读取 `system/templates/novel-init.md`，提供 novel_id、频道、主分类和细分类
- **生成下一章**: 读取 `system/templates/chapter-cycle.md`，执行完整 STATE 2-6
- **审阅章节**: 对指定章节执行 Reviewer AI 检查
- **查看状态**: 读取 novels/<novel_id>/state/current-state.md
