// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const academicFolders = ["html", "css", "js", "imagens"];

function academicDeliverablePlugin() {
  return {
    name: "academic-deliverable",
    apply: "build" as const,
    async writeBundle(options: { dir?: string }) {
      if (!options.dir?.endsWith("/client")) return;
      const output = resolve(options.dir);
      await mkdir(output, { recursive: true });
      await Promise.all(
        academicFolders.map((folder) =>
          cp(resolve(folder), resolve(output, folder), { recursive: true }),
        ),
      );
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [academicDeliverablePlugin()],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
