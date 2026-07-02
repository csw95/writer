# State Archive Index — novel-004

> 最后更新: 2026-07-02

## 归档规则
- `state/current-state.md` 只保留最近 20 章章节摘要和最近 10 章场景因果链。
- 更早的章节摘要、因果链、时间地点变化、人物关系变化、战力资源变化、Fact 显露和 LOOP 变化写入本目录。
- 已解决且超出活跃窗口的修复项写入 `resolved-repairs.md`。

## 当前归档状态
- **last_archived_chapter**: 20（场景因果链早段）
- **archive_files**: [`chapters-0001-0050.md`]
- **current_state_size_limit**: 80KB
- **archive_trigger**: recent_chapter_summaries>20 或 scene_causal_chains>10 或 resolved repair 过多 或 current-state.md>80KB 或 Arc 完成

## 归档文件索引
| 文件 | 覆盖章节 | 内容类型 | 创建时间 | 备注 |
|------|----------|----------|----------|------|
| `chapters-0001-0050.md` | Ch1-Ch20（Ch15-Ch20 为早段场景因果链） | 场景因果链、阶段摘要、人物/关系、Fact/LOOP 变化 | 2026-07-01 | 因 scene_causal_chains 活跃窗口超过验证阈值而归档；Ch18 后追加 Ch15 早段场景链，Ch19 后追加 Ch15-Ch16 旧站外围 / 不能全说早段场景链，Ch20 后追加 Ch16-Ch17 友情追问早段场景链，Ch21 后追加 Ch17-Ch18 广播站普通入口早段场景链，Ch22 后追加 Ch18-Ch19 母带 / 竞赛钥匙早段场景链，Ch23 后追加 Ch19-Ch20 旧素材盒 / 旧纸登记早段场景链以维持活跃窗口 |
