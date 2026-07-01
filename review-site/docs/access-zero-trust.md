# Cloudflare Access / Zero Trust 配置说明

本文用于保护小说审阅站，目标是让外部审阅者可以安全打开页面，同时避免未发布正文、设定库和伏笔台账被公开访问。

## 推荐结论

默认推荐：

```text
Cloudflare Pages 自定义域名
+ Cloudflare Access Self-hosted application
+ One-time PIN 邮箱验证码
+ 审阅者邮箱白名单
```

不推荐把 `*.pages.dev` 预览链接当作安全机制。预览链接适合分享快照，但只要没有 Access 或其他认证层，拿到链接的人就可以访问。

## 方案对比

| 方案 | 适用场景 | 优点 | 风险 / 限制 |
| --- | --- | --- | --- |
| Access + One-time PIN | 常规外部审阅 | 无需审阅者注册账号；按邮箱授权；有访问日志 | 需要审阅者能收邮件 |
| Access + Temporary authentication | 临时审阅、临时批准 | 可审批，最长 24 小时临时访问 | 不是魔法链接；需要管理员批准 |
| Pages Functions 共享密码 | 不想收集审阅者邮箱 | 体验像普通密码门 | 共享密码泄露后要整体轮换；无个人审计 |
| Pages Functions / Worker 有效期链接 | 需要可转发限时链接 | 可以做到 `?token=...` 形式 | 需要额外实现 token、过期和撤销逻辑 |

Cloudflare Access 原生更偏身份访问控制，不是传统共享密码系统。想要“一个密码所有人输入”的体验，需要在 Pages Functions 或 Worker 里额外做门禁。

## 前提

需要准备：

- Cloudflare Pages 项目已经能部署 `review-site/dist`。
- 域名已经接入 Cloudflare，例如 `yourdomain.com`。
- Pages 绑定自定义域名，例如 `review.yourdomain.com`。
- GitHub 仓库建议保持私有。

如果没有自定义域名，也可以先只用 Pages 预览部署的 Access policy，但这更适合 PR / 分支预览，不适合作为长期生产审阅入口。

## Pages 自定义域名

在 Cloudflare Dashboard：

```text
Workers & Pages
→ 选择审阅站 Pages 项目
→ Custom domains
→ Set up a custom domain
```

建议域名：

```text
review.yourdomain.com
```

等待状态变成 Active 后，再配置 Access 应用。

## 启用 One-time PIN

在 Cloudflare Zero Trust：

```text
Settings
→ Authentication
→ Login methods / Identity providers
→ Add new
→ One-time PIN
```

启用后，用户访问受保护页面时会输入邮箱，Cloudflare 发送一次性验证码。只有符合 Access policy 的邮箱能通过。

官方文档：

- https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/

## 创建 Access 应用

在 Cloudflare Zero Trust：

```text
Access
→ Applications
→ Add an application
→ Self-hosted
```

基础配置：

```text
Application name: Writer Review Site
Session duration: 24 hours 或 7 days
Application domain: review.yourdomain.com
Path: /*
```

建议一开始用 `24 hours`。如果审阅者稳定可信，再改为 `7 days`，减少重复登录。

## 推荐 Policy 配置

Policy 按顺序配置。更具体、更高信任的策略放前面。

### Policy 1: Owner

```text
Policy name: Owner
Action: Allow
Include:
  Emails:
    your-email@example.com
```

用途：你自己长期访问，不受临时审批影响。

### Policy 2: Reviewers

```text
Policy name: Reviewers OTP
Action: Allow
Include:
  Emails:
    reviewer-a@example.com
    reviewer-b@example.com
Identity providers:
  One-time PIN
```

用途：固定审阅者。每个审阅者用自己的邮箱收验证码。

不建议：

```text
Include: Everyone
Action: Allow
```

这会让任何人都能进入，只要完成登录流程。

### Policy 3: Temporary reviewers

适合临时审阅者、陌生审稿人或只给 1 天权限的人。

```text
Policy name: Temporary Review Access
Action: Allow
Include:
  Emails:
    temp-reviewer@example.com
Additional settings:
  Purpose justification: On
  Temporary authentication: On
Approvers:
  your-email@example.com
Duration:
  24 hours 或更短
```

用户访问时会提交访问理由。你批准后，他才能在有效期内访问。

官方文档：

- https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/

## Preview deployments

如果你使用分支或 Pull Request 预览：

```text
review/novel-001-ch-020
review/novel-001-arc-001
```

可以在 Pages 项目里给 preview deployments 开 Access policy。注意这个能力主要保护预览部署，不等同于保护长期生产域名。长期入口仍建议使用：

```text
review.yourdomain.com
+ Access Self-hosted application
```

官方文档：

- https://developers.cloudflare.com/pages/configuration/preview-deployments/

## 测试流程

建议用无痕窗口测试。

1. 打开：

```text
https://review.yourdomain.com
```

2. 输入允许列表里的邮箱。
3. 收到 One-time PIN 后登录。
4. 确认能看到小说审阅站。
5. 再用一个未授权邮箱测试，应被拒绝。

退出登录可访问：

```text
https://review.yourdomain.com/cdn-cgi/access/logout
```

## 权限维护

新增审阅者：

```text
Access
→ Applications
→ Writer Review Site
→ Policies
→ Reviewers OTP
→ Add email
```

移除审阅者：

```text
Access
→ Applications
→ Writer Review Site
→ Policies
→ Reviewers OTP
→ Remove email
```

如果担心已登录 session 继续有效，先把 session duration 调短，例如 `1 hour`，再移除该邮箱。高敏感内容建议每轮审阅创建独立分支和独立预览链接，审阅结束后删除分支。

## 共享密码方案

如果你确实想要“输入一个密码就能看”，不要把密码写进前端 JS，也不要提交到 Git。

推荐实现方式：

```text
Cloudflare Pages Functions
→ 读取环境变量 REVIEW_SITE_PASSWORD_HASH
→ 校验表单密码
→ 写入 HttpOnly + Secure + SameSite Cookie
→ 已有 Cookie 才允许访问静态内容
```

优点：

- 审阅者不需要邮箱。
- 可以像普通网站密码一样分享。
- 密码可在 Cloudflare 环境变量中轮换。

缺点：

- 多人共用同一个密码，没有个人身份审计。
- 密码泄露后必须整体换密码。
- 需要额外实现登录页和中间件。

## 有效期链接方案

如果你想发这种链接：

```text
https://review.yourdomain.com/?token=abc123
```

推荐实现方式：

```text
Cloudflare Pages Functions 或 Worker
→ token 存在 KV / D1 / 环境变量
→ token 有 expires_at
→ 首次访问成功后写入短期 Cookie
→ token 过期或撤销后不可再用
```

优点：

- 分享体验最好。
- 可以按人、按章节、按时间生成链接。

缺点：

- 比 OTP 和共享密码复杂。
- 要维护 token 生成、过期、撤销和日志。

## 本项目建议配置

当前小说审阅站建议先用：

```text
review.yourdomain.com
+ Access Self-hosted application
+ One-time PIN
+ Reviewers OTP 邮箱白名单
+ Session duration: 24 hours
```

等常规审阅流程稳定后，再按需要加：

```text
Temporary authentication
```

只有当审阅者明显不适合邮箱验证时，再实现：

```text
Pages Functions 共享密码门禁
```

