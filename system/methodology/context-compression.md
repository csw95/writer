# Context Compression Methodology

上下文压缩用于 100+ / 500+ 章后的长线接力。目标是让每次运行读取“当前需要的事实”，而不是全量历史。

## 三层上下文

1. **Active Context**: 当前 Arc 必需内容。
   - `characters/cast-active.md`
   - `canon/facts-active.md`
   - `canon/items-active.md`
   - `state/current-state.md`

2. **Archive Index**: 历史定位入口。
   - `state/archive/index.md`
   - `runs/`
   - `structure/parts|volumes|arcs`

3. **Full Source**: 完整档案。
   - `characters/cast.md`
   - `canon/facts.md`
   - `canon/items.md`
   - `open-loops/loops.md`
   - 历史章节正文

## 运行读取策略

- 常规单章先读 Active Context。
- 本章涉及 active 之外的人物、Fact、Item、伏笔或历史事件时，再定向读取 Full Source 对应条目。
- 阶段审稿、过渡、修复任务可以读取更大范围，但必须写回压缩摘要。

## 压缩产物

每 50 章或每个 Arc 完成后，建议生成：

- 阶段摘要
- 关键状态变化
- Fact/ITEM/LOOP/REL 变化索引
- 未解决问题
- 下一阶段禁越界项

压缩摘要不得替代 canon/facts 的真实事实或 canon/items 的关键物品档案，也不得改写已完成章节。
