# Key Item Schema

关键物品台账的数据结构。所有承担剧情转折、证据链、伏笔、资源边界或长期功能的物品必须用稳定 `ITEM-*` 标识追踪。

## 字段定义

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| item_id | string | ✅ | 稳定物品ID，格式 `ITEM-001` |
| name | string | ✅ | 故事内名称 |
| type | enum | ✅ | 武器/信物/遗物/证据/钥匙/资源/禁物/系统道具/权柄载体/契约物/药物/工具/其他 |
| narrative_function | string[] | ✅ | 战斗/谈判/逃生/调查/证据/身份/传承/诅咒/伏笔/资源/关系/阵营 |
| current_holder | string | ✅ | 当前持有者；未知也要写明“未知”及原因 |
| current_location | string | ✅ | 当前地点或存放位置 |
| public_understanding | string | ✅ | 角色或世界中对它的公开认知 |
| true_function | string | ✅ | 系统层面的真实功能；如涉及秘密，必须绑定 FACT |
| usage_conditions | string[] | ✅ | 使用条件、权限、环境、触发方式 |
| cost_and_limits | string[] | ✅ | 使用代价、冷却、消耗、次数、风险和不能做到的事 |
| damage_consumption_rules | string[] | ✅ | 损坏、消耗、修复、封印、污染、遗失、转移规则 |
| origin_or_history | string | ✅ | 来源、历史或来历；核心真相写入 FACT |
| lifecycle_stage | enum | ✅ | 埋设/初现/接触/获得/误判/试用/代价显露/升级/损毁/转移/真相显露/回收/退场/传承 |
| first_appearance | string | ✅ | 首次出现章节或计划窗口 |
| reveal_window | string | ✅ | 功能、真相、代价或误导的显露窗口 |
| payoff_or_exit_window | string | ✅ | 回收、反转、转移、损毁、退场或传承窗口 |
| current_status | string | ✅ | 当前可用性、完整性、冷却、污染、封印、耗损等状态 |
| immutable_constraints | string[] | ✅ | 后续不得改写的硬限制 |
| related_characters | string[] | 否 | 关联角色ID |
| related_forces | string[] | 否 | 关联势力 |
| related_locations | string[] | 否 | 关联地点 |
| related_facts | string[] | 否 | 关联 `FACT-*` |
| related_loops | string[] | 否 | 关联 `LOOP-*` |
| related_relationships | string[] | 否 | 关联 `REL-*` |
| related_chapter_plans | string[] | 否 | 已引用该物品的章节计划 |
| state_change_log | ItemStateChange[] | 否 | 持有、位置、状态、功能显露和生命周期变更记录 |

## KeyItem 结构

```json
{
  "item_id": "ITEM-001",
  "name": "旧巡夜印",
  "type": "证据",
  "narrative_function": ["证据", "身份", "伏笔"],
  "current_holder": "CHAR-PROTAGONIST",
  "current_location": "LOC-OLD-CITY",
  "public_understanding": "一枚失效的巡夜司旧印",
  "true_function": "可证明十七年前巡夜司到过焚城现场，完整真相见 FACT-001",
  "usage_conditions": ["需要与旧城灰烬比对", "只有识得旧印纹路的人能判断年代"],
  "cost_and_limits": ["不能直接证明焚城原因", "公开过早会引来巡夜司封口"],
  "damage_consumption_rules": ["印面裂纹不可修复", "被水浸泡会丢失残留朱砂痕"],
  "origin_or_history": "十七年前巡夜司封城时遗落",
  "lifecycle_stage": "获得",
  "first_appearance": "Chapter 1",
  "reveal_window": "Arc 001 暗示，Arc 003 部分揭露",
  "payoff_or_exit_window": "Volume 002 公开作为证据",
  "current_status": "主角私藏，印面残损，可作为线索但非完整证据",
  "immutable_constraints": ["旧印不能直接证明主谋", "旧印不能突然拥有攻击能力"],
  "related_characters": ["CHAR-PROTAGONIST"],
  "related_forces": ["FORCE-NIGHTWATCH"],
  "related_locations": ["LOC-OLD-CITY"],
  "related_facts": ["FACT-001"],
  "related_loops": ["LOOP-001"],
  "related_relationships": [],
  "related_chapter_plans": ["ch-001"]
}
```

## ItemStateChange 结构

```json
{
  "chapter": 1,
  "change_type": "获得/使用/显露/误判/损坏/消耗/转移/封印/升级/回收/退场/传承",
  "from": "无",
  "to": "CHAR-PROTAGONIST 持有",
  "cause": "主角在旧城灰烬中拾得",
  "cost_or_consequence": "引出巡夜司追查风险",
  "related_plan": "ch-001"
}
```

## KeyItemPlan 结构

`chapter_plan.key_item_plan` 使用以下结构：

```json
{
  "involved_items": ["ITEM-001"],
  "state_before": "ITEM-001 由主角私藏，残损，可作为线索",
  "allowed_operations": ["展示", "误判", "转移", "损坏", "使用", "代价显露"],
  "operation_details": [
    {
      "item_id": "ITEM-001",
      "operation": "展示",
      "holder_change": "无",
      "location_change": "无",
      "status_change": "残留朱砂痕被看见",
      "cost_or_limit": "只能证明旧印存在，不能证明完整真相",
      "related_facts": ["FACT-001"],
      "related_loops": ["LOOP-001"]
    }
  ],
  "state_after": "主角仍持有，陆青禾部分注意到旧印异常",
  "downstream_impact": "后续 3-5 章引来巡夜司查问",
  "boundary_check": "无未建档关键物品、无临时新功能、无绕过代价或越过 Fact 显露窗口"
}
```

## 验证规则

1. `item_id` 必须唯一且稳定，不得复用或重命名。
2. 关键物品不能只写名称，必须写明当前持有者、位置、状态和生命周期阶段。
3. 物品的隐藏真相、来源真相或规则真相必须绑定 `FACT-*`。
4. 物品承担长期悬念、误导或未来回收时，必须绑定 `LOOP-*` 或明确未来答案。
5. chapter_plan 使用关键物品时，必须包含 `key_item_plan` 并引用已登记 `ITEM-*`。
6. Writer 不得使用 `key_item_plan` 未声明的物品功能解决核心矛盾。
7. State Manager 只能更新持有、位置、状态、生命周期、显露和关联章节；不得临场改写真实功能、代价限制或禁止改写项。
8. Reviewer 发现关键物品未登记、状态不连续、功能越界、代价缺失或突然出现时，必须按阻塞处理。
