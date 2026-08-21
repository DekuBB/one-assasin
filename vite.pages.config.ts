import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: "pages",
  base: process.env.GITHUB_ACTIONS ? "/one-assasin/" : "/",
  resolve: {
    alias: { "@": resolve(projectRoot, "src") },
  },
  plugins: [tailwindcss(), viteReact()],
  build: {
    outDir: "../dist-pages",
    emptyOutDir: true,
  },
});