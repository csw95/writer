const state = {
  index: null,
  novel: null,
  file: null,
  query: "",
  rawMode: false,
  compareMode: false,
  markdownCache: new Map()
};

const els = {
  generatedAt: document.querySelector("#generatedAt"),
  novelSelect: document.querySelector("#novelSelect"),
  searchInput: document.querySelector("#searchInput"),
  fileNav: document.querySelector("#fileNav"),
  pageTitle: document.querySelector("#pageTitle"),
  sectionLabel: document.querySelector("#sectionLabel"),
  topbarActions: document.querySelector("#topbarActions"),
  dashboard: document.querySelector("#dashboard"),
  reader: document.querySelector("#reader"),
  sidebar: document.querySelector("#sidebar"),
  sidebarClose: document.querySelector("#sidebarClose"),
  sidebarOverlay: document.querySelector("#sidebarOverlay"),
  menuButton: document.querySelector("#menuButton")
};

init();

async function init() {
  bindEvents();

  try {
    const response = await fetch("./content-index.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`content-index.json ${response.status}`);
    state.index = await response.json();
  } catch (error) {
    renderLoadError(error);
    return;
  }

  hydrateNovelSelect();
  routeFromHash();
  window.addEventListener("hashchange", routeFromHash);
}

function bindEvents() {
  els.novelSelect.addEventListener("change", () => {
    const novelId = els.novelSelect.value;
    location.hash = novelHash(novelId);
  });

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    renderNav();
    renderDashboard();
  });

  els.menuButton.addEventListener("click", () => {
    setSidebarOpen(!els.sidebar.classList.contains("is-open"));
  });

  els.sidebarClose.addEventListener("click", () => {
    setSidebarOpen(false);
  });

  els.sidebarOverlay.addEventListener("click", () => {
    setSidebarOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebarOpen(false);
  });

  els.fileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setSidebarOpen(false);
  });
}

function hydrateNovelSelect() {
  els.generatedAt.textContent = state.index.generatedAt
    ? `构建于 ${formatDateTime(state.index.generatedAt)}`
    : "未生成索引";
  els.novelSelect.innerHTML = state.index.novels
    .map((novel) => `<option value="${escapeAttr(novel.id)}">${escapeHtml(novel.title)}</option>`)
    .join("");
}

function routeFromHash() {
  const route = parseHash();
  const novels = state.index.novels;
  if (!novels.length) {
    state.novel = null;
    state.file = null;
    renderAll();
    return;
  }

  if (route.type === "file") {
    const file = findFile(route.repoPath);
    state.file = file;
    state.novel = file ? findNovel(file.novelId) : novels[0];
  } else {
    state.novel = findNovel(route.novelId) || novels[0];
    state.file = null;
  }

  if (state.novel) els.novelSelect.value = state.novel.id;
  state.compareMode = false;
  state.rawMode = false;
  setSidebarOpen(false);
  renderAll();
}

function parseHash() {
  const value = location.hash.replace(/^#\/?/, "");
  const [type, encoded] = value.split("/");

  if (type === "file" && encoded) {
    return { type: "file", repoPath: decodeURIComponent(encoded) };
  }
  if (type === "novel" && encoded) {
    return { type: "novel", novelId: decodeURIComponent(encoded) };
  }
  return { type: "novel", novelId: null };
}

function renderAll() {
  renderNav();
  if (state.file) {
    renderReader(state.file);
  } else {
    renderDashboard();
  }
}

function renderNav() {
  const novel = state.novel;
  if (!novel) {
    els.fileNav.innerHTML = `<div class="nav-empty">没有可审阅的小说内容。</div>`;
    return;
  }

  const filteredSections = getVisibleSections(novel);
  if (!filteredSections.length) {
    els.fileNav.innerHTML = `<div class="nav-empty">没有匹配的文件。</div>`;
    return;
  }

  els.fileNav.innerHTML = filteredSections
    .map((section) => {
      const files = section.files
        .map((file) => {
          const active = state.file?.repoPath === file.repoPath ? " is-active" : "";
          return `<a class="file-link${active}" href="${fileHash(file.repoPath)}">
            <span class="file-link-title">${escapeHtml(file.title)}</span>
            <span class="file-link-path">${escapeHtml(file.relativePath)}</span>
          </a>`;
        })
        .join("");
      return `<details class="file-group" open>
        <summary>${escapeHtml(section.title)} <span>${section.files.length}</span></summary>
        <div class="file-list">${files}</div>
      </details>`;
    })
    .join("");
}

function getVisibleSections(novel) {
  if (!state.query) return novel.sections;

  const tokens = state.query.toLowerCase().split(/\s+/).filter(Boolean);
  return novel.sections
    .map((section) => ({
      ...section,
      files: section.files.filter((file) => matchesTokens(file, tokens))
    }))
    .filter((section) => section.files.length);
}

function matchesTokens(file, tokens) {
  const haystack = [
    file.title,
    file.repoPath,
    file.relativePath,
    file.sectionTitle,
    file.excerpt,
    ...(file.headings || []).map((heading) => heading.text)
  ]
    .join(" ")
    .toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

function renderDashboard() {
  const novel = state.novel;
  state.file = null;
  els.dashboard.classList.remove("is-hidden");
  els.reader.classList.add("is-hidden");
  els.topbarActions.innerHTML = "";

  if (!novel) {
    els.pageTitle.textContent = "小说审阅站";
    els.sectionLabel.textContent = "未发现内容";
    els.dashboard.innerHTML = `<div class="empty-state">构建索引里没有小说。确认仓库根目录存在 novels/ 后重新构建。</div>`;
    return;
  }

  els.pageTitle.textContent = novel.title;
  els.sectionLabel.textContent = `${novel.id} / 总览`;

  const visibleFiles = flattenSections(getVisibleSections(novel));
  const pinnedRows = (state.query ? visibleFiles : novel.pinnedFiles)
    .slice(0, 12)
    .map((file) => fileRow(file))
    .join("");
  const recentRows = novel.recentFiles.slice(0, 10).map((file) => fileRow(file)).join("");

  els.dashboard.innerHTML = `
    <div class="stats-grid">
      ${statBox("章节", novel.stats.chapters)}
      ${statBox("审阅", novel.stats.reviews)}
      ${statBox("计划", novel.stats.plans)}
      ${statBox("文件", novel.stats.files)}
      ${statBox("估算字数", formatNumber(novel.stats.totalEstimatedWords))}
    </div>

    <section class="panel">
      <div class="panel-header">
        <h2>${state.query ? "搜索结果" : "重点入口"}</h2>
        <span class="badge is-accent">${state.query ? visibleFiles.length : novel.pinnedFiles.length} 项</span>
      </div>
      <div class="panel-body">
        ${tableList(pinnedRows || emptyRow("没有匹配的文件"))}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>最近变更</h2>
        <span class="badge">${formatDateTime(novel.stats.lastModifiedAt)}</span>
      </div>
      <div class="panel-body">
        ${tableList(recentRows)}
      </div>
    </section>
  `;
}

function renderReader(file) {
  els.dashboard.classList.add("is-hidden");
  els.reader.classList.remove("is-hidden");
  els.pageTitle.textContent = file.title;
  els.sectionLabel.textContent = `${file.novelId} / ${file.sectionTitle}`;
  els.topbarActions.innerHTML = `<button class="action-button" type="button" data-dashboard>返回总览</button>`;
  els.topbarActions.querySelector("[data-dashboard]").addEventListener("click", () => {
    location.hash = novelHash(file.novelId);
  });

  renderFileShell(file);
  loadAndRenderFile(file);
  setSidebarOpen(false);
}

function renderFileShell(file) {
  const canCompare = Boolean(file.related?.chapter && file.related?.review);
  const relatedLinks = [
    relatedButton("正文", file.related?.chapter, file.repoPath),
    relatedButton("审阅", file.related?.review, file.repoPath),
    relatedButton("计划", file.related?.plan, file.repoPath)
  ]
    .filter(Boolean)
    .join("");

  els.reader.innerHTML = `
    <div class="reader-toolbar">
      <div class="reader-meta">
        <span class="badge is-accent">${escapeHtml(file.sectionTitle)}</span>
        ${file.chapterNumber ? `<span class="badge">第 ${file.chapterNumber} 章</span>` : ""}
        <span class="badge">${formatNumber(file.metrics.estimatedWords)} 字</span>
        <span class="badge">${formatDateTime(file.modifiedAt)}</span>
      </div>
      <div class="reader-actions">
        ${relatedLinks}
        ${
          canCompare
            ? `<button class="action-button" type="button" data-action="compare">并排审阅</button>`
            : ""
        }
        <button class="action-button" type="button" data-action="raw">原文</button>
      </div>
    </div>
    <div id="documentHost" class="document">
      <div class="empty-state">加载中。</div>
    </div>
  `;

  els.reader.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.getAttribute("data-action");
      if (action === "raw") {
        state.rawMode = !state.rawMode;
        state.compareMode = false;
      }
      if (action === "compare") {
        state.compareMode = !state.compareMode;
        state.rawMode = false;
      }
      await loadAndRenderFile(file);
    });
  });
}

async function loadAndRenderFile(file) {
  const host = document.querySelector("#documentHost");
  if (!host) return;

  if (state.compareMode && file.related?.chapter && file.related?.review) {
    await renderCompare(host, file);
    return;
  }

  const markdown = await getMarkdown(file);
  host.className = "document";
  host.innerHTML = state.rawMode
    ? `<pre class="raw-source">${escapeHtml(markdown)}</pre>`
    : `<article class="markdown">${renderMarkdown(markdown)}</article>`;
}

async function renderCompare(host, file) {
  const chapter = findFile(file.related.chapter);
  const review = findFile(file.related.review);
  if (!chapter || !review) return;

  const [chapterMarkdown, reviewMarkdown] = await Promise.all([
    getMarkdown(chapter),
    getMarkdown(review)
  ]);

  host.className = "compare-grid";
  host.innerHTML = `
    <section class="compare-pane">
      <div class="compare-header">${escapeHtml(chapter.title)}</div>
      <div class="compare-body markdown">${renderMarkdown(chapterMarkdown)}</div>
    </section>
    <section class="compare-pane">
      <div class="compare-header">${escapeHtml(review.title)}</div>
      <div class="compare-body markdown">${renderMarkdown(reviewMarkdown)}</div>
    </section>
  `;
}

async function getMarkdown(file) {
  if (state.markdownCache.has(file.repoPath)) {
    return state.markdownCache.get(file.repoPath);
  }
  const response = await fetch(file.url, { cache: "no-cache" });
  if (!response.ok) throw new Error(`${file.repoPath} ${response.status}`);
  const markdown = await response.text();
  state.markdownCache.set(file.repoPath, markdown);
  return markdown;
}

function relatedButton(label, repoPath, currentPath) {
  if (!repoPath || repoPath === currentPath) return "";
  const file = findFile(repoPath);
  if (!file) return "";
  return `<a class="action-button" href="${fileHash(repoPath)}">${escapeHtml(label)}</a>`;
}

function statBox(label, value) {
  return `<div class="stat">
    <div class="stat-value">${escapeHtml(String(value))}</div>
    <div class="stat-label">${escapeHtml(label)}</div>
  </div>`;
}

function tableList(rows) {
  return `<table class="table-list">
    <thead>
      <tr>
        <th>文件</th>
        <th>类别</th>
        <th>摘要</th>
        <th>更新</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function fileRow(file) {
  return `<tr>
    <td data-label="文件">
      <a href="${fileHash(file.repoPath)}">${escapeHtml(file.title)}</a>
      <div class="muted">${escapeHtml(file.relativePath)}</div>
    </td>
    <td data-label="类别"><span class="badge">${escapeHtml(file.sectionTitle)}</span></td>
    <td data-label="摘要" class="muted"><span class="cell-text">${escapeHtml(file.excerpt || "无摘要")}</span></td>
    <td data-label="更新" class="muted">${formatDateTime(file.modifiedAt)}</td>
  </tr>`;
}

function emptyRow(text) {
  return `<tr><td colspan="4" data-label="提示" class="muted">${escapeHtml(text)}</td></tr>`;
}

function setSidebarOpen(open) {
  els.sidebar.classList.toggle("is-open", open);
  els.sidebarOverlay.classList.toggle("is-open", open);
  document.body.classList.toggle("sidebar-open", open);
  els.menuButton.setAttribute("aria-expanded", String(open));
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (/^```/.test(line.trim())) {
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = cleanupHeading(heading[2]);
      html.push(`<h${level} id="${slugify(text)}">${renderInline(text)}</h${level}>`);
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      const tableLines = [];
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        tableLines.push(lines[index]);
        index += 1;
      }
      html.push(renderTable(tableLines));
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote>${quote.map((item) => `<p>${renderInline(item)}</p>`).join("")}</blockquote>`);
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*+]\s+/, ""));
        index += 1;
      }
      html.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ""));
        index += 1;
      }
      html.push(`<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ol>`);
      continue;
    }

    const paragraph = [];
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines, index)) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return html.join("\n");
}

function isBlockStart(lines, index) {
  const line = lines[index];
  return (
    /^```/.test(line.trim()) ||
    /^(#{1,6})\s+/.test(line) ||
    /^\s*>\s?/.test(line) ||
    /^\s*[-*+]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    isTableStart(lines, index)
  );
}

function isTableStart(lines, index) {
  const line = lines[index] || "";
  const next = lines[index + 1] || "";
  return line.includes("|") && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(next);
}

function renderTable(lines) {
  const rows = lines
    .filter((line, index) => index !== 1)
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim())
    );

  const [head = [], ...body] = rows;
  return `<table>
    <thead><tr>${head.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead>
    <tbody>${body
      .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`)
      .join("")}</tbody>
  </table>`;
}

function renderInline(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+|#[^)]+)\)/g,
    (_match, label, url) =>
      `<a href="${escapeAttr(url)}" target="_blank" rel="noreferrer">${label}</a>`
  );
  return html;
}

function renderLoadError(error) {
  els.generatedAt.textContent = "未构建";
  els.pageTitle.textContent = "无法加载审阅站";
  els.sectionLabel.textContent = "构建索引缺失";
  els.topbarActions.innerHTML = "";
  els.fileNav.innerHTML = `<div class="nav-empty">请先运行构建命令。</div>`;
  els.dashboard.innerHTML = `<div class="empty-state">
    没有找到 content-index.json。请在仓库根目录运行：
    <pre class="raw-source">node review-site/scripts/build-content.mjs
node review-site/scripts/serve.mjs</pre>
    <div class="muted">${escapeHtml(error.message)}</div>
  </div>`;
  els.reader.classList.add("is-hidden");
}

function flattenSections(sections) {
  return sections.flatMap((section) => section.files);
}

function findNovel(novelId) {
  return state.index.novels.find((novel) => novel.id === novelId);
}

function findFile(repoPath) {
  for (const novel of state.index.novels) {
    const file = novel.files.find((item) => item.repoPath === repoPath);
    if (file) return file;
  }
  return null;
}

function novelHash(novelId) {
  return `#/novel/${encodeURIComponent(novelId)}`;
}

function fileHash(repoPath) {
  return `#/file/${encodeURIComponent(repoPath)}`;
}

function formatDateTime(value) {
  if (!value) return "无记录";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value || 0);
}

function cleanupHeading(value) {
  return value.replace(/[*_`#]/g, "").trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
