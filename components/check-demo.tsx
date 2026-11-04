"use client";

import { useState } from "react";
import { DemoCasePicker } from "@/components/demo-case-picker";
import { SourceTag } from "@/components/source-tag";
import { StatusBadge } from "@/components/status-badge";
import { TrafficLight } from "@/components/traffic-light";
import { checkDemoCases, findCheckDemoCase } from "@/data/demo-cases";
import { mockCheckResult, mockHauntedDangerResult } from "@/data/mock-data";
import {
  DISTRICTS,
  RENTAL_TYPES,
  getRentBenchmark,
  type District,
  type RentalType,
  type RentBenchmarkResult,
} from "@/lib/rent-benchmark";

type CheckMode = "manual" | "demo";

const confirmationItems = [
  { title: "建物登記與違建", detail: "目前尚未自動查證。請要求出租人說明有無未登記增建、加建或違建，並填寫現況確認書第 1 項。" },
  { title: "隔間與出租型態", detail: "請現場核對格局與出租型態，並要求出租人填寫現況確認書第 2 項。" },
  { title: "凶宅風險提醒", detail: "沒有官方資料庫可證明是否曾發生非自然死亡；請要求出租人填寫現況確認書第 8 項，並自行查詢新聞或詢問管理員。" },
  { title: "租金補貼", detail: "資格請依主管機關公告確認；簽約時要留意，範本明載「承租人不得申請租金補貼」這類條款無效。" },
] as const;

function formatCurrency(value: number) {
  return `$${value.toLocaleString("zh-TW")}`;
}

function RentResult({ result }: { result: RentBenchmarkResult }) {
  if (result.kind === "unavailable") {
    return <div className="rounded-3xl border border-amber-500/20 bg-amber-500/8 p-5 text-sm leading-7 text-amber-100">目前沒有「{result.district}・{result.rentalType}」的可用樣本，因此不判定行情高低。你可以改選其他出租型態。</div>;
  }
  if (result.kind === "insufficient") {
    return (
      <div className="space-y-3 rounded-3xl border border-amber-500/20 bg-amber-500/8 p-5 text-sm leading-7 text-amber-100">
        <p>目前只有 {result.sampleSize} 筆有效樣本，少於最低門檻 10 筆，因此不提供中位數或行情判定。</p>
        <SourceTag source="real" period={result.period} sampleSize={result.sampleSize} />
      </div>
    );
  }

  const deviationText = result.deviation > 0 ? `高於中位數 ${result.deviation}%` : result.deviation < 0 ? `低於中位數 ${Math.abs(result.deviation)}%` : "與中位數相同";
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <TrafficLight status={result.status} />
          <div><h4 className="text-lg font-semibold text-[color:var(--text-primary)]">{result.label}</h4><p className="mt-1 text-sm text-[color:var(--text-secondary)]">{result.district}・{result.rentalType}</p></div>
        </div>
        <StatusBadge kind="status" value={result.status} overrideLabel={result.label} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="你的月租" value={formatCurrency(result.listedRent)} />
        <Metric label="區域中位數" value={formatCurrency(result.rent.median)} />
        <Metric label="主要行情區間" value={`${formatCurrency(result.rent.p25)}–${formatCurrency(result.rent.p75)}`} small />
        <Metric label="與中位數比較" value={deviationText} small />
      </div>
      <p className="text-sm leading-7 text-[color:var(--text-secondary)]">{result.detail}</p>
      <SourceTag source="real" period={result.period} sampleSize={result.sampleSize} />
      <details className="text-xs leading-6 text-[color:var(--text-muted)]"><summary className="cursor-pointer">查看統計方法</summary><p className="mt-2">{result.method}</p></details>
    </div>
  );
}

function Metric({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return <div className="rounded-2xl border border-white/8 bg-black/20 p-4"><p className="text-xs text-[color:var(--text-muted)]">{label}</p><p className={`mt-2 font-semibold text-[color:var(--text-primary)] ${small ? "text-lg" : "text-2xl"}`}>{value}</p></div>;
}

export function CheckDemo({ initialCaseId }: { initialCaseId?: string }) {
  const initialCase = findCheckDemoCase(initialCaseId);
  const [mode, setMode] = useState<CheckMode>(initialCase ? "demo" : "manual");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(initialCase?.id ?? null);
  const [district, setDistrict] = useState<District>(initialCase?.district ?? "文山區");
  const [rentalType, setRentalType] = useState<RentalType>(initialCase?.rentalType ?? "獨立套房");
  const [listedRent, setListedRent] = useState(initialCase ? String(initialCase.listedRent) : "");
  const [result, setResult] = useState<RentBenchmarkResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHauntedRecord, setShowHauntedRecord] = useState(initialCase?.showHauntedRecord ?? false);

  const runCheck = (nextDistrict = district, nextType = rentalType, nextRent = listedRent) => {
    const rent = Number(nextRent);
    if (!Number.isInteger(rent) || rent <= 0 || rent > 1_000_000) {
      setError("請輸入 1 至 1,000,000 元之間的整數月租");
      setResult(null);
      return;
    }
    setError(null);
    setResult(getRentBenchmark(nextDistrict, nextType, rent));
  };

  const submitManual = () => {
    setMode("manual"); setSelectedCaseId(null); setShowHauntedRecord(false); runCheck();
  };

  const loadCase = (id: string) => {
    const demoCase = findCheckDemoCase(id);
    if (!demoCase) return;
    const rent = String(demoCase.listedRent);
    setMode("demo"); setSelectedCaseId(id); setDistrict(demoCase.district); setRentalType(demoCase.rentalType);
    setListedRent(rent); setShowHauntedRecord(demoCase.showHauntedRecord); setError(null);
    setResult(getRentBenchmark(demoCase.district, demoCase.rentalType, demoCase.listedRent));
  };

  const reset = () => {
    setMode("manual"); setSelectedCaseId(null); setDistrict("文山區"); setRentalType("獨立套房");
    setListedRent(""); setResult(null); setError(null); setShowHauntedRecord(false);
  };

  const haunted = showHauntedRecord ? mockHauntedDangerResult.haunted : mockCheckResult.modules.haunted;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div className="space-y-6">
        <section className="panel p-6 sm:p-8">
          <div className="mb-6 space-y-3"><p className="eyebrow">真實行情查核</p><h2 className="font-serif text-3xl text-[color:var(--text-primary)]">輸入物件租屋條件</h2><p className="text-sm leading-7 text-[color:var(--text-secondary)]">目前支援臺北市。租金使用真實資料比較；建物與屋況資訊仍需另外確認。</p></div>
          <div className="space-y-5">
            <SelectField label="行政區" value={district} options={DISTRICTS} onChange={(value) => { setDistrict(value as District); setResult(null); }} />
            <SelectField label="出租型態" value={rentalType} options={RENTAL_TYPES} onChange={(value) => { setRentalType(value as RentalType); setResult(null); }} />
            <label className="block space-y-2"><span className="text-sm text-[color:var(--text-secondary)]">每月租金（元）</span><input inputMode="numeric" type="number" min="1" max="1000000" step="1" value={listedRent} onChange={(event) => { setListedRent(event.target.value); setResult(null); }} placeholder="例如 12000" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--primary)]/40" /></label>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <button type="button" className="button-primary w-full justify-center" onClick={submitManual}>查看真實租金行情</button>
          </div>
        </section>
        <DemoCasePicker cases={checkDemoCases} selectedId={selectedCaseId} onLoad={loadCase} onReset={reset} compact />
      </div>

      <section className="panel p-6 sm:p-8">
        {!result ? <EmptyResult /> : (
          <div className="space-y-7">
            <div><p className="eyebrow">{mode === "demo" ? "完整展示案例" : "真實行情結果"}</p><h3 className="mt-3 font-serif text-2xl text-[color:var(--text-primary)]">臺北市{result.district}・{result.rentalType}</h3>{mode === "demo" && <p className="mt-2 text-sm text-[color:var(--text-secondary)]">租金行情使用真實資料；下方建物與屋況內容為情境示範。</p>}</div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><h4 className="mb-4 text-lg font-semibold text-[color:var(--text-primary)]">租金合理性</h4><RentResult result={result} /></div>
            {mode === "manual" ? <ConfirmationList /> : <DemoModules haunted={haunted} showHauntedRecord={showHauntedRecord} />}
          </div>
        )}
      </section>
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="block space-y-2"><span className="text-sm text-[color:var(--text-secondary)]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--primary)]/40">{options.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>;
}

function EmptyResult() {
  return <div className="flex min-h-96 flex-col justify-between gap-8"><div className="space-y-3"><p className="eyebrow">結果預覽</p><h3 className="font-serif text-3xl text-[color:var(--text-primary)]">先看行情，再確認其他風險</h3><p className="text-sm leading-7 text-[color:var(--text-secondary)]">輸入三項條件後，會顯示真實月租分布、資料期間與樣本數；不會僅憑租金推論建物是否合法或整體是否安全。</p></div><div className="rounded-3xl border border-[color:var(--primary)]/20 bg-[color:var(--primary)]/8 p-5 text-sm leading-7 text-[color:var(--text-secondary)]">想快速了解完整流程，也可以載入左側展示案例。案例中的建物與屋況結果會清楚標示為示範資料。</div></div>;
}

function ConfirmationList() {
  return <div className="space-y-4"><div><h4 className="text-lg font-semibold text-[color:var(--text-primary)]">其他風險仍需確認</h4><p className="mt-1 text-sm text-[color:var(--text-secondary)]">以下不是自動查詢結果，也不納入租金行情判定。</p></div>{confirmationItems.map((item) => <article key={item.title} className="rounded-2xl border border-amber-500/15 bg-amber-500/8 p-4"><p className="font-medium text-amber-100">{item.title}・尚未自動查證</p><p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{item.detail}</p></article>)}</div>;
}

function DemoModules({ haunted, showHauntedRecord }: { haunted: typeof mockCheckResult.modules.haunted | typeof mockHauntedDangerResult.haunted; showHauntedRecord: boolean }) {
  return <div className="space-y-4"><div className="rounded-3xl border border-red-500/15 bg-red-500/8 p-5 text-sm leading-7 text-red-100">{showHauntedRecord ? mockHauntedDangerResult.summary : mockCheckResult.summary}</div><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h4 className="text-lg font-semibold text-[color:var(--text-primary)]">建物與隔間情境</h4><SourceTag source="mock" /></div><div className="space-y-3">{mockCheckResult.modules.legality.items.map((item) => <article key={item.label} className="rounded-2xl border border-white/8 bg-black/20 p-4"><p className="font-medium text-[color:var(--text-primary)]">{item.label}</p><p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{item.detail}</p></article>)}</div></div><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><div className="mb-3 flex flex-wrap items-center justify-between gap-3"><h4 className="text-lg font-semibold text-[color:var(--text-primary)]">{haunted.label}</h4><SourceTag source="mock" /></div><p className="text-sm leading-7 text-[color:var(--text-secondary)]">{haunted.detail}</p></div></div>;
}
