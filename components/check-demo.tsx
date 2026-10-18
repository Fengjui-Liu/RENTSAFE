"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { AnalysisSteps } from "@/components/analysis-steps";
import { StatusBadge } from "@/components/status-badge";
import { TrafficLight } from "@/components/traffic-light";
import { mockCheckResult, propertyLoadingSteps } from "@/data/mock-data";

type DemoState = "idle" | "loading" | "done";

export function CheckDemo() {
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const [link, setLink] = useState("");
  const [uploadedName, setUploadedName] = useState("591_租屋截圖.png");
  const [isDragging, setIsDragging] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const startAnalysis = () => {
    if (demoState === "loading") {
      return;
    }

    setDemoState("loading");

    timerRef.current = window.setTimeout(() => {
      startTransition(() => {
        setDemoState("done");
      });
    }, 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="panel p-6 sm:p-8">
        <div className="mb-6 space-y-3">
          <p className="eyebrow">物件資料輸入</p>
          <h2 className="font-serif text-3xl text-[color:var(--text-primary)]">上傳租屋截圖或貼上 591 連結</h2>
        </div>

        <div className="space-y-5">
          <label
            className={`flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed px-6 text-center transition ${
              isDragging
                ? "border-[color:var(--primary)]/70 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.24),transparent_60%)]"
                : "border-[color:var(--primary)]/35 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.16),transparent_60%)] hover:border-[color:var(--primary)]/60"
            }`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              const file = event.dataTransfer.files?.[0];
              if (file) {
                setUploadedName(file.name);
              }
            }}
          >
            <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--primary)]/12 text-3xl text-[color:var(--primary)]">
              ⤴
            </span>
            <span className="text-lg font-semibold text-[color:var(--text-primary)]">拖曳上傳 591 / FB 租屋截圖</span>
            <span className="mt-2 text-sm text-[color:var(--text-secondary)]">或點擊模擬選擇圖片檔</span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setUploadedName(file.name);
                }
              }}
            />
          </label>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-sm text-[color:var(--text-secondary)]">
            已選擇檔案：<span className="text-[color:var(--text-primary)]">{uploadedName}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.36em] text-[color:var(--text-muted)]">或</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <label className="space-y-2">
            <span className="text-sm text-[color:var(--text-secondary)]">輸入 591 物件連結</span>
            <input
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="https://rent.591.com.tw/home/..."
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-[color:var(--text-primary)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--primary)]/40"
            />
          </label>

          <button
            type="button"
            className="button-primary w-full justify-center disabled:cursor-wait disabled:opacity-60"
            onClick={startAnalysis}
            disabled={demoState === "loading"}
          >
            {demoState === "loading" ? "分析中..." : demoState === "done" ? "重新查核" : "開始物件查核"}
          </button>
        </div>
      </section>

      <section className="panel p-6 sm:p-8">
        {demoState === "idle" && (
          <div className="flex h-full min-h-96 flex-col justify-between">
            <div className="space-y-3">
              <p className="eyebrow">結果預覽</p>
              <h3 className="font-serif text-3xl text-[color:var(--text-primary)]">讓風險先被看見</h3>
              <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
                系統會彙整建物合法性、租金合理性與補貼條件，輸出一張健康報告。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-red-500/15 bg-red-500/8 p-5">
                <p className="text-sm text-red-200">高風險警示</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">2 項</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-[color:var(--text-secondary)]">平均分析時間</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">58 秒</p>
              </div>
            </div>
          </div>
        )}

        {demoState === "loading" && (
          <div className="space-y-6">
            <div>
              <p className="eyebrow">分析中</p>
              <h3 className="mt-3 font-serif text-3xl text-[color:var(--text-primary)]">AI 正在產生物件體檢報告</h3>
            </div>
            <AnalysisSteps steps={propertyLoadingSteps} />
          </div>
        )}

        {demoState === "done" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">體檢報告</p>
                <h3 className="mt-3 font-serif text-2xl text-[color:var(--text-primary)]">{mockCheckResult.address}</h3>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">分析完成時間：{mockCheckResult.analysisTime}</p>
              </div>
              <StatusBadge kind="status" value="danger" overrideLabel="建議放棄" />
            </div>

            <div className="rounded-3xl border border-red-500/15 bg-red-500/8 p-5 text-sm leading-7 text-red-100">
              {mockCheckResult.summary}
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h4 className="text-lg font-semibold text-[color:var(--text-primary)]">建案合法性</h4>
                  <StatusBadge kind="status" value={mockCheckResult.modules.legality.status} />
                </div>
                <div className="space-y-3">
                  {mockCheckResult.modules.legality.items.map((item) => (
                    <article key={item.label} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <TrafficLight status={item.status} />
                          <p className="font-medium text-[color:var(--text-primary)]">{item.label}</p>
                        </div>
                        <StatusBadge kind="status" value={item.status} />
                      </div>
                      <p className="text-sm leading-7 text-[color:var(--text-secondary)]">{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <TrafficLight status={mockCheckResult.modules.pricing.status} />
                    <h4 className="text-lg font-semibold text-[color:var(--text-primary)]">租金合理性</h4>
                  </div>
                  <StatusBadge
                    kind="status"
                    value={mockCheckResult.modules.pricing.status}
                    overrideLabel={mockCheckResult.modules.pricing.level}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-[color:var(--text-muted)]">區域中位數</p>
                    <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                      ${mockCheckResult.modules.pricing.marketMedian.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-[color:var(--text-muted)]">刊登租金</p>
                    <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                      ${mockCheckResult.modules.pricing.listedPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-[color:var(--text-muted)]">行情偏差</p>
                    <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                      {mockCheckResult.modules.pricing.deviation}%
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
                  {mockCheckResult.modules.pricing.detail}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
