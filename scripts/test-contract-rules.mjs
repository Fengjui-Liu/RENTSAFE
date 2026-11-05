// F3 規則引擎驗證：npm run test:contracts
// 先用專案既有的 TypeScript 編譯器輸出到系統暫存目錄，Node.js 20 即可執行。
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const compileDirectory = mkdtempSync(join(tmpdir(), "rentsafe-contract-test-"));
const require = createRequire(import.meta.url);

let checkContractText;
let contractSamples;

try {
  execFileSync(
    join(projectRoot, "node_modules", ".bin", "tsc"),
    [
      "lib/contract-rules.ts",
      "data/contract-samples.ts",
      "--outDir",
      compileDirectory,
      "--module",
      "commonjs",
      "--moduleResolution",
      "node",
      "--target",
      "ES2020",
      "--esModuleInterop",
      "--skipLibCheck",
    ],
    { cwd: projectRoot, stdio: "inherit" },
  );

  ({ checkContractText } = require(join(compileDirectory, "lib", "contract-rules.js")));
  ({ contractSamples } = require(join(compileDirectory, "data", "contract-samples.js")));
} catch (error) {
  rmSync(compileDirectory, { recursive: true, force: true });
  throw error;
}

const expected = {
  "text-common-risks": ["R1", "R13", "R6", "R11", "R15", "R16"],
  "text-invalid-clauses": ["R4", "R3", "R7", "R9", "R10", "R5", "R2", "R14"],
  "text-template-like": [],
};

let failed = 0;

for (const sample of contractSamples) {
  const result = checkContractText(sample.text);
  const actual = result.clauses.map((clause) => clause.ruleId);
  const want = expected[sample.id] ?? [];
  const pass = actual.length === want.length && actual.every((id, index) => id === want[index]);

  console.log(`\n## ${sample.title}（${pass ? "PASS" : "FAIL"}）`);
  console.log(`整體風險：${result.riskLevel ?? "無命中"}；命中 ${actual.length} 條；source=${result.source}`);
  for (const clause of result.clauses) {
    console.log(`- ${clause.ruleId} ${clause.label} [${clause.risk}]「${clause.original}」｜${clause.basis}`);
  }
  if (!pass) {
    failed += 1;
    console.log(`  預期：${want.join(", ") || "（無）"}`);
    console.log(`  實際：${actual.join(", ") || "（無）"}`);
  }
}

const empty = checkContractText("");
console.log(`\n## 空字串：命中 ${empty.clauses.length} 條，riskLevel=${empty.riskLevel}`);

console.log(failed === 0 ? "\n全部通過" : `\n${failed} 組未通過`);
rmSync(compileDirectory, { recursive: true, force: true });
process.exit(failed === 0 ? 0 : 1);
