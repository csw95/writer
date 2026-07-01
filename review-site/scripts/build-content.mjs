#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const siteRoot = path.resolve(path.dirname(__filename), "..");
const repoRoot = process.env.REVIEW_SITE_REPO_ROOT
  ? path.resolve(process.cwd(), process.env.REVIEW_SITE_REPO_ROOT)
  : path.resolve(siteRoot, "..");
const sourceRoot = path.join(siteRoot, "src");
const distRoot = path.join(siteRoot, "dist");
const contentRoot = resolveFromRepo(process.env.REVIEW_SITE_CONTENT_ROOT || "novels");
const contentRootName = normalizePath(path.relative(repoRoot, contentRoot)) || "novels";
const includeTemplate = process.env.REVIEW_SITE_INCLUDE_TEMPLATE === "1";
const collator = new Intl.Collator("zh-Hans-CN", {
  numeric: true,
  sensitivity: "base"
});

const sectionRules = [
  { key: "bible", title: "上架与卖点", prefix: "bible/" },
  { key: "world", title: "世界设定", prefix: "world/" },
  { key: "characters-active", title: "活跃人物", prefix: "characters/cast-active.md" },
  { key: "characters", title: "人物设定", prefix: "characters/" },
  { key: "canon-active", title: "活跃事实", prefix: "canon/facts-active.md" },
  { key: "canon", title: "事实库", prefix: "canon/" },
  { key: "structure-parts", title: "Part 规划", prefix: "structure/parts/" },
  { key: "structure-volumes", title: "Volume 规划", prefix: "structure/volumes/" },
  { key: "structure-arcs", title: "Arc 规划", prefix: "structure/arcs/" },
  { key: "chapter-plans", title: "章节计划", prefix: "structure/chapter-plans/" },
  { key: "structure", title: "长线结构", prefix: "structure/" },
  { key: "state-current", title: "当前状态", prefix: "state/current-state.md" },
  { key: "state-archive", title: "状态归档", prefix: "state/archive/" },
  { key: "state", title: "状态文件", prefix: "state/" },
  { key: "open-loops", title: "伏笔台账", prefix: "open-loops/" },
  { key: "chapters", title: "正文与审阅", prefix: "chapters/" },
  { key: "runs", title: "运行记录", prefix: "runs/" }
];

async function main() {
  await resetDist();
  await copyDir(sourceRoot, distRoot);

  const contentExists = await exists(contentRoot);
  const novels = contentExists ? await buildNovels() : [];
  const index = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    repoRoot: path.basename(repoRoot),
    contentRoot: contentRootName,
    includeTemplate,
    totals: summarizeTotals(novels),
    novels
  };

  await fs.writeFile(
    path.join(distRoot, "content-index.json"),
    `${JSON.stringify(index, null, 2)}\n`,
    "utf8"
  );

  if (!contentExists) {
    console.warn(`[review-site] content root not found: ${contentRoot}`);
  }
  console.log(`[review-site] built ${novels.length} novel(s) into ${distRoot}`);
}

function resolveFromRepo(value) {
  return path.isAbsolute(value) ? value : path.resolve(repoRoot, value);
}

async function resetDist() {
  await fs.rm(distRoot, { recursive: true, force: true });
  await fs.mkdir(distRoot, { recursive: true });
}

async function copyDir(source, target) {
  const entries = await fs.readdir(source, { withFileTypes: true });
  await fs.mkdir(target, { recursive: true });

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDir(sourcePath, targetPath);
    } else if (entry.isFile()) {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

async function buildNovels() {
  const entries = await fs.readdir(contentRoot, { withFileTypes: true });
  const novelDirs = entries
    .filter((entry) => entry.isDirectory())
    .filter((entry) => includeTemplate || entry.name !== "_template")
    .map((entry) => entry.name)
    .sort((a, b) => collator.compare(a, b));

  const novels = [];
  for (const novelId of novelDirs) {
    novels.push(await buildNovel(novelId));
  }
  return novels;
}

async function buildNovel(novelId) {
  const novelRoot = path.join(contentRoot, novelId);
  const mdFiles = await walkMarkdown(novelRoot);
  const files = [];

  for (const relativeToNovel of mdFiles) {
    const absolutePath = path.join(novelRoot, relativeToNovel);
    const repoRelative = normalizePath(path.relative(repoRoot, absolutePath));
    const outputPath = path.join(distRoot, "content", repoRelative);
    const markdown = await fs.readFile(absolutePath, "utf8");
    const stat = await fs.stat(absolutePath);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.copyFile(absolutePath, outputPath);

    const section = classifySection(relativeToNovel);
    files.push({
      novelId,
      repoPath: repoRelative,
      url: encodeContentUrl(repoRelative),
      relativePath: normalizePath(relativeToNovel),
      filename: path.basename(relativeToNovel),
      sectionKey: section.key,
      sectionTitle: section.title,
      title: extractTitle(markdown, relativeToNovel),
      chapterNumber: extractChapterNumber(relativeToNovel),
      isReview: /(^|\/)ch-\d+-review\.md$/i.test(relativeToNovel),
      byteSize: stat.size,
      modifiedAt: stat.mtime.toISOString(),
      metrics: measureMarkdown(markdown),
      headings: extractHeadings(markdown),
      excerpt: extractExcerpt(markdown)
    });
  }

  files.sort(compareFiles);
  const fileMap = new Map(files.map((file) => [file.repoPath, file]));
  for (const file of files) {
    file.related = findRelatedFiles(file, files, fileMap);
  }

  const grouped = groupSections(files);
  const premise = files.find((file) => file.relativePath === "bible/premise.md");
  const title = premise
    ? extractNovelTitle(await readCopiedMarkdown(premise.repoPath), novelId)
    : novelId;

  return {
    id: novelId,
    title,
    stats: summarizeNovel(files),
    sections: grouped,
    pinnedFiles: pickPinnedFiles(files),
    recentFiles: [...files]
      .sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt))
      .slice(0, 12),
    files
  };
}

async function readCopiedMarkdown(repoPath) {
  return fs.readFile(path.join(distRoot, "content", repoPath), "utf8");
}

async function walkMarkdown(root, base = root) {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const result = [];

  for (const entry of entries.sort((a, b) => collator.compare(a.name, b.name))) {
    if (entry.name.startsWith(".")) continue;
    const absolutePath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      result.push(...(await walkMarkdown(absolutePath, base)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      result.push(normalizePath(path.relative(base, absolutePath)));
    }
  }

  return result;
}

function classifySection(relativeToNovel) {
  const normalized = normalizePath(relativeToNovel);
  return (
    sectionRules.find((rule) => normalized.startsWith(rule.prefix)) || {
      key: "other",
      title: "其他文件"
    }
  );
}

function extractTitle(markdown, relativePath) {
  const filename = path.basename(relativePath, ".md");
  const listedTitle = extractListedTitle(markdown);
  if (relativePath === "bible/premise.md" && listedTitle) return listedTitle;

  const heading = markdown.match(/^#\s+(.+)$/m);
  if (heading) return cleanupInline(heading[1]);

  if (listedTitle) return listedTitle;

  const chapterNumber = extractChapterNumber(relativePath);
  if (chapterNumber && /-review\.md$/i.test(relativePath)) {
    return `第${chapterNumber}章审阅`;
  }
  if (chapterNumber) return `第${chapterNumber}章`;

  return filename.replace(/[-_]/g, " ");
}

function extractNovelTitle(markdown, fallback) {
  const listedTitle = extractListedTitle(markdown);
  if (listedTitle) return listedTitle;
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading ? cleanupInline(heading[1]) : fallback;
}

function extractListedTitle(markdown) {
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(
      /(?:^|\s|[-*])(?:\*\*)?\s*(?:上架书名|书名|标题)\s*(?:\*\*)?\s*[：:]\s*(.+)$/
    );
    if (match) return cleanupInline(match[1]);
  }
  return null;
}

function cleanupInline(value) {
  return value
    .replace(/[*_`#>\[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function extractChapterNumber(relativePath) {
  const match = relativePath.match(/(?:^|\/)ch-(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

function measureMarkdown(markdown) {
  const cjk = markdown.match(/[\u3400-\u9fff]/g)?.length || 0;
  const latinWords = markdown.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length || 0;
  const lineCount = markdown.split(/\r?\n/).length;
  const headingCount = markdown.match(/^#{1,6}\s+/gm)?.length || 0;

  return {
    cjkChars: cjk,
    latinWords,
    lineCount,
    headingCount,
    estimatedWords: cjk + latinWords
  };
}

function extractHeadings(markdown) {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^(#{1,4})\s+(.+)$/))
    .filter(Boolean)
    .slice(0, 24)
    .map((match) => ({
      level: match[1].length,
      text: cleanupInline(match[2])
    }));
}

function extractExcerpt(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/[*_`>\[\]#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 260);
}

function compareFiles(a, b) {
  const sectionOrderA = sectionRules.findIndex((rule) => rule.key === a.sectionKey);
  const sectionOrderB = sectionRules.findIndex((rule) => rule.key === b.sectionKey);
  if (sectionOrderA !== sectionOrderB) return sectionOrderA - sectionOrderB;
  return collator.compare(a.relativePath, b.relativePath);
}

function groupSections(files) {
  const sections = [];
  for (const file of files) {
    let section = sections.find((item) => item.key === file.sectionKey);
    if (!section) {
      section = { key: file.sectionKey, title: file.sectionTitle, files: [] };
      sections.push(section);
    }
    section.files.push(file);
  }
  return sections;
}

function summarizeNovel(files) {
  return {
    files: files.length,
    chapters: files.filter((file) => file.sectionKey === "chapters" && !file.isReview).length,
    reviews: files.filter((file) => file.isReview).length,
    plans: files.filter((file) => file.sectionKey === "chapter-plans").length,
    facts: files.filter((file) => file.sectionKey.startsWith("canon")).length,
    loops: files.filter((file) => file.sectionKey === "open-loops").length,
    totalEstimatedWords: files.reduce((sum, file) => sum + file.metrics.estimatedWords, 0),
    lastModifiedAt: files.reduce(
      (latest, file) =>
        !latest || new Date(file.modifiedAt) > new Date(latest) ? file.modifiedAt : latest,
      null
    )
  };
}

function summarizeTotals(novels) {
  return novels.reduce(
    (totals, novel) => ({
      novels: totals.novels + 1,
      files: totals.files + novel.stats.files,
      chapters: totals.chapters + novel.stats.chapters,
      reviews: totals.reviews + novel.stats.reviews,
      plans: totals.plans + novel.stats.plans
    }),
    { novels: 0, files: 0, chapters: 0, reviews: 0, plans: 0 }
  );
}

function pickPinnedFiles(files) {
  const knownPaths = [
    "bible/premise.md",
    "state/current-state.md",
    "characters/cast-active.md",
    "canon/facts-active.md",
    "open-loops/loops.md",
    "structure/long-term-arc.md"
  ];

  const pinned = knownPaths
    .map((relativePath) => files.find((file) => file.relativePath === relativePath))
    .filter(Boolean);

  const latestChapter = [...files]
    .filter((file) => file.sectionKey === "chapters" && !file.isReview)
    .sort((a, b) => (b.chapterNumber || 0) - (a.chapterNumber || 0))[0];
  const latestReview = [...files]
    .filter((file) => file.isReview)
    .sort((a, b) => (b.chapterNumber || 0) - (a.chapterNumber || 0))[0];

  for (const file of [latestChapter, latestReview]) {
    if (file && !pinned.some((item) => item.repoPath === file.repoPath)) {
      pinned.push(file);
    }
  }
  return pinned.slice(0, 8);
}

function findRelatedFiles(file, files) {
  const chapterNumber = file.chapterNumber;
  if (!chapterNumber) return {};

  const chapter = files.find(
    (item) => item.relativePath === `chapters/ch-${String(chapterNumber).padStart(3, "0")}.md`
  );
  const review = files.find(
    (item) =>
      item.relativePath === `chapters/ch-${String(chapterNumber).padStart(3, "0")}-review.md`
  );
  const plan = files.find(
    (item) =>
      item.relativePath ===
      `structure/chapter-plans/ch-${String(chapterNumber).padStart(3, "0")}.md`
  );

  return {
    chapter: chapter?.repoPath,
    review: review?.repoPath,
    plan: plan?.repoPath
  };
}

function encodeContentUrl(repoRelative) {
  return `./content/${repoRelative
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
