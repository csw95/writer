# State Archive Protocol

State 归档协议。用于控制 `state/current-state.md` 体积，避免超长篇运行中状态文件无限膨胀。

## 核心原则

- `state/current-state.md` 只保存当前运行所需的活跃窗口和全局索引。
- 已完成章节的详细摘要、场景因果链、资源变化、关系变化、事实显露和伏笔变化必须归档到 `state/archive/`。
- 归档不得丢失可恢复信息；当前 state 必须能通过归档索引定位历史状态。

## 目录结构

```text
novels/{novel_id}/state/
  current-state.md
  archive/
    index.md
    chapters-0001-0050.md
    chapters-0051-0100.md
    resolved-repairs.md
```

## 触发条件

任一条件满足时，State Manager 必须执行归档或设置 `pending_action: state_archive`：

- `recent_chapter_summaries` 超过最近 20 章。
- `scene_causal_chains` 超过最近 10 章。
- `repair_log` 中已解决且超出最近 20 章窗口的修复项超过 10 条。
- `current-state.md` 超过 80 KB。
- 一个 Arc 完成。
- 阶段审稿发现 state 中历史摘要过多，影响启动协议读取效率。

## current-state.md 保留内容

- 运行控制字段。
- 当前 Part / Volume / Arc / Chapter 进度。
- 最近 20 章摘要。
- 最近 10 章关键场景因果链。
- 当前时间线、地点、人物位置、主角状态、敌对势力状态。
- 活跃关系线、活跃事实显露状态、活跃伏笔摘要。
- 未解决冲突、质量风险、阻塞级或高风险 repair，以及最近 20 章内解决的 repair。
- 归档索引：最近归档章节、归档文件列表、历史查询入口。

## archive/index.md 格式

```markdown
# State Archive Index — {novel_id}

| 章节范围 | 文件 | 摘要 | 关键 Fact | 关键 LOOP | 关键 REL |
|----------|------|------|-----------|-----------|----------|
| Ch1-Ch50 | chapters-0001-0050.md | {阶段摘要} | FACT-001 | LOOP-001 | REL-MAIN-001 |
```

## 分片归档格式

每个归档分片建议覆盖 50 章；ultra_long 可按 Volume 或 Arc 边界归档。

```markdown
# State Archive — {novel_id} — Ch{A}-Ch{B}

## 阶段摘要

## 章节摘要

## 场景因果链

## 时间线与地点变化

## 人物 / 关系变化

## 战力 / 资源变化

## 敌对势力行动变化

## Fact 显露变化

## LOOP 伏笔变化

## 错误修复记录
```

## resolved-repairs.md 格式

```markdown
# Resolved Repairs — {novel_id}

| 问题ID | 发现章节 | 解决章节 | 类型 | 严重程度 | 修复方案 | 影响检查 |
|--------|----------|----------|------|----------|----------|----------|
```

## 验证清单

- [ ] 归档前后的 `last_completed_chapter`、`next_chapter_to_generate` 未改变。
- [ ] 当前 state 保留最近 20 章摘要和最近 10 章因果链。
- [ ] 归档文件包含被移出 current-state 的章节范围。
- [ ] 已解决且超出活跃窗口的 repair 已进入 `state/archive/resolved-repairs.md`。
- [ ] `archive/index.md` 能定位每个归档分片。
- [ ] 活跃 Fact / LOOP / REL 的当前状态仍在 current-state 中可见。
- [ ] 归档后 `run_lock` 已清除，或本次归档作为 pending_action 完成记录在 run 日志中。
