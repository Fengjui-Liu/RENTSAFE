
import { CheckDemo } from "@/components/check-demo";

export default async function CheckPage({
  searchParams,
}: PageProps<"/check">) {
  // 讀取網址中的展示案例參數
  const { case: caseParam } = await searchParams;

  const initialCaseId =
    typeof caseParam === "string" ? caseParam : undefined;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      {/* 頁面標題 */}
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">
          物件查核
        </h1>

        <p className="max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          與同行政區、同建物類型的實價登錄租金中位數比較
        </p>
      </section>

      {/* 物件查核主功能：包含截圖上傳與手動輸入 */}
      <CheckDemo
        key={initialCaseId ?? "default"}
        initialCaseId={initialCaseId}
      />
    </div>
  );
}

