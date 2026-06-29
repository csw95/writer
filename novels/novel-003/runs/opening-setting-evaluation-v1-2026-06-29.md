# Opening Setting Evaluation V1 — novel-003 — 2026-06-29

## 评估范围

- **novel_id**: novel-003
- **书名**: 诡载者
- **评估对象**: `premise`、`worldbuilding`、`characters/cast`、`characters/cast-active`、`canon/facts`、`canon/facts-active`、`structure/long-term-arc`、`structure/parts/part-001`、`structure/volumes/volume-001`、`structure/arcs/arc-001`、`state/current-state`、`open-loops/loops`。
- **基线**: 首轮审阅（无前序版本）。
- **必读规范**: `system/methodology/canon.md`、`characters.md`、`relationship-lines.md`、`novel-categories.md`、`genre-promises.md`、`review-rubric.md`，`system/templates/novel-init.md`，`system/schemas/canon-fact.schema.md`、`system/schemas/state.schema.md`。
- **参考标准**: `novels/novel-002/runs/2026-06-29-opening-setting-evaluation-v5.md`。
- **评估目的**: 判断 novel-003 是否可以进入 Chapter 1、黄金三章和正式章节循环。

## 总结判定

**结论**: 首轮审阅发现 2 项 P1 阻塞项和 3 项 P1 结构补齐缺口，需修订后方可通过完整开篇门禁。本轮已对全部 P1 阻塞项执行修订。

### 阻塞项总览

| 编号 | 级别 | 问题 | 状态 |
|------|------|------|------|
| P1-1 | P1 | 诡载能力解锁节奏矛盾：worldbuilding 定义"承载"为第三阶段(25%-50%)能力，但 Arc 001/Volume 001/Part 001/premise 在第一阶段(5%)规划"稳定承载" | 本轮已修订 |
| P1-2 | P1 | long-term-arc.md 缺少三幕式骨架、子情节索引和上下文压缩策略（初始化检查清单必填项） | 本轮已修订 |
| P1-3 | P1 | current-state.md 缺少"初始化完成检查"区块（含完整开篇门禁项） | 本轮已修订 |

---

## P0/P1 阻塞项详述与修订

### P1-1: 诡载能力解锁节奏矛盾

**问题**:

`world/worldbuilding.md` §诡载 定义了清晰的能力阶段：

| 阶段 | 百分比 | 可用能力 |
|------|--------|----------|
| 第一阶段 | 0%-10% | 触碰诡核可短暂入境，读到表层禁忌和不规则纹路 |
| 第二阶段 | 10%-25% | 可主动入境，读到完整原始禁忌契约并短暂嫁接一条规则 |
| 第三阶段 | 25%-50% | 可承载一条已读契约作为自身可调用规则 |

但以下文件在第一阶段（5%，Ch30）规划了"稳定承载"和"完整读取契约"——前者是第三阶段能力，后者是第二阶段能力：

- `structure/arcs/arc-001.md` Ch29: "入境完整读取第一条原始禁忌契约"（第二阶段能力）
- `structure/arcs/arc-001.md` Ch30: "第一条规则稳定承载"（第三阶段能力）
- `structure/arcs/arc-001.md` Arc 结束标志: "Ch30 完成第一条规则稳定承载"
- `structure/volumes/volume-001.md` 卷结束标志: "承载第一条核心规则，诡载达第一阶段中段"
- `structure/parts/part-001.md` Part 结束标志: "承载至少一条核心规则"
- `structure/parts/part-001.md` 规则承载: "承载 1 条核心原始禁忌契约"
- `structure/long-term-arc.md` Part 001: "承载 1 条核心原始禁忌契约"
- `bible/premise.md` 第一 Arc 目标: "Ch29-30 完成第一条规则的稳定承载"
- `characters/cast-active.md`: "Ch30 达第一阶段中段"（未标注能力口径）

此外，`structure/parts/part-001.md` 和 `structure/long-term-arc.md` 在 Part 001 结束（12%，第二阶段初期）规划"承载 1 条核心规则"，但"承载"是第三阶段（25%+）能力，12% 只能"嫁接"。

**影响**:

如果不修订，Writer 在 Ch29-30 会让主角在 5% 诡载阶段使用第三阶段能力，造成 world_fidelity 违规；Reviewer 将判定阻塞。

**修订方案**:

1. **`world/worldbuilding.md` §诡载**: 在第一阶段描述中增加"不稳定承载"概念——第一阶段中段（约5-8%）可在极限代价下尝试"不稳定承载"（表层规则残留锚定），但极不稳定、不可主动调用、随时可能反噬，不等同于第三阶段的正式承载。在限制中增加阶段边界说明。
2. **`structure/arcs/arc-001.md`**: Ch29 改为"深层入境触及契约核心表层"；Ch30 改为"第一次不稳定承载（表层规则残留锚定）"；Arc 结束标志和逐章概要同步。
3. **`structure/volumes/volume-001.md`**: 卷结束标志"承载第一条核心规则"改为"不稳定承载第一条核心规则"。
4. **`structure/parts/part-001.md`**: 规则承载"承载 1 条核心原始禁忌契约"改为"不稳定承载/嫁接 1 条核心原始禁忌契约"；Part 结束标志同步。
5. **`structure/long-term-arc.md`**: Part 001 规则承载同步修改。
6. **`bible/premise.md`**: 第一 Arc 目标和 Part 001 目标中"稳定承载"改为"不稳定承载"。
7. **`characters/cast-active.md`**: 标注 Ch30 能力口径为"不稳定承载"。
8. **`state/current-state.md`**: 主角资源与状态"规则承载"项同步。

**修订红线遵守**: 未改写 `canon/facts.md` 中 FACT-004 的禁止改写项（诡载不能无代价使用、诡纹非普通污染、诡化风险贯穿后期）；只调整 worldbuilding 阶段定义的边界表述和结构文件术语，不改变核心能力体系和因果逻辑。

### P1-2: long-term-arc.md 缺少三幕式骨架、子情节索引和上下文压缩策略

**问题**:

`system/templates/novel-init.md` 初始化完成检查清单要求：

- `long-term-arc 已拆出三幕、阶段目标、全书分类服务点、冲突升级路线、节奏审稿节点、主要人物长期命运线和全书关系线主次规划`
- `long-term-arc 已初始化子情节索引，或明确第一 Arc 暂无子情节`
- `long-term-arc 已定义 active 文件刷新节点、state 归档节点和阶段摘要频率`

当前 `long-term-arc.md` 已有阶段目标、冲突升级路线、节奏审稿节点、人物命运线和关系线主次规划，但缺少：

1. **三幕式骨架**（第一幕/第二幕/第三幕的章节范围、激励事件、转折点）
2. **子情节索引**（SUBPLOT 表或明确声明第一 Arc 暂无子情节）
3. **上下文压缩策略**（active 文件刷新节点、state 归档节点、阶段摘要频率）
4. **全书分类服务点**（虽 premise 有分类定位，但 long-term-arc 需声明全书如何持续服务该分类）

**影响**: 初始化检查清单不完整，不满足开篇门禁要求。

**修订方案**: 在 `long-term-arc.md` 补齐以上四个缺失区块。

### P1-3: current-state.md 缺少"初始化完成检查"区块

**问题**:

`state/current-state.md` 的"运行控制"区块标明 `initialization_state: STATE_1_COMPLETE`，但缺少 `system/templates/novel-init.md` 要求的正式"初始化完成检查"清单，包括"完整开篇门禁"项。

**影响**: 无法正式标记开篇门禁的通过/未通过状态，不满足自动化运行前检查要求。

**修订方案**: 在 `current-state.md` 末尾补齐"初始化完成检查"区块，逐项核对 novel-init.md 清单，并根据本轮审阅结论标记"完整开篇门禁"。

---

## P2/P3 建议项

### P2-1: Part 002"累计3条核心规则承载"与 worldbuilding"可承载一条"的关系需明确

**位置**: `structure/long-term-arc.md` Part 002: "累计 3 条核心规则承载"（诡载 28%，第三阶段初期）。

**问题**: worldbuilding §诡载 第三阶段写"可承载一条已读契约"，未明确说明随着百分比上升是否可承载多条。

**影响**: 不构成开篇阻塞，但 Part 002 规划时可能产生口径分歧。

**建议**: 在 worldbuilding §诡载 第三阶段补充说明"随着诡载百分比上升，可承载的规则数量递增"。本轮不修订，留待 Part 002 规划时处理。

### P2-2: 关系线台账缺少"最晚确认章节"字段

**位置**: `characters/cast.md` 关系线台账。

**问题**: `system/methodology/relationship-lines.md` 要求"若关系性质存在分支，必须在此章前确认"。当前台账未显式列出"最晚确认章节"。

**影响**: 人物命运台账中有最晚确认章节（如林述 Part 004 末、苏黎 Part 004 末），但关系线台账未独立标明。不构成阻塞。

**建议**: 后续 Volume/Arc 规划时补充。

### P3-1: 平台标签中"灵异"和"异能"不在标签库

**位置**: `bible/premise.md` 平台标签: 悬疑、灵异、升级、规则怪谈、末世、异能。

**问题**: `system/methodology/novel-categories.md` 标签库未显式列出"灵异"和"异能"。但"灵异"是主分类"悬疑灵异"的通用称呼，"异能"是常见平台标签，且 premise 已做标签合规检查说明。

**影响**: 不构成阻塞。标签取自常见平台用语，符合"优先使用目标平台已有标签"原则。

### P3-2: FACT-010 关联伏笔为空

**位置**: `canon/facts.md` FACT-010 关联伏笔: []。

**问题**: POOL-002（诡序会与殷无）绑定 FACT-010，但 FACT-010 的关联伏笔字段为空。

**影响**: 按事实库使用规则"单条事实的关联伏笔字段只记录已进入台账的 LOOP-*；POOL-* 在 loops.md 中反向绑定"，此为设计行为，非错误。仅建议后续将 POOL 转为 LOOP 时同步更新。

---

## 机械核对：open-loops 与 canon/facts.md 的 Fact 引用一致性

### open-loops → canon/facts.md

| Loop ID | 引用 Fact | 在 facts.md 中定义？ |
|---------|-----------|---------------------|
| LOOP-001 | FACT-003, FACT-001 | ✓ ✓ |
| LOOP-002 | FACT-007, FACT-006 | ✓ ✓ |
| LOOP-003 | FACT-004, FACT-012 | ✓ ✓ |
| LOOP-004 | FACT-005, FACT-002, FACT-011, FACT-003 | ✓ ✓ ✓ ✓ |
| LOOP-005 | FACT-008, FACT-005 | ✓ ✓ |
| LOOP-006 | FACT-009 | ✓ |
| POOL-001 | FACT-011 | ✓ |
| POOL-002 | FACT-010 | ✓ |
| POOL-003 | FACT-012, FACT-013 | ✓ ✓ |
| POOL-004 | FACT-013, FACT-003 | ✓ ✓ |
| POOL-005 | FACT-006 | ✓ |

**结果**: 全部通过。

### canon/facts.md → open-loops

| Fact ID | 引用 Loop | 在 loops.md 中定义？ |
|---------|-----------|---------------------|
| FACT-001 | LOOP-001 | ✓ |
| FACT-002 | LOOP-004 | ✓ |
| FACT-003 | LOOP-001, LOOP-004 | ✓ ✓ |
| FACT-004 | LOOP-003 | ✓ |
| FACT-005 | LOOP-004, LOOP-005 | ✓ ✓ |
| FACT-006 | LOOP-002 | ✓ |
| FACT-007 | LOOP-002 | ✓ |
| FACT-008 | LOOP-005 | ✓ |
| FACT-009 | LOOP-006 | ✓ |
| FACT-010 | [] | （POOL 反向绑定，设计行为） |
| FACT-011 | LOOP-004 | ✓ |
| FACT-012 | LOOP-003 | ✓ |
| FACT-013 | LOOP-001, LOOP-003 | ✓ ✓ |

**结果**: 全部通过。

---

## 各维度评分表

| 维度 | 分数 | 判定 | 说明 |
|------|------|------|------|
| premise 平台上架信息 | 8.5 | 通过 | 书名有类型信号；简介含主角身份/处境/冲突/优势/目标/钩子；6标签合规；点击信号清晰。 |
| 世界规则与代价与禁止事项 | 8.0 | 通过（修订后） | 规则体系完整，代价轴清晰；P1-1 修订后阶段口径统一。 |
| 开篇显露策略 | 9.0 | 通过 | 第一章只显露最小必要规则，逐步显露策略明确，禁止百科式开场。 |
| 人物 Want/Need/Lie/Wound | 9.0 | 通过 | 主角和核心配角完整画像；命运台账和成长路线清晰。 |
| 关系线主次编排与禁止越界 | 8.5 | 通过 | 6条关系线分级清晰，越界禁止完整，Arc 级节拍到位。 |
| canon 事实台账与揭露窗口 | 8.5 | 通过 | 13条事实 schema 合规；知情状态分级清晰；禁止改写项明确。 |
| open-loops 伏笔可追踪性 | 9.0 | 通过 | 6条活跃+5条池伏笔；Fact 绑定机械核对全部通过。 |
| Part/Volume/Arc 结构完整性 | 7.5 | 条件通过（修订后） | 结构完整；P1-2 补齐三幕/子情节/压缩策略后达标。 |
| 时间轴与能力解锁节奏 | 7.0 | 条件通过（修订后） | P1-1 修订后诡载阶段与能力口径一致。 |
| 黄金三章可写性 | 8.5 | 通过 | Ch1-3 场景、冲突、选择、代价、钩子完整；降颗粒度说明清晰。 |
| current-state 完整性 | 7.5 | 条件通过（修订后） | P1-3 补齐初始化检查清单后达标。 |

---

## 最终结论

**判定**: 本轮审阅发现 3 项 P1 阻塞项，已全部执行修订。修订后判定为 **通过完整开篇门禁**（依据版本: v1）。

通过后可进入：

1. Chapter 1 chapter_plan 生成。
2. Chapter 1 正文试写。
3. 黄金三章规划与生成。
4. 从 Chapter 1 开始的正常 STATE 2-6 单章循环。

### 修订文件清单

| 文件 | 修订内容 |
|------|----------|
| `world/worldbuilding.md` | §诡载 第一阶段增加"不稳定承载"概念；§限制增加阶段边界说明 |
| `bible/premise.md` | 第一 Arc 目标、Part 001 目标中"稳定承载"改为"不稳定承载" |
| `structure/arcs/arc-001.md` | Ch29-30、Arc 结束标志、逐章概要术语修订 |
| `structure/volumes/volume-001.md` | 卷结束标志"承载"改为"不稳定承载" |
| `structure/parts/part-001.md` | 规则承载、Part 结束标志术语修订 |
| `structure/long-term-arc.md` | Part 001 规则承载修订；补齐三幕式骨架、子情节索引、上下文压缩策略、全书分类服务点 |
| `characters/cast-active.md` | Ch30 能力口径标注 |
| `state/current-state.md` | 主角资源术语修订；补齐初始化完成检查区块 |

### 修订红线遵守确认

- 未改写 `canon/facts.md` 中任何已登记禁止改写项。✓
- 未违背 AGENTS.md 隔离规则，仅操作 `novels/novel-003/` 下文件。✓
- 只改设定文件，未生成章节正文。✓
- open-loops 中 FACT-* 引用全部能在 canon/facts.md 找到定义。✓
