# State Archive Index — novel-004

> 最后更新: 2026-07-01

## 归档规则
- `state/current-state.md` 只保留最近 20 章章节摘要和最近 10 章场景因果链。
- 更早的章节摘要、因果链、时间地点变化、人物关系变化、战力资源变化、Fact 显露和 LOOP 变化写入本目录。
- 已解决且超出活跃窗口的修复项写入 `resolved-repairs.md`。

## 当前归档状态
- **last_archived_chapter**: 13
- **archive_files**: [`chapters-0001-0050.md`]
- **current_state_size_limit**: 80KB
- **archive_trigger**: recent_chapter_summaries>20 或 scene_causal_chains>10 或 resolved repair 过多 或 current-state.md>80KB 或 Arc 完成

## 归档文件索引
| 文件 | 覆盖章节 | 内容类型 | 创建时间 | 备注 |
|------|----------|----------|----------|------|
| `chapters-0001-0050.md` | Ch1-Ch13 | 场景因果链、阶段摘要、人物/关系、Fact/LOOP 变化 | 2026-07-01 | 因 scene_causal_chains 活跃窗口超过验证阈值而归档；Ch16 后追加 Ch13 场景链以维持活跃窗口 |
