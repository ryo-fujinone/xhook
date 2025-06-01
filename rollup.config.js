import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { version } from "./package.json";

// const year = new Date().getFullYear();

const banner =
  `//XHook - v${version} (patched) - ` +
  "https://github.com/ryo-fujinone/xhook\n" +
  `//Jaime Pillora <dev@jpillora.com> - ` +
  `MIT Copyright 2023\n` +
  `//ryo-fujinone - MIT Copyright 2025`;

const baseIifeConfig = {
  banner,
  format: "iife",
  name: "xhook",
  sourcemap: true,
};

export default defineConfig({
  input: "src/main.js",
  output: [
    {
      ...baseIifeConfig,
      file: "dist/xhook.js",
    },
    {
      ...baseIifeConfig,
      file: "dist/xhook.min.js",
      plugins: [
        terser({
          format: {
            comments: /^(XHook|Jaime|ryo-fujinone)/,
          },
        }),
      ],
    },
    {
      dir: "lib",
      format: "cjs",
      exports: "auto",
    },
    {
      dir: "es",
      format: "esm",
    },
  ],
  plugins: [typescript()],
});
