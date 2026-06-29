# Canon Fact Schema

事实库的强制数据结构。所有暗线事实、历史关键事实、身份秘密和能力真相必须用稳定 `FACT-*` 标识追踪。

## 字段定义

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| fact_id | string | ✅ | 稳定事实ID，格式 `FACT-001` |
| title | string | ✅ | 事实名称 |
| type | enum | ✅ | 历史事件/暗线真相/身份秘密/能力规则/阵营事实/人物过去/物品真相/制度规则 |
| true_fact | string | ✅ | 作者和系统层面的真实事实 |
| public_version | string | ✅ | 世界中流传的公开版本、误解、谎言或残缺认知 |
| knowledge_state.full | string[] | ✅ | 完整知情的角色或势力 |
| knowledge_state.partial | string[] | ✅ | 只知道部分真相的角色或势力 |
| knowledge_state.misled | string[] | ✅ | 被误导的角色或势力 |
| knowledge_state.unaware | string[] | ✅ | 完全不知情的关键角色或势力 |
| impact_scope | string[] | ✅ | 影响的人物选择、阵营关系、能力规则、伏笔或章节冲突 |
| first_hint | string | ✅ | 计划首次暗示章节或阶段 |
| reveal_window | string | ✅ | 计划部分揭露或公开揭露窗口 |
| current_reveal_state | enum | ✅ | 未显露/已暗示/误导中/部分揭露/公开揭露/已反转 |
| immutable_constraints | string[] | ✅ | 后续不得改写的硬事实 |
| related_characters | string[] | 否 | 关联角色ID |
| related_forces_locations_items | string[] | 否 | 关联势力、地点或物品 |
| related_loops | string[] | 否 | 关联 `LOOP-*` |
| related_chapter_plans | string[] | 否 | 已引用该事实的章节计划 |
| revision_log | Revision[] | 否 | 核心事实修订记录 |

## CanonFact 结构

```json
{
  "fact_id": "FACT-001",
  "title": "十七年前城火真相",
  "type": "历史事件",
  "true_fact": "城火由巡夜司主动点燃，用于封锁异化源头。",
  "public_version": "城火是山火失控造成的天灾。",
  "knowledge_state": {
    "full": ["FORCE-NIGHTWATCH"],
    "partial": ["CHAR-PROTAGONIST"],
    "misled": ["城中幸存者"],
    "unaware": ["普通民众"]
  },
  "impact_scope": ["主角复仇目标", "巡夜司阵营信任线", "LOOP-001回收"],
  "first_hint": "Chapter 1 旧城灰烬异常不散",
  "reveal_window": "Arc 003 部分揭露，Volume 002 公开揭露",
  "current_reveal_state": "未显露",
  "immutable_constraints": ["城火不是天灾", "巡夜司参与焚城"],
  "related_characters": ["CHAR-PROTAGONIST"],
  "related_forces_locations_items": ["FORCE-NIGHTWATCH", "LOC-OLD-CITY"],
  "related_loops": ["LOOP-001"],
  "related_chapter_plans": []
}
```

## Revision 结构

```json
{
  "changed_at": "2026-06-29",
  "changed_after_chapter": 12,
  "reason": "补充事实细节，不改写核心因果",
  "impact_check": "不影响已完成章节，只影响后续揭露方式"
}
```

## 验证规则

1. `fact_id` 必须唯一且稳定，不得复用或重命名。
2. `true_fact` 必须具体到可验证，不能只写“另有隐情”。
3. `public_version` 必须说明读者或世界中角色当前可能相信什么。
4. 影响主角选择、阵营站位、历史因果、能力代价、身份秘密或伏笔回收的事实必须登记。
5. chapter_plan 使用暗线、旧案、身份秘密、能力真相或历史关键事件时，必须引用对应 `fact_id`。
6. `current_reveal_state` 只能根据已生成正文增量推进，不得提前标记公开揭露。
7. State Manager 只能更新知情状态、显露状态、关联章节和修订日志；不得无审批改写 `true_fact` 或 `immutable_constraints`。
8. Reviewer 发现正文违背 `true_fact`、让角色知道未显露事实、或公开超过 `reveal_window` 允许的信息时，必须判为阻塞。
