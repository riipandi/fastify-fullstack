#!/usr/bin/env node

const { build } = require("esbuild");
const postCssPlugin = require("esbuild-style-plugin");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const tailwindcss = require("tailwindcss");
const path = require("node:path");

build({
  entryPoints: ["src/**/*.ts"],
  outdir: "dist",
  platform: "node",
  target: "node20",
  format: "cjs",
  bundle: false,
  minify: false,
  loader: {
    ".ts": "ts",
  },
  tsconfig: path.resolve(__dirname, "tsconfig.json"),
}).catch((error) => {
  console.error(`Build error: ${error}`);
  process.exit(1);
});

build({
  entryPoints: ["src/assets/css/styles.css"],
  outdir: "public/assets",
  platform: "browser",
  target: "es2020",
  bundle: true,
  minify: true,
  plugins: [
    postCssPlugin({
      postcss: { plugins: [postcssImport, tailwindcss, autoprefixer] },
    }),
  ],
}).catch((error) => {
  console.error(`Build error: ${error}`);
  process.exit(1);
});
