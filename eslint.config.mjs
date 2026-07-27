import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Playwright artefacts. They are gitignored, but they still exist ON DISK
    // and eslint lints the disk — so the pre-commit hook poisoned itself: its
    // own `npm test` step writes playwright-report/, and the NEXT commit's lint
    // step then drowned in generated HTML/JS nobody wrote. Measured 2026-07-27
    // on one unchanged tree: 1 warning before a test run, 140 errors and 2720
    // warnings after it.
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
