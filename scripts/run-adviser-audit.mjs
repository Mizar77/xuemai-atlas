import { build } from "esbuild";

const result = await build({
  entryPoints: ["scripts/audit-adviser-coverage.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});

const source = result.outputFiles[0].text;
await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

