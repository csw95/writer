# Open Loops Schema

伏笔台账的强制数据结构。所有长期伏笔、线索、未解决谜团、误导信息和回收计划必须使用稳定 `LOOP-*` 标识追踪。

## 字段定义

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| loop_id | string | ✅ | 稳定伏笔ID，格式 `LOOP-001` |
| title | string | ✅ | 伏笔名称 |
| type | enum | ✅ | 角色秘密/世界观谜团/势力阴谋/物品线索/人物关系/制度规则/能力代价/证据链 |
| planted_chapter | integer/string | ✅ | 埋设章节或阶段 |
| surface_function | string | ✅ | 表面作用，读者当前以为它是什么 |
| true_function | string | ✅ | 真正作用，后续真实功能或答案 |
| current_state | enum | ✅ | 待埋设/已埋下/已强化/已误导/已部分揭露/临近回收/已回收/逾期/已废弃需处理 |
| planned_payoff_chapter | integer/string | ✅ | 计划回收章节或阶段 |
| latest_payoff_chapter | integer/string | ✅ | 最晚回收章节或阶段 |
| overdue_plan | string | ✅ | 逾期处理方案 |
| related_facts | string[] | ✅ | 关联 `FACT-*`；无 Fact 时必须写明确未来答案 |
| related_loops | string[] | 否 | 关联 `LOOP-*` |
| priority | enum | ✅ | 主线/支线/彩蛋 |
| mainline_service | string | ✅ | 服务什么主线、人物、关系、事实或类型承诺 |
| reveal_boundary | string | ✅ | 当前阶段不得提前公开的信息 |
| owner | string | 否 | 负责该伏笔的角色、势力或叙事线 |
| revision_log | Revision[] | 否 | 修订记录 |

## OpenLoop 结构

```json
{
  "loop_id": "LOOP-001",
  "title": "断碑为何发声",
  "type": "能力代价",
  "planted_chapter": 1,
  "surface_function": "提示主角有特殊能力",
  "true_function": "断碑是天契旧规则的一部分，绑定沈家真名",
  "current_state": "已埋下",
  "planned_payoff_chapter": 72,
  "latest_payoff_chapter": 80,
  "overdue_plan": "若 Ch72 未推进，Ch73-75 必须补一次旧碑证据或调整 Arc 计划",
  "related_facts": ["FACT-003"],
  "related_loops": [],
  "priority": "主线",
  "mainline_service": "支撑主角规则破局和沈家旧案",
  "reveal_boundary": "第一卷前半只允许表现为异常与代价，不解释旧规则全貌"
}
```

## Revision 结构

```json
{
  "changed_at": "2026-06-29",
  "changed_after_chapter": 12,
  "reason": "调整回收窗口",
  "impact_check": "不影响已完成章节，只调整后续推进节奏"
}
```

## 验证规则

1. `loop_id` 必须唯一且稳定，不得复用或重命名。
2. 每个长期伏笔必须绑定至少一个 `FACT-*`，或在 `true_function` 中写明确未来答案。
3. `planned_payoff_chapter` 必须小于等于 `latest_payoff_chapter`；使用阶段描述时必须能落到具体 Arc / Volume。
4. 逾期伏笔不得直接删除，只能标记为逾期、提前回收、转为支线或废弃需解释。
5. 已回收伏笔必须记录回收章节、回收方式和回收质量。
6. `related_facts` 中的 Fact ID 必须存在于 `canon/facts.md`。
7. `related_loops` 中的 Loop ID 必须存在于 `open-loops/loops.md`。
8. chapter_plan 新埋、推进或回收伏笔时，必须同步 `open-loops/loops.md`。
9. State Manager 只能更新状态、回收信息、逾期处理和修订记录，不得无审批改写长期伏笔的真实功能。
