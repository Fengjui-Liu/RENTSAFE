"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Component, useEffect, useState, useSyncExternalStore } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  getTourScenes,
  pressureScenario,
  tourHouse,
  tourProfiles,
  type TourHotspot,
  type TourProfileId,
  type TourScene,
} from "@/data/tour-data";

const TourViewingScene = dynamic(() => import("@/components/tour-viewing-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#b8d8e8]" aria-hidden="true" />,
});

const TourLandlordScene = dynamic(() => import("@/components/tour-landlord-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#d9b58f]" aria-hidden="true" />,
});

const TourSigningScene = dynamic(() => import("@/components/tour-signing-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#d7ad7d]" aria-hidden="true" />,
});

let webglSupportCache: boolean | null = null;

function detectWebGL() {
  if (webglSupportCache !== null) return webglSupportCache;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglSupportCache = gl !== null;
    // 釋放偵測用的 context，避免佔用瀏覽器的 WebGL context 配額
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupportCache = false;
  }
  return webglSupportCache;
}

const noopSubscribe = () => () => {};

function useWebGLSupport() {
  // 伺服器端與 hydration 前先假設支援，載入後在瀏覽器實際偵測
  return useSyncExternalStore(noopSubscribe, detectWebGL, () => true);
}

class SceneErrorBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function SceneIllustration({ sceneId, onContextLost }: { sceneId: TourScene["id"]; onContextLost: () => void }) {
  if (sceneId === "viewing") {
    return <TourViewingScene onContextLost={onContextLost} />;
  }

  if (sceneId === "landlord") {
    return <TourLandlordScene onContextLost={onContextLost} />;
  }

  return <TourSigningScene onContextLost={onContextLost} />;
}

type Guess = "yes" | "no" | "unsure" | "skip";

const guessOptions: { id: Exclude<Guess, "skip">; label: string }[] = [
  { id: "yes", label: "有問題" },
  { id: "no", label: "沒問題" },
  { id: "unsure", label: "不確定" },
];

// 不計分，回饋只描述「這個細節」本身
function guessFeedback(hotspot: TourHotspot, guess: Guess) {
  if (guess === "skip") return null;
  if (hotspot.kind === "risk") {
    return guess === "yes" ? "你有注意到這一點，現場照這樣問就好。" : "這個細節容易被忽略，現場記得問一下。";
  }
  return guess === "yes"
    ? "這裡其實是正常的。能分辨正常與可疑，也是看房的功課。"
    : "判斷沒錯，這裡看起來是正常的。";
}

function CopyButton({ text, label = "複製" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="rounded-full border border-white/15 px-3 py-1 text-xs text-[color:var(--text-secondary)] transition hover:bg-white/10 hover:text-white"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          setDone(false);
        }
      }}
    >
      {done ? "已複製" : label}
    </button>
  );
}

function HotspotDetail({
  hotspot,
  guess,
  onGuess,
}: {
  hotspot: TourHotspot;
  guess: Guess | undefined;
  onGuess: (guess: Guess) => void;
}) {
  if (!guess) {
    return (
      <div className="mt-3 space-y-3">
        <p className="text-sm leading-7 text-[color:var(--text-primary)]">先猜猜看：你覺得這裡有問題嗎？</p>
        <div className="flex flex-wrap gap-2">
          {guessOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onGuess(option.id)}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-[color:var(--text-primary)] transition hover:border-[color:var(--accent)]/50 hover:bg-[color:var(--accent)]/10"
            >
              {option.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onGuess("skip")}
            className="rounded-full px-3 py-1.5 text-xs text-[color:var(--text-muted)] underline-offset-2 hover:underline"
          >
            直接看答案
          </button>
        </div>
      </div>
    );
  }

  const feedback = guessFeedback(hotspot, guess);
  const isRisk = hotspot.kind === "risk";

  return (
    <div className="mt-3 space-y-3">
      {feedback ? <p className="text-xs text-[color:var(--accent)]">{feedback}</p> : null}
      <div>
        <p className="text-xs font-semibold text-[color:var(--text-muted)]">你看到的</p>
        <p className="mt-1 text-sm leading-7 text-[color:var(--text-primary)]">{hotspot.see}</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-[color:var(--text-muted)]">
          {isRisk ? "為什麼要注意" : "為什麼不用擔心"}
        </p>
        <p className="mt-1 text-sm leading-7 text-[color:var(--text-primary)]">{hotspot.attention}</p>
      </div>
      <div className="rounded-2xl border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/8 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-[color:var(--accent)]">現場怎麼問</p>
          <CopyButton text={hotspot.ask} />
        </div>
        <p className="mt-1 text-sm leading-7 text-[color:var(--text-primary)]">{hotspot.ask}</p>
        <p className="mt-2 text-xs leading-6 text-[color:var(--text-secondary)]">依據：{hotspot.basis}</p>
      </div>
    </div>
  );
}

function PressurePanel() {
  const [chosen, setChosen] = useState<string | null>(null);
  const option = pressureScenario.options.find((item) => item.id === chosen) ?? null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <p className="eyebrow text-xs">{pressureScenario.title}</p>
      <p className="mt-2 text-base font-semibold text-[color:var(--text-primary)]">{pressureScenario.line}</p>
      <p className="mt-1 text-xs text-[color:var(--text-muted)]">你會怎麼回？沒有標準答案，不計分。</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {pressureScenario.options.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={chosen === item.id}
            onClick={() => setChosen(item.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              chosen === item.id
                ? "border-[color:var(--accent)] bg-[color:var(--accent)]/15 text-[color:var(--text-primary)]"
                : "border-white/15 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>
      {option ? (
        <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold text-[color:var(--accent)]">{option.tone}</p>
          <p className="text-sm leading-7 text-[color:var(--text-primary)]">房東可能的反應：{option.reaction}</p>
          {option.script ? (
            <div className="flex items-start justify-between gap-3 rounded-xl bg-white/5 px-3 py-2">
              <p className="text-sm leading-7 text-[color:var(--text-primary)]">可以這樣說：{option.script}</p>
              <CopyButton text={option.script} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (const char of text) {
    if (ctx.measureText(line + char).width > maxWidth) {
      lines.push(line);
      line = char;
    } else {
      line += char;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function downloadChecklistImage(items: { where: string; ask: string }[]) {
  const width = 1080;
  const pad = 56;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const font = '"PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';

  ctx.font = `28px ${font}`;
  const blocks = items.map((item) => ({ where: item.where, lines: wrapText(ctx, item.ask, width - pad * 2 - 40) }));
  const height = 190 + blocks.reduce((sum, block) => sum + 44 + block.lines.length * 40 + 28, 0) + 70;

  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#121827";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#f8fafc";
  ctx.font = `bold 44px ${font}`;
  ctx.fillText("我的看房提問清單", pad, 88);
  ctx.fillStyle = "#94a3b8";
  ctx.font = `24px ${font}`;
  ctx.fillText("RentSafe 賃居守護・情境看房（示範房源）", pad, 130);

  let y = 190;
  for (const block of blocks) {
    ctx.fillStyle = "#fb923c";
    ctx.font = `bold 28px ${font}`;
    ctx.fillText(`☐ ${block.where}`, pad, y);
    y += 44;
    ctx.fillStyle = "#e2e8f0";
    ctx.font = `28px ${font}`;
    for (const line of block.lines) {
      ctx.fillText(line, pad + 40, y);
      y += 40;
    }
    y += 28;
  }
  ctx.fillStyle = "#64748b";
  ctx.font = `22px ${font}`;
  ctx.fillText("提問依據：內政部住宅租賃契約書範本附件一「租賃標的現況確認書」", pad, height - 30);

  const link = document.createElement("a");
  link.download = "我的看房提問清單.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function TourExperience() {
  const [profileId, setProfileId] = useState<TourProfileId>("rooftop");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [guesses, setGuesses] = useState<Record<string, Guess>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const webglSupported = useWebGLSupport();
  const listMode = !webglSupported || webglFailed;
  const switchToListMode = () => setWebglFailed(true);

  const scenes = getTourScenes(profileId);
  const profile = tourProfiles.find((item) => item.id === profileId) ?? tourProfiles[0];
  const hotspotCount = scenes.reduce((total, item) => total + item.hotspots.length, 0);
  // 回答（或選擇直接看答案）之後才算「已檢查」
  const visitedIds = Object.keys(guesses);

  const scene = scenes[sceneIndex];
  const activeHotspot = scene.hotspots.find((hotspot) => hotspot.id === activeHotspotId) ?? null;
  const isLastScene = sceneIndex === scenes.length - 1;
  const hasUnvisited = scene.hotspots.some((hotspot) => !visitedIds.includes(hotspot.id));

  // 閒置提示：5 秒沒操作，尚未檢查的標記微微閃動。以「操作簽章」比對，操作一變動提示就自動消失
  const activitySig = `${profileId}|${sceneIndex}|${activeHotspotId}|${visitedIds.length}|${showSummary}`;
  const [hintSig, setHintSig] = useState("");
  const hintOn = hintSig === activitySig && hasUnvisited && !showSummary;
  useEffect(() => {
    if (showSummary || !hasUnvisited) return;
    const timer = setTimeout(() => setHintSig(activitySig), 5000);
    return () => clearTimeout(timer);
  }, [activitySig, showSummary, hasUnvisited]);

  const openHotspot = (id: string) => setActiveHotspotId(id);
  const guess = (id: string, value: Guess) => setGuesses((current) => ({ ...current, [id]: value }));

  const goToScene = (index: number) => {
    setSceneIndex(index);
    setActiveHotspotId(null);
    setShowSummary(false);
  };

  const restart = () => {
    setSceneIndex(0);
    setActiveHotspotId(null);
    setGuesses({});
    setShowSummary(false);
  };

  const changeProfile = (id: TourProfileId) => {
    setProfileId(id);
    restart();
  };

  const checklist = scenes.flatMap((item) =>
    item.hotspots
      .filter((hotspot) => hotspot.kind === "risk" && visitedIds.includes(hotspot.id))
      .map((hotspot) => ({ where: `${item.title}・${hotspot.label}`, ask: hotspot.ask })),
  );
  const checklistText = checklist.map((item, index) => `${index + 1}. [${item.where}] ${item.ask}`).join("\n");

  return (
    <section className="panel p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-[color:var(--text-muted)]">
              情境示範・虛構房源
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--text-primary)]">{profile.title}</h2>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            {profileId === "rooftop" ? tourHouse.description : profile.note}
          </p>
        </div>
        <p className="rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/8 px-4 py-2 text-sm text-[color:var(--text-primary)]">
          已檢查 {visitedIds.length} / {hotspotCount} 項
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-[color:var(--text-muted)]">換一間房：</span>
        {tourProfiles.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={profileId === item.id}
            onClick={() => changeProfile(item.id)}
            className={`rounded-full border px-3 py-1.5 transition ${
              profileId === item.id
                ? "border-[color:var(--accent)]/50 bg-[color:var(--accent)]/8 text-[color:var(--text-primary)]"
                : "border-white/10 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="mb-6 inline-flex flex-wrap rounded-full border border-white/10 bg-black/30 p-1 text-sm">
        {scenes.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={!showSummary && sceneIndex === index}
            onClick={() => goToScene(index)}
            className={`rounded-full px-4 py-2 transition ${
              !showSummary && sceneIndex === index
                ? "bg-[color:var(--accent)] font-semibold text-[#1a1a1a]"
                : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {showSummary ? (
        <div className="space-y-6">
          <div className="rounded-3xl border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">我的看房提問清單</h3>
              {checklist.length > 0 ? (
                <div className="flex gap-2">
                  <CopyButton text={checklistText} label="複製清單" />
                  <button
                    type="button"
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-[color:var(--text-secondary)] transition hover:bg-white/10 hover:text-white"
                    onClick={() => downloadChecklistImage(checklist)}
                  >
                    存成圖片
                  </button>
                </div>
              ) : null}
            </div>
            {checklist.length > 0 ? (
              <ol className="mt-3 space-y-3 text-sm leading-7 text-[color:var(--text-primary)]">
                {checklist.map((item) => (
                  <li key={item.where}>
                    <span className="font-semibold text-[color:var(--accent)]">{item.where}</span>
                    <br />
                    {item.ask}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
                {visitedIds.length === 0
                  ? "你還沒檢查任何標記。回去點幾個，這裡就會長出一份可以帶去看房的清單。"
                  : "這間房你檢查過的項目都是正常現象，沒有需要追問的地方。"}
              </p>
            )}
          </div>

          {profile.checkNote ? (
            <p className="rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm leading-7 text-amber-100">
              {profile.checkNote}
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "你看過的", visited: true },
              { title: "還沒看的", visited: false },
            ].map((group) => (
              <div key={group.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{group.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-[color:var(--text-secondary)]">
                  {scenes.flatMap((item) =>
                    item.hotspots
                      .filter((hotspot) => visitedIds.includes(hotspot.id) === group.visited)
                      .map((hotspot) => (
                        <li key={hotspot.id}>
                          {item.title}・{hotspot.label}
                        </li>
                      )),
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/contract" className="button-primary justify-center">
              拿你的真實合約來比對
            </Link>
            <Link href={tourHouse.checkHref} className="button-secondary justify-center">
              帶著這間房去查核
            </Link>
            <Link href={tourHouse.contractHref} className="button-secondary justify-center">
              先看示範合約結果
            </Link>
            <button type="button" className="button-secondary justify-center" onClick={restart}>
              重新開始
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="mb-3 text-sm text-[color:var(--text-secondary)]">{scene.description}</p>
            {listMode ? (
              <div>
                <span className="mb-3 inline-flex rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-[color:var(--text-muted)]">
                  清單模式・此裝置不支援 3D
                </span>
                <ul className="space-y-3">
                  {scene.hotspots.map((hotspot, index) => {
                    const visited = visitedIds.includes(hotspot.id);
                    const active = hotspot.id === activeHotspotId;

                    return (
                      <li
                        key={hotspot.id}
                        className={`rounded-2xl border transition ${
                          active
                            ? "border-[color:var(--accent)]/50 bg-[color:var(--accent)]/8"
                            : "border-white/10 bg-white/[0.03]"
                        } ${hintOn && !visited && !active ? "motion-safe:animate-pulse" : ""}`}
                      >
                        <button
                          type="button"
                          aria-expanded={active}
                          aria-controls={`tour-hotspot-panel-${hotspot.id}`}
                          onClick={() => (active ? setActiveHotspotId(null) : openHotspot(hotspot.id))}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left"
                        >
                          <span
                            className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
                              visited
                                ? "border-[color:var(--accent)]/40 text-[color:var(--accent)]"
                                : "border-white/20 text-[color:var(--text-primary)]"
                            }`}
                          >
                            {visited ? "✓" : index + 1}
                          </span>
                          <span className="flex-1 font-semibold text-[color:var(--text-primary)]">{hotspot.label}</span>
                          <span aria-hidden="true" className="text-[color:var(--text-secondary)]">
                            {active ? "−" : "+"}
                          </span>
                        </button>
                        {active ? (
                          <div id={`tour-hotspot-panel-${hotspot.id}`} className="px-4 pb-4">
                            <HotspotDetail
                              hotspot={hotspot}
                              guess={guesses[hotspot.id]}
                              onGuess={(value) => guess(hotspot.id, value)}
                            />
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="tour-3d-frame relative aspect-[4/3] w-full overflow-hidden sm:aspect-video">
                <SceneErrorBoundary key={scene.id} onError={switchToListMode}>
                  <SceneIllustration sceneId={scene.id} onContextLost={switchToListMode} />
                </SceneErrorBoundary>
                {scene.hotspots.map((hotspot, index) => {
                  const visited = visitedIds.includes(hotspot.id);
                  const active = hotspot.id === activeHotspotId;

                  return (
                    <button
                      key={hotspot.id}
                      type="button"
                      aria-label={hotspot.label}
                      aria-pressed={active}
                      aria-controls={active ? "tour-hotspot-dialog" : undefined}
                      onClick={() => openHotspot(hotspot.id)}
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                        active
                          ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-[#1a1a1a]"
                          : visited
                            ? "border-[color:var(--accent)]/40 bg-black/70 text-[color:var(--accent)]"
                            : "border-white/20 bg-black/70 text-[color:var(--text-primary)]"
                      } ${hintOn && !visited && !active ? "motion-safe:animate-pulse ring-2 ring-[color:var(--accent)]/60" : ""}`}
                    >
                      <span>{visited ? "✓" : index + 1}</span>
                      <span>{hotspot.label}</span>
                    </button>
                  );
                })}

                {activeHotspot ? (
                  <div
                    id="tour-hotspot-dialog"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="tour-hotspot-title"
                    style={
                      {
                        "--hotspot-x": `${activeHotspot.x}%`,
                        "--hotspot-y": `${activeHotspot.y}%`,
                      } as CSSProperties
                    }
                    className="tour-hotspot-dialog absolute z-20 max-h-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-white/15 bg-[#121827]/95 p-4 shadow-2xl backdrop-blur-md sm:rounded-3xl sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="eyebrow text-xs">注意事項</p>
                        <h3 id="tour-hotspot-title" className="mt-1 text-xl font-semibold text-[color:var(--text-primary)]">
                          {activeHotspot.label}
                        </h3>
                      </div>
                      <button
                        type="button"
                        aria-label="關閉說明"
                        onClick={() => setActiveHotspotId(null)}
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-lg text-[color:var(--text-secondary)] transition hover:bg-white/10 hover:text-white"
                      >
                        ×
                      </button>
                    </div>
                    <HotspotDetail
                      hotspot={activeHotspot}
                      guess={guesses[activeHotspot.id]}
                      onGuess={(value) => guess(activeHotspot.id, value)}
                    />
                  </div>
                ) : (
                  <p className="absolute bottom-3 left-3 z-10 rounded-full border border-white/15 bg-black/70 px-3 py-2 text-xs text-[color:var(--text-primary)] backdrop-blur-sm sm:bottom-5 sm:left-5 sm:text-sm">
                    點標記查看
                  </p>
                )}
              </div>
            )}
          </div>

          {scene.id === "landlord" ? <PressurePanel /> : null}

          <div className="flex justify-end">
            <button
              type="button"
              className="button-primary min-w-52 justify-center"
              onClick={() => (isLastScene ? setShowSummary(true) : goToScene(sceneIndex + 1))}
            >
              {isLastScene ? "查看總結與提問清單" : `下一站：${scenes[sceneIndex + 1].title}`}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
