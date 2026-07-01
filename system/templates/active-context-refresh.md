# Active Context Refresh Protocol

活跃上下文刷新协议。用于避免每次运行都全量读取巨大 `cast.md` 和 `facts.md`。

## 目标

生成或更新：

- `novels/{novel_id}/characters/cast-active.md`
- `novels/{novel_id}/canon/facts-active.md`
- `novels/{novel_id}/canon/items-active.md`

这三个文件是当前 Part / Volume / Arc 的轻量运行索引，不替代完整 `characters/cast.md`、`canon/facts.md` 和 `canon/items.md`。

## 触发条件

- 新小说初始化完成。
- Arc / Volume / Part 过渡完成。
- 新关键人物入场、复登、退场、长期休眠或关系线重大变化。
- Fact 显露窗口变化，或本 Arc 涉及的 Fact ID 发生增删。
- 关键物品持有、位置、状态、生命周期、回收/退场窗口变化，或本 Arc 涉及的 Item ID 发生增删。
- `cast.md`、`facts.md` 或 `items.md` 已明显膨胀，单章运行只需要当前 Arc 子集。

## 刷新规则

1. 从完整 `cast.md`、`facts.md` 和 `items.md` 抽取当前 Arc 必需条目。
2. 保留所有本章或后续 3-5 章会影响选择、冲突、关系线、事实显露、伏笔回收或资源边界的人物、事实和关键物品。
3. 对休眠人物、暂不触碰事实和暂不触碰关键物品写明最早可再次使用节点，防止误用。
4. 活跃文件只能摘要和索引，不得改写完整档案中的人物命运、真实事实、公开版本、关键物品真实功能、代价限制或禁止改写项。

## 使用规则

- Planner / Writer / Reviewer 正常优先读取 active 文件和 state。
- 当 active 文件无法覆盖本章涉及人物、事实或关键物品时，再读取完整 `cast.md` / `facts.md` / `items.md` 对应条目。
- 若本章需要使用 active 文件之外的关键人物、Fact 或 Item，必须先刷新 active 文件或回到内容补齐。

## 验证清单

- [ ] active 文件中的角色均能在 `cast.md` 找到完整档案。
- [ ] active 文件中的 Fact ID 均能在 `facts.md` 找到完整档案。
- [ ] active 文件中的 Item ID 均能在 `items.md` 找到完整档案。
- [ ] 本 Arc 章节概要、关系线节拍、事实显露节拍、关键物品生命周期节拍涉及的角色、Fact 和 Item 均已进入 active 文件。
- [ ] 休眠人物、暂不触碰事实和暂不触碰关键物品有明确禁止误用说明。
