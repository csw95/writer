# 审阅工作流建议

## 设定审阅

适合发给审阅者的入口：

- `bible/premise.md`：书名、简介、卖点和类型承诺。
- `world/worldbuilding.md`：世界规则、能力代价、资源体系和禁止事项。
- `characters/cast.md`：主角、配角、敌对势力和关系线。
- `canon/facts.md`：幕后事实和禁止改写项。
- `open-loops/loops.md`：伏笔台账。

审阅者只需要打开页面，不需要理解仓库目录结构。

## 章节审阅

每章建议按这个顺序看：

1. `structure/chapter-plans/ch-xxx.md`
2. `chapters/ch-xxx.md`
3. `chapters/ch-xxx-review.md`
4. `state/current-state.md`
5. `open-loops/loops.md`

页面里同一章会提供正文、审阅和计划的互跳按钮；有正文和审阅文件时，可以使用并排审阅。

## 评论承接

这个站点不保存评论。推荐使用：

- GitHub Pull Request 行内评论。
- GitHub Issue 按章节或设定模块记录。
- 外部审阅者只给自然语言意见时，由维护者整理回 Issue。

不要直接让审阅者修改 `system/` 提示词文件。设定问题优先回到对应小说的 `novels/<novel_id>/` 文件内处理。

## 分享粒度

按审阅目标开分支：

```text
review/novel-001-setting
review/novel-001-ch-020
review/novel-001-arc-001
```

每个分支对应一个 Cloudflare Pages 预览链接。这样审阅者看到的是稳定快照，不会被后续写作运行中的状态更新干扰。

