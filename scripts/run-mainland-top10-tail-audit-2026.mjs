import { build } from "esbuild";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const result = await build({
  entryPoints: ["scripts/audit-mainland-top10-tail-decisions-2026.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const directory = await mkdtemp(join(tmpdir(), "xuemai-mainland-top10-audit-"));
const bundlePath = join(directory, "audit.mjs");
try {
  await writeFile(bundlePath, result.outputFiles[0].text);
  await import(pathToFileURL(bundlePath).href);
} finally {
  await rm(directory, { recursive: true, force: true });
}
