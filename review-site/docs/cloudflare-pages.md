# Cloudflare Pages 部署说明

## 推荐配置

在 Cloudflare Dashboard 创建 Pages 项目，连接当前 GitHub 仓库。

构建配置：

```text
Framework preset: None
Root directory: 留空或仓库根目录
Build command: node review-site/scripts/build-content.mjs
Build output directory: review-site/dist
```

不要把项目根目录设置成 `novels/` 或 `system/`。审阅站应该保持在 `review-site/`，并从仓库根目录读取内容。

## 分支预览

建议把审阅工作流放在分支或 Pull Request 上：

```text
main
review/novel-001-ch-020
review/novel-001-arc-001
```

Cloudflare Pages 会为分支或 PR 生成预览地址。把预览地址发给审阅者即可，不需要把小说正文复制到外部文档。

## 访问控制

小说设定和未发布章节通常不应公开。可选方案：

- 仓库保持私有。
- Cloudflare Pages 项目不要绑定公开宣传域名。
- 需要外部审阅时，使用 Cloudflare Access 给 Pages 域名加登录保护。
- 临时审阅完成后，关闭对应预览分支或删除 Pages 部署。

如果不配置 Cloudflare Access，Pages 预览链接本质上是可访问链接。

详细配置见 [Cloudflare Access / Zero Trust 配置说明](./access-zero-trust.md)。

## 构建产物

构建脚本会生成：

```text
review-site/dist/
├── index.html
├── app.js
├── styles.css
├── content-index.json
└── content/
    └── novels/
        └── <novel_id>/
```

`content-index.json` 只保存文件元数据、摘要、小标题和路径；Markdown 正文会按原路径复制到 `dist/content/novels/`，页面按需加载。

## 不影响写作系统

审阅站不读取 `system/agents/` 作为运行提示词，也不会调用章节生成流程。它只是一个静态展示层。

需要改写小说、修复设定或生成章节时，仍按仓库根目录的 `AGENTS.md`、`system/templates/chapter-cycle.md` 和对应小说状态文件执行。
