import { ContractDemo } from "@/components/contract-demo";
import { mockContractResult } from "@/data/mock-data";

// 延伸資源：範本 p22 的兩個機構，加上崔媽媽基金會（網址待團隊確認仍有效）
const resources = [
  ...mockContractResult.resources,
  { name: "崔媽媽基金會", url: "https://www.tmm.org.tw" },
];

export default async function ContractPage({ searchParams }: PageProps<"/contract">) {
  const { case: caseParam } = await searchParams;
  const initialCaseId = typeof caseParam === "string" ? caseParam : undefined;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="space-y-4">
        <h1 className="font-serif text-5xl leading-tight text-[color:var(--text-primary)]">合約審查</h1>
        <p className="max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          依內政部住宅租賃契約書範本規則比對
        </p>
      </section>

      <ContractDemo key={initialCaseId ?? "default"} initialCaseId={initialCaseId} />

      <section className="panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">延伸資源</h2>
        <div className="flex flex-wrap gap-3">
          {resources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-[color:var(--text-secondary)] transition hover:border-[color:var(--primary)]/30 hover:text-[color:var(--text-primary)]"
            >
              {resource.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
