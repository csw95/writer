# Opening Setting Evaluation V1 — novel-004 — 2026-07-01

## 评估范围

- **novel_id**: novel-004
- **书名**: 归期在雪落之后
- **评估对象**: `premise`、`worldbuilding`、`characters/cast`、`characters/cast-active`、`canon/facts`、`canon/facts-active`、`structure/long-term-arc`、`structure/parts/part-001`、`structure/volumes/volume-001`、`structure/arcs/arc-001`、`state/current-state`、`open-loops/loops`。
- **基线**: 初始化后首轮设定审阅。
- **评估目的**: 判断 novel-004 是否可以进入 Chapter 1、黄金三章和正常 STATE 2-6 单章循环。

## 总结判定

**结论**: 首轮审阅发现 2 项 P1 结构门禁缺口，均已在本轮执行最小修订。修订后 novel-004 **通过完整开篇门禁**，可进入 Chapter 1 章节规划。

### 阻塞项总览

| 编号 | 级别 | 问题 | 状态 |
|------|------|------|------|
| P1-1 | P1 | `state/current-state.md` 缺少正式“初始化完成检查”区块，无法直接承接开篇门禁复评结论 | 本轮已修订 |
| P1-2 | P1 | `FACT-002` 已规划 Ch6 “碎星归位”暗示，但缺少独立 `LOOP-*` 追踪，长期证据线存在漏回收风险 | 本轮已修订 |

当前无 P0/P1 阻塞项。

## P1 阻塞项详述与修订

### P1-1: current-state 缺少初始化完成检查

**问题**:  
`state/current-state.md` 已标记 `STATE_1`、`pending_action: none`、`run_lock.status: clear`，但缺少与初始化模板一致的“初始化完成检查”清单，尤其缺少“完整开篇门禁”确认项。

**影响**:  
后续自动化运行无法从状态文件直接判断是否已通过开篇门禁，容易在 Chapter 1 生成前重复进入内容补齐或遗漏门禁确认。

**修订**:  
已在 `state/current-state.md` 末尾补齐“初始化完成检查”，逐项确认 premise、world、cast、active context、facts、long-term structure、part/volume/arc、state、archive、open-loops 均已初始化，并写入：

```text
完整开篇门禁: v1 设定审阅确认通过，可进入 Chapter 1 / 黄金三章 / 正常 STATE 2-6 单章循环
```

### P1-2: FACT-002 缺少独立伏笔追踪

**问题**:  
`FACT-002: 归迟堕魔的幕后诱因` 在 `canon/facts.md`、`arc-001.md` 中规划 Ch6 通过“碎星归位”声响首次暗示，但 `open-loops/loops.md` 没有对应伏笔。原先只把 FACT-002 绑定到 `LOOP-004: 三世偿债，终归此世`，语义过宽。

**影响**:  
“天律司投放归墟碎星”是第三阶段制度旧案证据链的核心事实。若没有独立 LOOP，后续 Planner 可能把 Ch6 声响当作一次性氛围，不按 Vol2 后半至 Vol3 回收。

**修订**:

1. 新增 `LOOP-006: “碎星归位”的梦中声音`。
2. 将 `FACT-002` 关联伏笔改为 `LOOP-006`。
3. 同步 `facts-active.md`，把 `FACT-002` 纳入 Arc 001 活跃事实与 Ch6 即将触发事实。
4. 同步 `volume-001.md`、`arc-001.md`、`long-term-arc.md` 中的 FACT/LOOP 口径。
5. 回收窗口统一为：Vol2 Ch55-Ch60 启动证据，Vol3 Ch72-Ch84 部分回收，最晚 Ch90。

## 机械核对

### open-loops -> canon/facts

| Loop ID | 引用 Fact | 在 facts.md 中定义？ |
|---------|-----------|---------------------|
| LOOP-001 | FACT-001, FACT-003 | 通过 |
| LOOP-002 | FACT-004 | 通过 |
| LOOP-003 | FACT-001, FACT-007 | 通过 |
| LOOP-004 | FACT-004, FACT-005 | 通过 |
| LOOP-005 | FACT-005, FACT-006 | 通过 |
| LOOP-006 | FACT-002 | 通过 |

### canon/facts -> open-loops

| Fact ID | 引用 Loop | 在 loops.md 中定义？ |
|---------|-----------|---------------------|
| FACT-001 | LOOP-001, LOOP-003 | 通过 |
| FACT-002 | LOOP-006 | 通过 |
| FACT-003 | LOOP-001, LOOP-003 | 通过 |
| FACT-004 | LOOP-002, LOOP-004 | 通过 |
| FACT-005 | LOOP-004, LOOP-005 | 通过 |
| FACT-006 | LOOP-005 | 通过 |
| FACT-007 | LOOP-003 | 通过 |

## 各维度评分

| 维度 | 分数 | 判定 | 说明 |
|------|------|------|------|
| premise 平台上架信息 | 8.5 | 通过 | 书名、简介、平台标签和点击信号统一指向“县城高三暗恋 + 仙侠宿命旧债”。 |
| 分类与类型承诺 | 8.5 | 通过 | 女频幻想言情/仙侠奇缘定位清楚，校园阶段被明确约束为情绪入口而非主类型替代。 |
| 世界规则与代价 | 8.5 | 通过 | 凡世劫场、天规、雪印、偿债契、护身残术均有代价和禁止突破项。 |
| 开篇显露策略 | 9.0 | 通过 | 黄金三章只显露转学、旧梦、旧称、局部暴雪和断句，禁止百科式天界史。 |
| 人物门禁 | 8.5 | 通过 | 主角 Want/Need/Lie/Wound 完整，Ch1-Ch12 关键人物均已建档。 |
| 关系线编排 | 8.0 | 通过 | REL-ROM/MAIN/KIN/COMRADE/RIVAL 均已进入 cast、Volume、Arc；早期越界禁止明确。 |
| canon 事实台账 | 8.5 | 通过（修订后） | 7 条核心事实具备知情状态、揭露窗口和禁止改写项；FACT-002 已补独立 LOOP。 |
| open-loops 可追踪性 | 8.5 | 通过（修订后） | 6 条活跃伏笔均绑定 Fact，回收窗口和逾期处理方案明确。 |
| Volume/Arc 结构完整性 | 8.5 | 通过 | Volume 001、Arc 001 目标、压力阶梯、敌对行动、3-5 章节奏窗口完整。 |
| active context 完整性 | 8.0 | 通过 | cast-active、facts-active 覆盖 Ch1-Ch12；FACT-002 已纳入活跃事实。 |
| current-state 运行控制 | 8.5 | 通过（修订后） | `pending_action: none`、`run_lock: clear`、`next_chapter_to_generate: 1`，并已补初始化检查。 |
| 黄金三章可写性 | 8.8 | 通过 | Ch1 现实冲突+梦境钩子，Ch2 搭档+旧称，Ch3 暴雪+护身残术+偿债断句，推进清晰。 |

## P2/P3 建议项

### P2-1: 关系线台账可补“最晚确认章节”列

`characters/cast.md` 的关系线台账已有越界禁止和下一节点，但未单独设置“最晚确认章节”列。当前不阻塞，因为人物命运台账、Volume 和 Arc 已给出 Ch30/Ch60 等确认窗口。建议在 Arc 002 或 Ch12 小结前补列，提升长期自动化稳定性。

### P2-2: 第一卷时间跨度压缩需在 chapter_plan 中细化

Volume 001 用 30 章覆盖高三上学期开学至高考雪夜。设定层可行，但章节规划必须标清月考、竞赛、寒假/春季、高考前后等时间跳点，避免 30 章内时间感突兀。

### P3-1: medium 档 Part 文件是索引，不触发 part_transition

`structure/parts/part-001.md` 已明确为 medium 档全书阶段索引。后续状态路由仍应以 Volume/Arc 为主，不应在 Ch120 前误触发 ultra_long 的 `part_transition` 流程。

## 修订文件清单

| 文件 | 修订内容 |
|------|----------|
| `open-loops/loops.md` | 新增 `LOOP-006`，活跃伏笔数 5 -> 6 |
| `canon/facts.md` | `FACT-002` 关联伏笔改为 `LOOP-006` |
| `canon/facts-active.md` | 将 `FACT-002` 纳入 Arc 001 活跃事实和 Ch6 即将触发事实 |
| `structure/long-term-arc.md` | 跨阶段伏笔和 FACT-002 揭露阶段同步到 `LOOP-006` |
| `structure/volumes/volume-001.md` | 本卷事实显露计划和伏笔计划补 `FACT-002/LOOP-006` |
| `structure/arcs/arc-001.md` | FACT-002 章节节拍关联 `LOOP-006`，Arc 级伏笔同步 |
| `state/current-state.md` | 补初始化完成检查；登记本轮两项已解决修复 |

## 校验结果

执行：

```bash
python3 tools/validate-novel.py novel-004
```

结果：

```text
OK: 0 errors, 0 warning(s)
```

## 最终路由

- **判定**: 通过完整开篇门禁。
- **pending_action**: none
- **run_lock.status**: clear
- **next_chapter_to_generate**: 1
- **下一步**: 按 `system/templates/chapter-cycle.md` 进入 STATE 2，生成 `structure/chapter-plans/ch-001.md`。

## 红线确认

- 未生成章节正文。
- 未改写历史章节。
- 未跨小说引用或修改其他小说内容。
- 未改写核心事实的真实因果，只补齐伏笔追踪和状态门禁。
