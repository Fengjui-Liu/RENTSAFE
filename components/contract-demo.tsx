"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { AnalysisSteps } from "@/components/analysis-steps";
import { SourceTag } from "@/components/source-tag";
import { StatusBadge } from "@/components/status-badge";
import { DemoCasePicker } from "@/components/demo-case-picker";
import { contractDemoCases, findContractDemoCase } from "@/data/demo-cases";
import { contractLoadingSteps, mockContractResult } from "@/data/mock-data";
import { MAX_CONTRACT_TEXT_LENGTH, checkContractText, type ContractRulesResult } from "@/lib/contract-rules";

type DemoState = "idle" | "loading" | "done";

const highRiskCount = mockContractResult.clauses.filter((clause) => clause.risk === "high").length;
const mediumRiskCount = mockContractResult.clauses.filter((clause) => clause.risk === "medium").length;

export function ContractDemo({ initialCaseId }: { initialCaseId?: string }) {
  const initialCase = findContractDemoCase(initialCaseId);
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(initialCase?.id ?? null);
  const [uploadedName, setUploadedName] = useState(
    initialCase?.kind === "pdf" ? initialCase.fileName : mockContractResult.fileName,
  );
  const [contractText, setContractText] = useState(initialCase?.kind === "text" ? initialCase.text : "");
  const [textError, setTextError] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<ContractRulesResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const runAnalysis = () => {
    clearTimer();
    setDemoState("loading");

    timerRef.current = window.setTimeout(() => {
      startTransition(() => {
        setDemoState("done");
      });
    }, 2000);
  };

  const startAnalysis = () => {
    if (demoState === "loading") {
      return;
    }

    setTextResult(null);
    runAnalysis();
  };

  const runTextCheck = (text: string) => {
    if (!text.trim()) {
      setTextError("請先貼上合約文字");
      return;
    }

    if (text.length > MAX_CONTRACT_TEXT_LENGTH) {
      setTextError(`合約文字請在 ${MAX_CONTRACT_TEXT_LENGTH} 字以內`);
      return;
    }

    setTextError(null);
    setTextResult(checkContractText(text));
    runAnalysis();
  };

  const loadCase = (id: string) => {
    const demoCase = findContractDemoCase(id);
    if (!demoCase) {
      return;
    }

    setSelectedCaseId(demoCase.id);

    if (demoCase.kind === "text") {
      setContractText(demoCase.text);
      runTextCheck(demoCase.text);
      return;
    }

    setUploadedName(demoCase.fileName);
    setTextResult(null);
    runAnalysis();
  };

  const resetDemo = () => {
    clearTimer();
    setDemoState("idle");
    setSelectedCaseId(null);
    setUploadedName(mockContractResult.fileName);
    setContractText("");
    setTextError(null);
    setTextResult(null);
  };

  return (
    <>
      <DemoCasePicker cases={contractDemoCases} selectedId={selectedCaseId} onLoad={loadCase} onReset={resetDemo} />
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="panel p-6 sm:p-8">
          <div className="mb-6 space-y-3">
            <p className="eyebrow">合約輸入</p>
            <h2 className="font-serif text-3xl text-[color:var(--text-primary)]">上傳租賃契約 PDF</h2>
          </div>

          <label
            className={`flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed px-6 text-center transition ${
              isDragging
                ? "border-[color:var(--primary)]/70 bg-[linear-gradient(180deg,rgba(249,115,22,0.22),transparent)]"
                : "border-[color:var(--primary)]/35 bg-[linear-gradient(180deg,rgba(249,115,22,0.12),transparent)] hover:border-[color:var(--primary)]/60"
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
              PDF
            </span>
            <span className="text-lg font-semibold text-[color:var(--text-primary)]">拖曳或點擊模擬上傳合約</span>
            <span className="mt-2 text-sm text-[color:var(--text-secondary)]">支援 PDF 檔，將自動產生條款風險報告</span>
            <input
              type="file"
              accept="application/pdf"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setUploadedName(file.name);
                }
              }}
            />
          </label>

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-sm text-[color:var(--text-secondary)]">
            已選擇檔案：<span className="text-[color:var(--text-primary)]">{uploadedName}</span>
          </div>

          <button
            type="button"
            className="button-primary mt-5 w-full justify-center disabled:cursor-wait disabled:opacity-60"
            onClick={startAnalysis}
            disabled={demoState === "loading"}
          >
            {demoState === "loading" ? "審查中..." : demoState === "done" ? "重新審查" : "開始合約審查"}
          </button>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.36em] text-[color:var(--text-muted)]">或</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <label className="mt-6 block space-y-2">
            <span className="text-sm text-[color:var(--text-secondary)]">貼上合約文字（依住宅租賃契約書範本規則比對）</span>
            <textarea
              value={contractText}
              onChange={(event) => setContractText(event.target.value)}
              rows={8}
              placeholder="例如：承租人應繳納三個月押金…"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-7 text-[color:var(--text-primary)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--primary)]/40"
            />
          </label>
          {textError && <p className="mt-2 text-sm text-amber-300">{textError}</p>}

          <button
            type="button"
            className="button-secondary mt-4 w-full justify-center disabled:cursor-wait disabled:opacity-60"
            onClick={() => runTextCheck(contractText)}
            disabled={demoState === "loading"}
          >
            比對合約文字
          </button>
        </section>

        <section className="panel p-6 sm:p-8">
          {demoState === "idle" && (
            <div className="flex h-full min-h-96 flex-col justify-between">
              <div className="space-y-3">
                <p className="eyebrow">結果預覽</p>
                <h3 className="font-serif text-3xl text-[color:var(--text-primary)]">條款風險一眼看懂</h3>
                <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
                  報告會標示高、中、低風險條款，並補上原文、問題說明與簽約前建議。
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-red-500/15 bg-red-500/8 p-5">
                  <p className="text-sm text-red-200">高風險</p>
                  <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">{highRiskCount} 條</p>
                </div>
                <div className="rounded-3xl border border-amber-500/15 bg-amber-500/8 p-5">
                  <p className="text-sm text-amber-200">中風險</p>
                  <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">{mediumRiskCount} 條</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm text-[color:var(--text-secondary)]">分析時間</p>
                  <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">2 分 14 秒</p>
                </div>
              </div>
            </div>
          )}

          {demoState === "loading" && (
            <div className="space-y-6">
              <div>
                <p className="eyebrow">審查中</p>
                <h3 className="mt-3 font-serif text-3xl text-[color:var(--text-primary)]">AI 正在比對租賃契約風險</h3>
              </div>
              <AnalysisSteps steps={contractLoadingSteps} />
            </div>
          )}

          {demoState === "done" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">條款風險報告</p>
                  <h3 className="mt-3 font-serif text-2xl text-[color:var(--text-primary)]">
                    {textResult ? "貼上的合約文字" : mockContractResult.fileName}
                  </h3>
                  {textResult ? (
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                      命中 {textResult.clauses.length} 條規則；關鍵字比對可能誤判或漏判，請對照原文
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]">分析完成時間：{mockContractResult.analysisTime}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <SourceTag source={textResult ? textResult.source : mockContractResult.source} />
                  {textResult ? (
                    textResult.riskLevel && <StatusBadge kind="risk" value={textResult.riskLevel} />
                  ) : (
                    <StatusBadge kind="risk" value={mockContractResult.riskLevel} />
                  )}
                </div>
              </div>

              {textResult && textResult.clauses.length === 0 && (
                <div className="rounded-3xl border border-amber-500/15 bg-amber-500/8 p-5 text-sm leading-7 text-amber-100">
                  沒有命中任何規則。這不代表合約沒有問題：目前規則只涵蓋部分範本條款，其他條款請自行對照住宅租賃契約書範本。
                </div>
              )}

              <div className="space-y-4">
                {(textResult ? textResult.clauses : mockContractResult.clauses).map((clause, index) => (
                  <article key={`${clause.label}-${index}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <h4 className="text-lg font-semibold text-[color:var(--text-primary)]">{clause.label}</h4>
                      <StatusBadge kind="risk" value={clause.risk} />
                    </div>
                    <dl className="space-y-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                      <div>
                        <dt className="text-[color:var(--text-muted)]">原始條文</dt>
                        <dd className="text-[color:var(--text-primary)]">{clause.original}</dd>
                      </div>
                      <div>
                        <dt className="text-[color:var(--text-muted)]">風險說明</dt>
                        <dd>{clause.issue}</dd>
                      </div>
                      <div>
                        <dt className="text-[color:var(--text-muted)]">建議作法</dt>
                        <dd>{clause.suggestion}</dd>
                      </div>
                      <div>
                        <dt className="text-[color:var(--text-muted)]">範本依據</dt>
                        <dd>{clause.basis}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <h4 className="text-lg font-semibold text-[color:var(--text-primary)]">延伸資源</h4>
                <div className="mt-4 flex flex-wrap gap-3">
                  {mockContractResult.resources.map((resource) => (
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
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
