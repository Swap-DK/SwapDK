import { join } from "node:path";
import { build, serve } from "bun";
import tailwind from "bun-plugin-tailwind";

const projectRoot = import.meta.dir;

console.info("📦 Building frontend...");
const buildResult = await build({
  define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
  entrypoints: [join(projectRoot, "App.tsx")],
  external: [
    "libsodium-wrappers-sumo",
    "libsodium",
    "v8",
    "node:v8",
    "module",
    "node:module",
    "path",
    "node:path",
    "fs",
    "node:fs",
    "os",
    "jiti",
  ],
  minify: false,
  naming: "index.js",
  outdir: join(projectRoot, "../public"),
  plugins: [tailwind],
});

if (!buildResult.success) {
  console.error("❌ Build failed:", buildResult.logs);
}

const server = serve({
  development: process.env.NODE_ENV !== "production",

  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/public/")) {
      const filePath = join(projectRoot, "..", url.pathname);
      return new Response(Bun.file(filePath));
    }

    if (url.pathname === "/") {
      return new Response(Bun.file(join(projectRoot, "../pages/index.html")), {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (url.pathname === "/widget") {
      return new Response(Bun.file(join(projectRoot, "../pages/widget.html")), {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.info(`🚀 Server running at ${server.url}`);
