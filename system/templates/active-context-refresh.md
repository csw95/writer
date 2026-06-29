# Active Context Refresh Protocol

活跃上下文刷新协议。用于避免每次运行都全量读取巨大 `cast.md` 和 `facts.md`。

## 目标

生成或更新：

- `novels/{novel_id}/characters/cast-active.md`
- `novels/{novel_id}/canon/facts-active.md`

这两个文件是当前 Part / Volume / Arc 的轻量运行索引，不替代完整 `characters/cast.md` 和 `canon/facts.md`。

## 触发条件

- 新小说初始化完成。
- Arc / Volume / Part 过渡完成。
- 新关键人物入场、复登、退场、长期休眠或关系线重大变化。
- Fact 显露窗口变化，或本 Arc 涉及的 Fact ID 发生增删。
- `cast.md` 或 `facts.md` 已明显膨胀，单章运行只需要当前 Arc 子集。

## 刷新规则

1. 从完整 `cast.md` 和 `facts.md` 抽取当前 Arc 必需条目。
2. 保留所有本章或后续 3-5 章会影响选择、冲突、关系线、事实显露、伏笔回收的人物和事实。
3. 对休眠人物、暂不触碰事实写明最早可再次使用节点，防止误用。
4. 活跃文件只能摘要和索引，不得改写完整档案中的人物命运、真实事实、公开版本或禁止改写项。

## 使用规则

- Planner / Writer / Reviewer 正常优先读取 active 文件和 state。
- 当 active 文件无法覆盖本章涉及人物或事实时，再读取完整 `cast.md` / `facts.md` 对应条目。
- 若本章需要使用 active 文件之外的关键人物或 Fact，必须先刷新 active 文件或回到内容补齐。

## 验证清单

- [ ] active 文件中的角色均能在 `cast.md` 找到完整档案。
- [ ] active 文件中的 Fact ID 均能在 `facts.md` 找到完整档案。
- [ ] 本 Arc 章节概要、关系线节拍、事实显露节拍涉及的角色和 Fact 均已进入 active 文件。
- [ ] 休眠人物和暂不触碰事实有明确禁止误用说明。
