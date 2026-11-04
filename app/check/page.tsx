import { CheckDemo } from "@/components/check-demo";

export default async function CheckPage({ searchParams }: PageProps<"/check">) {
  const { case: caseParam } = await searchParams;
  const initialCaseId = typeof caseParam === "string" ? caseParam : undefined;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="space-y-4">
        <p className="eyebrow">物件查核</p>
        <h1 className="font-serif text-5xl leading-tight text-[color:var(--text-primary)]">輸入租屋條件，查看臺北市真實行情</h1>
        <p className="max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          對照內政部實價登錄租賃資料，了解同區同類型物件的月租分布與樣本數。
        </p>
      </section>

      <CheckDemo key={initialCaseId ?? "default"} initialCaseId={initialCaseId} />
    </div>
  );
}
