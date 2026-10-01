import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const folders = ["html", "css", "js", "imagens"];

await Promise.all(
  folders.map(async (folder) => {
    const destination = resolve("public", folder);
    await rm(destination, { recursive: true, force: true });
    await mkdir(destination, { recursive: true });
    await cp(resolve(folder), destination, { recursive: true });
  }),
);