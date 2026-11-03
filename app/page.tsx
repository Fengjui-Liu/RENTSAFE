import Link from "next/link";
import { SourceTag } from "@/components/source-tag";
import { featureCards } from "@/data/mock-data";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="hero-panel overflow-hidden">
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8 animate-enter">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--primary)]/20 bg-[color:var(--primary)]/8 px-4 py-2 text-xs font-semibold tracking-[0.28em] text-[color:var(--primary-soft)]">
                <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--primary)] shadow-[0_0_18px_rgba(249,115,22,0.95)]" />
                AI 租屋風險查核
              </div>
              <h1 className="max-w-3xl font-serif text-5xl leading-tight text-[color:var(--text-primary)] sm:text-6xl">
                60 秒，
                <span className="title-glow">看清你要租的房子</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--text-secondary)]">
                整合地政謄本、實價登錄與 AI 技術，讓每個學生都能像專業人士一樣看房
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/check" className="button-primary justify-center">
                上傳截圖查核
              </Link>
              <Link href="/contract" className="button-secondary justify-center">
                上傳合約審查
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="metric-card">
                <p className="text-sm text-[color:var(--text-secondary)]">完成時間</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">60 秒內</p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-[color:var(--text-secondary)]">查核模組</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">3 大面向</p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-[color:var(--text-secondary)]">使用費用</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">免費</p>
              </div>
            </div>
          </div>

          <div className="relative animate-enter-delayed">
            <div className="absolute inset-0 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.24),transparent_58%)] blur-2xl" />
            <div className="scan-grid absolute inset-x-8 top-8 -z-10 h-64 rounded-[32px] opacity-60" />
            <div className="panel relative overflow-hidden p-6 lg:p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.8),transparent)]" />
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-[color:var(--text-secondary)]">物件健康分數</p>
                <div className="flex items-center gap-2">
                  <SourceTag source="mock" />
                  <span className="rounded-full bg-red-500/12 px-3 py-1 text-xs font-semibold text-red-300">
                    高風險
                  </span>
                </div>
              </div>
              <div className="mb-8 grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
                <div>
                  <p className="text-6xl font-semibold text-[color:var(--text-primary)]">63</p>
                  <p className="mt-2 text-sm text-[color:var(--text-secondary)]">台北市文山區學生套房樣本</p>
                </div>
                <div className="rounded-[28px] border border-[color:var(--primary)]/16 bg-[linear-gradient(180deg,rgba(249,115,22,0.14),rgba(255,255,255,0.03))] p-4">
                  <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
                    <span>風險分布</span>
                    <span>更新中</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs text-red-200">
                        <span>高風險項目</span>
                        <span>76%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div className="h-2 w-[76%] rounded-full bg-[linear-gradient(90deg,#ef4444,#f97316)]" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs text-amber-200">
                        <span>租金溢價</span>
                        <span>61%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div className="h-2 w-[61%] rounded-full bg-[linear-gradient(90deg,#eab308,#f97316)]" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs text-emerald-200">
                        <span>補貼資格</span>
                        <span>82%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div className="h-2 w-[82%] rounded-full bg-[linear-gradient(90deg,#22c55e,#84cc16)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-red-200">違建與樓層資訊不一致</p>
                    <span className="text-[11px] uppercase tracking-[0.28em] text-red-300">Danger</span>
                  </div>
                  <p className="text-sm leading-7 text-red-50/85">疑似頂樓加蓋違建</p>
                </div>
                <div className="rounded-2xl border border-amber-500/15 bg-amber-500/8 p-4 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-amber-200">租金高於區域中位數 11.1%</p>
                    <span className="text-[11px] uppercase tracking-[0.28em] text-amber-300">Warning</span>
                  </div>
                  <p className="text-sm leading-7 text-amber-50/85">高於區域中位數 11.1%</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/8 p-4 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-emerald-200">符合租金補貼基本條件</p>
                    <span className="text-[11px] uppercase tracking-[0.28em] text-emerald-300">Safe</span>
                  </div>
                  <p className="text-sm leading-7 text-emerald-50/85">符合基本申請條件，建議確認房東身份</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">核心功能</p>
            <h2 className="font-serif text-4xl text-[color:var(--text-primary)]">把租屋風險拆成可判斷的訊號</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-secondary)]">
            看房到簽約，一頁說清
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card, index) => (
            <Link key={card.title} href={card.href} className="feature-card group block p-6 transition hover:-translate-y-1">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--primary)]/12 text-lg font-semibold text-[color:var(--primary)]">
                0{index + 1}
              </div>
              <h3 className="font-serif text-2xl text-[color:var(--text-primary)]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{card.description}</p>
              <div className="mt-8 h-px bg-[linear-gradient(90deg,rgba(249,115,22,0.45),transparent)]" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
