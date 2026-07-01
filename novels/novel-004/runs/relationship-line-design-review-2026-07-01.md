# Relationship Line Design Review — novel-004 — 2026-07-01

## 评估范围

- **novel_id**: novel-004
- **书名**: 归期在雪落之后
- **重点问题**: 现有设计是否足够支撑“细腻描绘感情线”，尤其是第一卷和第一 Arc 的男女主 REL-ROM-001。
- **读取文件**: `premise.md`、`characters/cast.md`、`characters/cast-active.md`、`structure/long-term-arc.md`、`structure/volumes/volume-001.md`、`structure/arcs/arc-001.md`、`state/current-state.md`、`open-loops/loops.md`、`system/methodology/relationship-lines.md`、`system/methodology/prose-style.md`、`system/methodology/dialogue.md`。

## 结论

原设定的主关系线方向正确：女频幻想言情定位清楚，REL-ROM-001 是主驱动，第一 Arc 已规定从对立到注意、本能守护，且设置了 Ch12 前不得恋爱确认、不得公开前世的边界。

主要缺口在“写法层”：原文件能回答“哪章推进到哪里”，但对“如何写细”规定不足。若直接进入章节生成，容易把感情线写成抽象标签，例如“她心动了”“他本能守护”“两人宿命牵连”，而不是通过动作、停顿、物件、距离、身体代价和潜台词呈现。

## 已执行修订

| 文件 | 修订内容 |
|------|----------|
| `characters/cast.md` | 关系线台账新增“最晚确认章节”；新增 `REL-ROM-001 细腻描写执行规则`，拆分双方表达方式、升温层级和场景写法门禁。 |
| `characters/cast-active.md` | 新增本 Arc 感情线轻量执行提示，保证单章生成优先上下文也能读到可写温度和禁区。 |
| `structure/volumes/volume-001.md` | 新增本卷情感线细腻描写方案，明确 Ch1-Ch30 的情绪递进轴、反复母题和写作门禁。 |
| `structure/arcs/arc-001.md` | 新增 Arc 001 感情线细节节拍，逐章规定情感动作点、双方反应、潜台词和禁止概括。 |
| `state/current-state.md` | 在节奏与质量风险中新增情感线执行门禁，提醒 Ch1-Ch12 避免抽象心动。 |

## 关键写法标准

REL-ROM-001 的细腻感必须来自连续选择，而不是旁白宣布。

- 沈照雪的关心应包装成规则、成绩、证据和安全判断。
- 陆归迟的关心应包装成顺手、嫌麻烦、玩笑或挑衅。
- 每次暧昧都要绑定现实阻碍或宿命异常。
- 每次升温都要出现行为改变，例如从只争排名到共享证据，从回避追问到承认共梦。
- 第一卷的正确终点是“未确认但互相牵挂”，不是提前恋爱。

## 黄金三章执行提醒

| 章节 | 情感线重点 | 不能丢的细节 |
|------|------------|--------------|
| Ch1 | 对立识别 | 一分排名、座位距离、试卷字迹、沈照雪秩序被打乱、陆归迟记住她的小动作。 |
| Ch2 | 被迫共处 | 竞赛搭档、旧称“阿照”后的双向僵停、沈照雪查证他是否故意、陆归迟用玩笑遮掩失控。 |
| Ch3 | 本能守护 | 暴雪危险、手腕/伞/体温、男主挡在前面但不能万能救场、女主必须有主动判断和承担。 |

## 后续路由

- **pending_action**: none
- **run_lock.status**: clear
- **next_chapter_to_generate**: 1
- **建议下一步**: 进入 Chapter 1 章节规划时，Planner 必须在 `relationship_line_plan` 和每个关键场景的呈现计划中引用本次新增的情感线细节节拍。

## 红线确认

- 未生成章节正文。
- 未改变核心事实、关系终点、伏笔回收窗口或敌对势力计划。
- 未让男女主提前确认恋爱或公开前世。
- 未跨小说引用或修改其他小说内容。
