// F3 規則引擎驗證：node scripts/test-contract-rules.mjs
// 需要 Node 22.18 以上（內建 TypeScript 型別移除），不需要額外套件。
import { checkContractText } from "../lib/contract-rules.ts";
import { contractSamples } from "../data/contract-samples.ts";

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
process.exit(failed === 0 ? 0 : 1);
