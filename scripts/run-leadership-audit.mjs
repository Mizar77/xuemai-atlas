import { build } from "esbuild";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const result = await build({
  entryPoints: ["scripts/audit-leadership-networks.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});

const temporaryDirectory = await mkdtemp(join(tmpdir(), "xuemai-leadership-audit-"));
const bundlePath = join(temporaryDirectory, "audit.mjs");
try {
  await writeFile(bundlePath, result.outputFiles[0].text);
  await import(pathToFileURL(bundlePath).href);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
