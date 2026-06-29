# Chapter Plan Schema

章节计划的强制数据结构。所有章节必须由此结构驱动生成。

## 字段定义

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chapter_id | integer | ✅ | 章节编号 |
| volume_arc_position.volume | string | ✅ | 当前卷 |
| volume_arc_position.arc | string | ✅ | 当前 Arc |
| volume_arc_position.role | enum | ✅ | 黄金三章/Arc开端/推进/小高潮/收束 |
| classification.channel | enum | ✅ | 男频/女频/通用 |
| classification.category | string | ✅ | 主大类，必须来自 premise |
| classification.subcategory | string | ✅ | 细分类，必须来自 premise |
| classification.secondary_categories | string[] | 否 | 交叉分类，最多2个 |
| classification.tags | string[] | ✅ | 2-6个卖点标签 |
| classification.service_point | string | ✅ | 本章如何服务主分类读者期待 |
| length_plan.tier | enum | ✅ | short/medium/long/ultra_long |
| length_plan.target_chars | integer | ✅ | 本章目标正文字数 |
| length_plan.min_chars | integer | ✅ | 本章最少正文字数 |
| length_plan.max_chars | integer | ✅ | 本章最多正文字数 |
| length_plan.scene_budgets | SceneBudget[] | ✅ | 各场景字数预算 |
| length_plan.deviation_reason | string | ✅ | 超出常规范围的原因，无则写“无” |
| goal | string | ✅ | 一句话章节目标 |
| genre_promise.primary_genre | string | ✅ | 主类型 |
| genre_promise.deliver | string[] | ✅ | 本章兑现的类型承诺 |
| genre_promise.avoid_repeat | string | ✅ | 与前章爽点的差异 |
| emotional_curve.type | enum | ✅ | 压抑->释放/误解->证明/低估->反转/失去->夺回/危机->突破/期待->兑现/谜题->揭晓 |
| emotional_curve.low_point | string | ✅ | 情绪压低点 |
| emotional_curve.release_point | string | ✅ | 情绪释放点 |
| conflict.type | enum | ✅ | 人物冲突/势力冲突/内部冲突/环境冲突/制度冲突/命运冲突 |
| conflict.parties | string[] | ✅ | 冲突双方角色或势力标识 |
| conflict.intensity | 1-10 | ✅ | 冲突强度 |
| conflict.irreconcilable_point | string | ✅ | 不可调和点 |
| escalation.from | string | ✅ | 升级前状态 |
| escalation.to | string | ✅ | 升级后状态 |
| escalation.pressure_ladder | string[] | ✅ | 压力阶梯 |
| pre_write_state_check | PreWriteStateCheck | ✅ | 写作前连续性、状态、边界和风险确认 |
| antagonist_action_plan | AntagonistActionPlan | ✅ | 敌对势力或压力源主动行动 |
| power_resource_plan | PowerResourcePlan | ✅ | 战力、能力、资源、道具、伤势和地位变化 |
| time_location_continuity | TimeLocationContinuity | ✅ | 时间线、地点、人物可达性和移动成本 |
| crisis_choice | CrisisChoice | ✅ | 主角必须面对的代价选择 |
| relationship_line_plan | RelationshipLinePlan | ✅ | 本章关系线推进、维持、暂停和主次约束 |
| canon_fact_plan | CanonFactPlan | ✅ | 本章引用的事实、显露层级、读者可见信息和角色知情变化 |
| scenes | Scene[] | ✅ | 至少3个关键场景；每个场景必须包含因果字段和叙事呈现字段 |
| scenes[].presentation_focus | string | ✅ | 本场景读者最该看见的画面、人物动作或物件状态 |
| scenes[].sensory_anchors | string[] | ✅ | 至少2个与冲突相关的声音、光线、气味、温度、触感、疼痛或空间距离线索 |
| scenes[].action_beats | string | ✅ | 关键动作节拍，按触发 -> 反应 -> 碰撞/受阻 -> 代价 -> 余波拆解 |
| scenes[].sentence_rhythm | string | ✅ | 本场景句式节奏策略，如短促、压迫、舒缓、克制、爆发或冷硬 |
| scenes[].avoid_flat_summary | string | ✅ | 本场景禁止用一句话概括带过的动作、情绪或局势变化 |
| must_have_events | Event[] | ✅ | 至少3个必须事件 |
| pleasure_mechanism.type | enum | ✅ | 压制/反转/升级/情绪释放/误解证明/低估打脸/危机突破 |
| pleasure_mechanism.trigger | string | ✅ | 触发时机描述 |
| pleasure_mechanism.effect | string | ✅ | 预期读者情绪 |
| ending_hook.type | enum | ✅ | 危机/信息/反转/选择/爽点/误会 |
| ending_hook.content | string | ✅ | 结尾钩子内容 |
| ending_hook.next_chapter_pull | string | ✅ | 下一章拉力 |
| characters_involved | CharacterRole[] | ✅ | 本章涉及角色、画像状态、叙事功能和命运推进 |
| foreshadowing.advance | string[] | 否 | 推进的伏笔ID列表 |
| foreshadowing.new | Foreshadow[] | 否 | 新埋伏笔 |
| foreshadowing.payoff | string[] | 否 | 回收的伏笔ID列表 |
| foreshadowing.related_facts | string[] | 否 | 关联的事实ID列表 |
| variable_changes | VariableChange[] | ✅ | 剧情变量变化 |
| downstream_impact | DownstreamImpact | ✅ | 本章结果对后续 3-5 章的影响 |
| serial_risks | SerialRisk | ✅ | 连载风险 |
| theme_operation | ThemeOperation | 否 | 本章主题推进、反证、暂停或回收 |
| subplot_operations | SubplotOperation[] | 否 | 本章子情节新增、推进、休眠、并回或回收 |
| pov_plan | POVPlan | 否 | 多 POV 或特殊 POV 章节计划 |
| dialogue_plan | DialoguePlan | 否 | 对话主导章节的语音差异、潜台词和密度控制 |
| character_exit_plan | CharacterExitPlan | 否 | 死亡、离队、长期缺席、背叛、洗白、阵营转向或功能交接 |
| breathing_chapter_plan | BreathingChapterPlan | 否 | 呼吸章的低外部强度、高内部推进设计 |

## Classification 结构

```json
{
  "channel": "男频",
  "category": "仙侠",
  "subcategory": "凡人流",
  "secondary_categories": ["玄幻"],
  "tags": ["宗门", "修炼升级", "资源争夺", "低阶逆袭"],
  "service_point": "通过宗门资源争夺和境界压制，兑现低阶修士逆袭期待"
}
```

## LengthPlan 结构

```json
{
  "tier": "medium",
  "target_chars": 3000,
  "min_chars": 2500,
  "max_chars": 3500,
  "scene_budgets": [
    { "scene": "Scene 1", "target_chars": 800 },
    { "scene": "Scene 2", "target_chars": 1100 },
    { "scene": "Scene 3", "target_chars": 1100 }
  ],
  "deviation_reason": "无"
}
```

## CrisisChoice 结构

```json
{
  "option_a": "做法 + 代价",
  "option_b": "做法 + 代价",
  "protagonist_choice": "主角实际选择",
  "irreversible_consequence": "不可逆后果"
}
```

## PreWriteStateCheck 结构

```json
{
  "previous_hook": "上一章必须承接的钩子",
  "recent_chapter_summary": ["最近3章中会影响本章的要点"],
  "timeline": "当前故事时间和距上一章时间跨度",
  "location_and_positions": "当前地点、人物位置和可达性",
  "protagonist_state": "战力、资源、伤势、情绪、声望和目标",
  "relationship_boundaries": "涉及关系线当前状态和禁止越界项",
  "canon_loop_boundaries": "本章可显露的 Fact/Loop 上限",
  "antagonist_state": "敌对势力目标、资源、行动和误判点",
  "repair_status": "无阻塞/需要处理的问题ID和方案"
}
```

## AntagonistActionPlan 结构

```json
{
  "actor": "势力/反派/制度/环境压力源",
  "goal": "对方本章想达成什么",
  "resources_or_trump_cards": ["必须来自 cast/world/canon/volume/arc"],
  "active_action": "本章主动行动",
  "reasonable_misjudgment": "信息差/性格缺陷/利益约束；无则写无",
  "pressure_on_protagonist": "对主角造成的具体压力",
  "result_and_followup": "行动结果及后续影响"
}
```

## PowerResourcePlan 结构

```json
{
  "protagonist_change": "战力/资源/道具/伤势/声望/地位变化；无变化写无",
  "enemy_gap": "本章前后敌我差距",
  "cost": "能力、道具、资源、时间、关系或伤势代价",
  "conservation_check": "变化来源、消耗去向、冷却/限制是否符合 world",
  "forbidden_breakthrough": "本章不能提前获得或绕过的能力/资源"
}
```

## TimeLocationContinuity 结构

```json
{
  "story_time": "本章发生时间",
  "elapsed_since_previous": "距上一章多久",
  "main_locations": ["LOC-XXX 或已登记地点"],
  "movement": "地点变化、路线、耗时、代价；无则写无",
  "character_reachability": "关键人物为何能在场",
  "continuity_risk": "无/低/中/高"
}
```

## RelationshipLinePlan 结构

```json
{
  "advanced_lines": ["REL-COMRADE-001"],
  "status_change": "陆青禾对沈砚从旁观转为注意其异常伤势；未形成结盟",
  "trigger_event": "陆青禾在试灵台看见石纹并为伤势出声",
  "service_to_mainline": "为后续医册线和石纹代价提供内部观察者，不改变本章逐名主冲突",
  "priority_constraint": "关系线只埋点，不抢玄幻逆袭和规则破局主快感",
  "boundary_check": "无未规划恋爱、背叛、牺牲、决裂、和解、确认关系或阵营转向"
}
```

## CanonFactPlan 结构

```json
{
  "referenced_facts": ["FACT-001"],
  "fact_types": ["历史事件", "身份秘密"],
  "reveal_level": "暗示/误导/部分揭露/公开揭露/反转修正/不显露",
  "reader_visible_information": "读者只看到旧城灰烬不合常理，不解释焚城真相",
  "character_knowledge_changes": [
    {
      "character_id": "CHAR-PROTAGONIST",
      "from": "不知情",
      "to": "部分知情",
      "trigger": "发现巡夜司旧印"
    }
  ],
  "related_loops": ["LOOP-001"],
  "service_to_plot": "支撑本章证据链和章末钩子",
  "boundary_check": "无未登记事实、未规划真相揭露、角色越权知情或超出揭露窗口"
}
```

## SceneBudget 结构

```json
{
  "scene": "Scene 1",
  "target_chars": 800
}
```

## Scene 结构

```json
{
  "name": "场景名称",
  "cause": "前因",
  "goal": "场景目标",
  "obstacle": "阻碍",
  "action_choice": "行动选择",
  "crisis_choice": "场景中的代价选择",
  "climax_action": "高潮行动",
  "result_change": "结果变化",
  "downstream_effect": "后续影响",
  "emotional_function": "情绪功能",
  "presentation_focus": "本场景读者最该看见的画面、人物动作或物件状态",
  "sensory_anchors": ["至少2个与冲突相关的声音/光线/气味/温度/触感/疼痛/空间距离等线索"],
  "action_beats": "触发 -> 反应 -> 碰撞/受阻 -> 代价 -> 余波",
  "sentence_rhythm": "短促/压迫/舒缓/克制/爆发/冷硬等",
  "avoid_flat_summary": "本场景不能用一句话带过的关键动作、情绪或局势变化"
}
```

## Event 结构

```json
{
  "trigger": "触发条件",
  "action": "动作描述",
  "result": "结果"
}
```

## CharacterRole 结构

```json
{
  "name": "角色标识",
  "role": "推进/阻碍/信息提供/情感支撑/制造代价",
  "profile_status": "完整/最小画像/功能人物",
  "registered_in_cast": true,
  "fate_progress": "无/关系变化/关键选择/转折/退场/升阶"
}
```

## Foreshadow 结构

```json
{
  "id": "LOOP-XXX",
  "type": "角色秘密/世界观谜团/势力阴谋/物品线索/人物关系",
  "surface_function": "表面作用",
  "true_function": "真正作用",
  "related_facts": ["FACT-001"],
  "description": "伏笔内容",
  "planned_payoff_chapter": 10,
  "latest_payoff_chapter": 20
}
```

## VariableChange 结构

```json
{
  "variable": "变量名",
  "from": "变化前值",
  "to": "变化后值"
}
```

## DownstreamImpact 结构

```json
{
  "next_3_to_5_chapter_changes": ["本章结果会影响后续3-5章的变化"],
  "state_risks_to_track": ["时间线/地点/人物/伏笔/事实/资源/关系"],
  "next_chapter_must_continue": "下一章必须承接的具体点"
}
```

## 可选功能字段

这些字段只在章节涉及对应功能时启用，避免常规章节过度结构化。

### ThemeOperation

```json
{
  "function": "推进/反证/误导/暂停/回收",
  "theme_question": "本章触及的主题问题",
  "protagonist_answer_change": "主角答案变化；无则写无",
  "presented_by_choice": "通过哪个选择或代价呈现",
  "avoid_preaching": "禁止说教项"
}
```

### SubplotOperation

```json
{
  "subplot_id": "SUBPLOT-001",
  "operation": "新增/推进/休眠/并回主线/回收",
  "mainline_service": "如何服务主线",
  "next_node": "下一节点"
}
```

### POVPlan

```json
{
  "pov_characters": ["CHAR-PROTAGONIST"],
  "switch_reason": "切换原因；单 POV 写无",
  "knowledge_boundaries": "每个 POV 不能知道什么"
}
```

### DialoguePlan

```json
{
  "dialogue_role": "谈判/审讯/争执/潜台词/关系拉扯",
  "voice_contrast": "角色语音差异",
  "subtext": "潜台词设计",
  "density_control": "对话与动作/描写比例"
}
```

### CharacterExitPlan

```json
{
  "character_id": "CHAR-XXX",
  "exit_type": "死亡/离队/长期缺席/背叛/洗白/阵营转向/功能交接",
  "preplanned_in": "Volume/Arc/Chapter 计划位置",
  "handoff": "该角色承担的 Fact/LOOP/REL 如何处理",
  "state_updates": "需要同步的文件"
}
```

### BreathingChapterPlan

```json
{
  "reason": "高潮后/失败后/关系沉淀/信息整理/新地图进入",
  "lowered_external_intensity": true,
  "must_advance": ["关系线", "代价", "事实显露"],
  "next_pressure": "下一场冲突压力来源"
}
```

## SerialRisk 结构

```json
{
  "pleasure_fatigue": "无/低/中/高",
  "foreshadowing_overdue": "无/低/中/高",
  "canon_fact_risk": "无/低/中/高",
  "goal_drift": "无/低/中/高",
  "timeline_location": "无/低/中/高",
  "power_resource": "无/低/中/高",
  "character_drift": "无/低/中/高"
}
```

## 验证规则

1. chapter_id 必须为正整数，且与上一章连续。
2. conflict.intensity >= 5。
3. length_plan 必须符合 premise 中的 length_tier 和章节字数范围。
4. length_plan.scene_budgets 的 target_chars 合计应接近 length_plan.target_chars，允许 10% 偏差。
5. scenes 至少 3 个，且每个 Scene 必须有前因、目标、阻碍、行动选择、结果变化和后续影响。
6. must_have_events 至少 3 个。
7. crisis_choice 必须包含明确代价。
8. ending_hook.content 不能为空或与上一章相同。
9. variable_changes 至少 1 个。
10. genre_promise.deliver 至少 1 项。
11. classification 必须继承 premise 的 channel / category / subcategory / tags，不得临时改类。
12. classification.tags 必须为 2-6 个。
13. 第一章必须声明 `volume_arc_position.role = 黄金三章`，并符合开篇规范。
14. 所有命名、复登、关键转折、伏笔功能人物必须在 characters 设定中存在。
15. 背叛、死亡、洗白、恋爱推进、离队、升阶等重大人物转折必须在当前 Volume / Arc 的人物命运中预设。
16. relationship_line_plan 必须声明本章关系线操作；任何情感、手足、同袍、师徒、敌友或阵营信任推进，都必须在当前 Volume / Arc 的关系线编排中预设。
17. canon_fact_plan 必须声明本章事实操作；任何历史旧案、暗线真相、身份秘密、能力代价、阵营隐情、物品真相或制度底层规则，都必须引用已登记 Fact ID。
18. canon_fact_plan.reveal_level 必须符合当前 Volume / Arc 的事实显露计划，不得超过 canon/facts.md 中的揭露窗口。
19. 角色知情变化必须与 canon/facts.md 中的知情状态连续，不得让角色越权知道未显露真相。
20. 新埋、推进或回收长期伏笔时，应通过 foreshadowing.related_facts 绑定 Fact ID 或说明明确未来答案。
21. pre_write_state_check 必须承接 state 的最近章节摘要、上一章钩子、时间地点、人物状态、资源战力和错误修复台账。
22. antagonist_action_plan 必须说明敌对势力或压力源的主动行动；反派失败必须有合理误判来源。
23. power_resource_plan 必须符合 world 中的战力、能力、资源、道具和代价约束。
24. time_location_continuity 必须保证人物可达、移动成本成立、时间线无矛盾。
25. downstream_impact 必须说明本章结果影响后续 3-5 章的方式。
26. 禁止用巧合、临场道具、设定补丁、反派降智或主角突然开窍解决核心矛盾。
