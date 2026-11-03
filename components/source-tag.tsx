import { type DataSource } from "@/data/mock-data";

const sourceLabels = {
  mock: "示範資料",
  rules: "規則比對",
  real: "真實資料",
} satisfies Record<DataSource, string>;

export function SourceTag({ source }: { source: DataSource }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-[color:var(--text-muted)]">
      {sourceLabels[source]}
    </span>
  );
}
