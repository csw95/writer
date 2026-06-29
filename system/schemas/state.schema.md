# State Schema

小说运行时状态的数据结构标准。

## 字段定义

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| novel_id | string | ✅ | 小说唯一标识 |
| current_chapter | integer | ✅ | 当前章节编号 |
| lifecycle_state | enum | ✅ | STATE_0 ~ STATE_6 |
| last_updated | timestamp | ✅ | 最后更新时间 |
| classification.channel | enum | ✅ | 男频/女频/通用 |
| classification.category | string | ✅ | 主大类 |
| classification.subcategory | string | ✅ | 细分类 |
| classification.tags | string[] | ✅ | 2-6个卖点标签 |
| recent_chapter_summaries | ChapterSummary[] | ✅ | 最近章节摘要、局势变化和承接点 |
| timeline | TimelineState | ✅ | 当前故事时间、时间跨度、地点变化和连续性风险 |
| character_positions | CharacterPosition[] | ✅ | 关键人物位置、行动和可达性 |
| volume.name | string | ✅ | 当前 Volume 名称 |
| volume.current | integer | ✅ | Volume 内当前章节 |
| volume.total | integer | ✅ | Volume 总章节数 |
| arc.name | string | ✅ | 当前 Arc 名称 |
| arc.current | integer | ✅ | Arc 内当前章节 |
| arc.total | integer | ✅ | Arc 总章节数 |
| total_chapters | integer | ✅ | 全书规划总章数 |
| length.tier | enum | ✅ | short/medium/long/ultra_long |
| length.target_chapter_chars | integer | ✅ | 单章目标正文字数 |
| length.target_total_chars | integer | ✅ | 全书目标总字数 |
| length.chapter_char_range | string | ✅ | 章节字数范围，如 2500-3500 |
| protagonist.name | string | ✅ | 主角姓名 |
| protagonist.power_level | string | ✅ | 当前战力等级 |
| protagonist.power_value | integer | ✅ | 战力数值（可计算） |
| protagonist.emotion | string | ✅ | 当前情绪状态 |
| protagonist.injury_or_debuff | string | ✅ | 伤势、负面状态、冷却或精神负担 |
| protagonist.reputation_or_status | string | ✅ | 声望、地位、身份、职位或通缉状态 |
| protagonist.resources | string[] | ✅ | 关键资源/物品 |
| protagonist.relationships | Relationship[] | ✅ | 关键人际关系 |
| power_resources | PowerResourceState[] | ✅ | 战力、能力、资源、道具、伤势、声望和地位台账 |
| relationship_lines | RelationshipLine[] | ✅ | 长期关系线状态、阶段节点和下一计划推进 |
| protagonist.current_goal | string | ✅ | 当前最紧迫目标 |
| protagonist.arc_state | string | ✅ | Want/Need/Lie/Wound 当前推进 |
| antagonist_forces | AntagonistForce[] | ✅ | 敌对势力列表 |
| supporting_characters | SupportingChar[] | ✅ | 关键配角状态、画像状态和命运推进 |
| canon_facts | CanonFactState[] | ✅ | 关键事实显露状态、读者已知和角色知情变化 |
| unresolved_conflicts | Conflict[] | ✅ | 未解决冲突列表 |
| scene_causal_chains | SceneCausalChain[] | ✅ | 关键场景前因、选择、结果和后续影响 |
| quality_risks | QualityRiskState | ✅ | 节奏、爽点、伏笔、事实、时间线和资源风险 |
| repair_log | RepairItem[] | ✅ | 错误修复台账 |
| next_chapter_goal | string | ✅ | 下一章目标 |
| next_chapter_hook | string | ✅ | 承接的上一章钩子 |
| next_chapter_genre_promise | string | ✅ | 下一章类型承诺 |
| plot_variables | PlotVariable[] | ✅ | 剧情变量追踪 |

## Classification 结构

```json
{
  "channel": "男频",
  "category": "仙侠",
  "subcategory": "凡人流",
  "tags": ["宗门", "修炼升级", "资源争夺", "低阶逆袭"]
}
```

## Length 结构

```json
{
  "tier": "medium",
  "target_chapter_chars": 3000,
  "target_total_chars": 360000,
  "chapter_char_range": "2500-3500"
}
```

## ChapterSummary 结构

```json
{
  "chapter": 1,
  "goal": "本章目标",
  "core_event": "核心事件",
  "situation_change": "局势变化",
  "ending_hook": "章末钩子",
  "next_continuation": "下一章承接点"
}
```

## TimelineState 结构

```json
{
  "current_story_time": "当前故事时间",
  "elapsed_since_previous": "距上一章时间跨度",
  "current_location": "当前主要地点/LOC ID",
  "location_change": "地点变化、路线、耗时、代价",
  "movement_or_communication_cost": "移动/通信/疗伤/冷却成本",
  "risk": "无/低/中/高"
}
```

## CharacterPosition 结构

```json
{
  "character_id": "CHAR-XXX",
  "location": "当前位置",
  "last_seen_chapter": 1,
  "current_action": "当前行动",
  "available_next_chapter": true,
  "continuity_note": "连续性备注"
}
```

## Relationship 结构

```json
{
  "character": "角色标识",
  "relation_type": "盟友/恋人/师徒/敌对/中立/家人",
  "intimacy": 1,
  "last_change": "最近变化描述"
}
```

## PowerResourceState 结构

```json
{
  "item": "战力/能力/资源/道具/伤势/声望/地位",
  "current_state": "当前值或状态",
  "last_change": "最近变化",
  "change_reason": "变化原因",
  "cost_or_limit": "使用限制或代价",
  "next_change_condition": "下次可变化条件"
}
```

## RelationshipLine 结构

```json
{
  "id": "REL-COMRADE-001",
  "type": "主角与制度/同袍/手足/情感/师徒/敌友/阵营/镜像",
  "priority": "主关系线/一级副线/二级副线/点缀线",
  "participants": ["沈砚", "陆青禾"],
  "current_state": "旁观 -> 注意",
  "last_change": "Chapter 1 陆青禾注意到石纹",
  "next_planned_node": "Chapter 4 暗中处理石纹伤",
  "boundary": "不得未规划恋爱升温或确认关系"
}
```

## AntagonistForce 结构

```json
{
  "name": "势力名称",
  "status": "活跃/潜伏/受创/覆灭",
  "current_goal": "当前目标",
  "current_action": "当前行动",
  "resources_or_trump_cards": "当前资源和底牌",
  "misjudgment": "当前误判点；无则写无",
  "threat_level": 1,
  "chapter_change": "本章变化",
  "next_pressure": "下一步压力"
}
```

## SupportingChar 结构

```json
{
  "name": "角色名",
  "profile_status": "完整/最小画像/功能人物",
  "status": "状态描述",
  "location": "当前位置",
  "relation_to_protagonist": "关系",
  "fate_progress": "命运推进",
  "chapter_change": "本章变化"
}
```

## CanonFactState 结构

```json
{
  "fact_id": "FACT-001",
  "reveal_state": "未显露/已暗示/误导中/部分揭露/公开揭露/已反转",
  "reader_knows": "读者目前只知道旧城灰烬异常",
  "character_knowledge_change": "CHAR-PROTAGONIST: 不知情 -> 部分知情",
  "last_advanced_chapter": 1,
  "next_planned_node": "Chapter 4 发现巡夜司旧印"
}
```

## Conflict 结构

```json
{
  "description": "冲突描述",
  "parties": ["方A", "方B"],
  "priority": "高/中/低",
  "expected_resolution_chapter": 1
}
```

## SceneCausalChain 结构

```json
{
  "chapter": 1,
  "scene": "场景名称",
  "cause": "前因",
  "action_choice": "行动选择",
  "result_change": "结果变化",
  "downstream_effect": "后续影响"
}
```

## QualityRiskState 结构

```json
{
  "recent_3_to_5_chapter_change": "最近3-5章是否有明显局势变化",
  "recent_3_to_5_pleasure_mechanisms": ["爽点机制"],
  "recent_10_to_20_unit_state": "推进中/已闭环/需要收束",
  "pleasure_fatigue": "无/低/中/高",
  "goal_drift": "无/低/中/高",
  "foreshadowing_overdue": "无/低/中/高",
  "canon_reveal_overreach": "无/低/中/高",
  "timeline_location": "无/低/中/高",
  "power_resource": "无/低/中/高",
  "character_drift": "无/低/中/高"
}
```

## RepairItem 结构

```json
{
  "id": "REPAIR-001",
  "found_chapter": 1,
  "type": "设定矛盾/时间线矛盾/人物行为矛盾/战力资源矛盾/伏笔冲突/动机不成立",
  "severity": "阻塞/高/中/低",
  "description": "问题描述",
  "repair_plan": "最小修改/补充铺垫/删除重写/后文解释",
  "status": "待处理/处理中/已解决/阻塞"
}
```

## PlotVariable 结构

```json
{
  "name": "变量名",
  "current_value": "当前值",
  "trend": "↑/↓/→",
  "last_change_chapter": 1
}
```

## 验证规则

1. current_chapter 必须与最近生成的章节编号一致。
2. lifecycle_state 必须按顺序推进（不可跳过）。
3. protagonist.power_value 只能增加或不变，除非剧情需要明确标注原因。
4. unresolved_conflicts 不能为空。
5. next_chapter_goal 必须承接最新 ending_hook。
6. 所有命名、复登、关键转折、伏笔功能人物引用必须在 characters 设定中存在。
7. Volume / Arc 进度必须与 current_chapter 一致。
8. length 字段必须与 premise 中的篇幅规划一致。
9. classification 字段必须与 premise 中的分类定位一致，tags 必须为 2-6 个。
10. supporting_characters 中的阶段人物必须同步记录画像状态和命运推进。
11. relationship_lines 必须与 characters/cast.md 和当前 Volume / Arc 的关系线编排一致；未规划关系线不得出现重大推进。
12. canon_facts 必须与 canon/facts.md 和当前 Volume / Arc 的事实显露计划一致；未登记事实不得进入 state。
13. canon_facts 只能记录显露状态和知情变化，不得改写真实事实、公开版本或禁止改写项。
14. recent_chapter_summaries 必须包含最新章节目标、核心事件、局势变化、章末钩子和下一章承接点。
15. timeline 与 character_positions 必须保证时间、地点、移动、通信、疗伤和冷却连续。
16. power_resources 中的变化必须有来源、代价、限制和下次变化条件。
17. antagonist_forces 必须记录当前目标、主动行动、资源/底牌、误判点和下一步压力。
18. scene_causal_chains 必须记录最新章节关键场景的前因、行动选择、结果变化和后续影响。
19. quality_risks 必须追踪最近 3-5 章局势变化、最近 10-20 章剧情单元状态和主要连载风险。
20. repair_log 不得存在未处理的阻塞级问题进入下一章循环。
