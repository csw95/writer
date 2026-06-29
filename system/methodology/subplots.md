# Subplot Methodology

子情节用于扩展主线压力、关系、证据和主题，不得成为无限支线。

## 子情节状态

每条子情节必须有稳定 ID：

```text
SUBPLOT-001
```

状态枚举：

- planned: 已计划，未启动
- active: 正在推进
- dormant: 休眠，但后续有计划节点
- converging: 正在并回主线
- resolved: 已闭环
- abandoned_with_reason: 已废弃且有解释

## 必填字段

| 字段 | 说明 |
|------|------|
| subplot_id | 稳定 ID |
| title | 子情节名称 |
| mainline_service | 服务主线、人物、关系、事实、伏笔或主题的方式 |
| start_chapter | 启动章节 |
| planned_turning_points | 关键节点 |
| convergence_window | 并回主线窗口 |
| owner_characters | 主要承载人物 |
| related_facts_loops | 关联 Fact / LOOP |
| current_state | 当前状态 |

## 管理规则

- active 子情节必须在 3-5 章内有推进、休眠或并回主线的标记。
- dormant 子情节必须写明下一计划节点，不能在正文中突然恢复。
- resolved 子情节必须同步 state、open-loops 和相关人物状态。
- 连续新增子情节但不回收时，stage_review_5ch 必须标记“支线发散风险”。
