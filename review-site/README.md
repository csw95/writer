# 小说审阅站

这个目录是独立的 Cloudflare Pages 静态审阅站，不参与小说写作提示词、章节生成或状态更新流程。

## 边界

- 只读取仓库里的 `novels/` Markdown 文件。
- 只写入 `review-site/dist/` 构建产物。
- 不修改 `system/`、`novels/`、`tools/`、`AGENTS.md` 或任何写作提示词。
- 默认跳过 `novels/_template/`，避免把模板误当作可审阅小说。

## 本地预览

在仓库根目录运行：

```bash
node review-site/scripts/build-content.mjs
node review-site/scripts/serve.mjs
```

然后打开：

```text
http://127.0.0.1:8788
```

也可以进入本目录运行：

```bash
npm run build
npm run serve
```

## Cloudflare Pages

推荐在 Cloudflare Pages 里使用仓库根目录作为项目根目录：

```text
Framework preset: None
Build command: node review-site/scripts/build-content.mjs
Build output directory: review-site/dist
Root directory: 留空或仓库根目录
```

部署后，Cloudflare Pages 会把 `novels/` 当前内容构建成只读页面。每次推送分支或 Pull Request 都可以生成独立预览链接，适合把某一轮设定或章节发给外部审阅。

更详细步骤见 [Cloudflare Pages 部署说明](./docs/cloudflare-pages.md)。

## 环境变量

| 变量 | 默认值 | 用途 |
| --- | --- | --- |
| `REVIEW_SITE_CONTENT_ROOT` | `novels` | 指定要读取的内容根目录 |
| `REVIEW_SITE_INCLUDE_TEMPLATE` | 未开启 | 设为 `1` 时把 `novels/_template/` 也放进审阅站 |
| `REVIEW_SITE_REPO_ROOT` | `review-site/..` | 构建脚本定位仓库根目录 |

## 审阅方式

站点提供：

- 小说总览、章节数、审阅数、计划数和文件数。
- 按上架信息、世界设定、人物、事实库、结构、状态、伏笔、章节等分组浏览。
- 标题、路径、摘要和小标题搜索。
- 章节正文、章节审阅、章节计划互相跳转。
- 正文与审阅文件并排查看。
- Markdown 渲染视图和原文视图。
- 移动端审阅：手机宽度下使用目录抽屉、卡片式文件列表、触控按钮和上下堆叠的正文 / 审阅对照。

推荐审阅意见仍记录在 GitHub Issue 或 Pull Request 评论里。这个站点只负责展示和分享，不内置评论系统。
