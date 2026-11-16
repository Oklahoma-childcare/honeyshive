import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const pages = ["", "our-hive", "age-groups", "the-day", "for-families", "contact"];

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page || "home", resolve(projectRoot, page, "index.html")])
      )
    }
  }
});
