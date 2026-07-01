#!/usr/bin/env node

import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const siteRoot = path.resolve(path.dirname(__filename), "..");
const root = path.resolve(process.argv[2] || path.join(siteRoot, "dist"));
const port = Number.parseInt(process.env.PORT || process.argv[3] || "8788", 10);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml"
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    const pathname = decodeURIComponent(url.pathname);
    const target = await resolveTarget(pathname);
    const data = await fs.readFile(target);
    response.writeHead(200, {
      "content-type": contentTypes[path.extname(target)] || "application/octet-stream",
      "cache-control": "no-store"
    });
    response.end(data);
  } catch (error) {
    const status = error.code === "ENOENT" ? 404 : 500;
    response.writeHead(status, { "content-type": "text/plain; charset=utf-8" });
    response.end(status === 404 ? "Not found" : String(error.stack || error));
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`[review-site] serving ${root}`);
  console.log(`[review-site] http://127.0.0.1:${port}`);
});

async function resolveTarget(pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const target = path.resolve(root, `.${cleanPath}`);
  if (!target.startsWith(root)) {
    const error = new Error("Forbidden");
    error.code = "EACCES";
    throw error;
  }

  const stat = await fs.stat(target);
  if (stat.isDirectory()) return path.join(target, "index.html");
  return target;
}

