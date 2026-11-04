"use client";

import Link from "next/link";
import { useState } from "react";
import { tourHotspotCount, tourHouse, tourScenes, type TourScene } from "@/data/tour-data";

function SceneIllustration({ sceneId }: { sceneId: TourScene["id"] }) {
  const stroke = "rgba(255,255,255,0.22)";
  const fill = "rgba(255,255,255,0.04)";
  const accent = "rgba(249,115,22,0.35)";

  if (sceneId === "viewing") {
    return (
      <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
        <rect x="10" y="10" width="380" height="220" rx="16" fill={fill} stroke={stroke} />
        <line x1="10" y1="190" x2="390" y2="190" stroke={stroke} />
        <circle cx="88" cy="26" r="8" fill="none" stroke={accent} strokeWidth="2" />
        <line x1="150" y1="60" x2="150" y2="190" stroke={stroke} strokeDasharray="6 6" />
        <rect x="40" y="140" width="90" height="40" rx="8" fill="none" stroke={stroke} />
        <rect x="215" y="105" width="70" height="85" rx="6" fill="none" stroke={stroke} />
        <circle cx="272" cy="150" r="3" fill={stroke} />
        <rect x="300" y="40" width="80" height="110" rx="6" fill="none" stroke={accent} />
        <line x1="300" y1="80" x2="380" y2="80" stroke={accent} />
        <path d="M300 40 L340 18 L380 40" fill="none" stroke={accent} />
      </svg>
    );
  }

  if (sceneId === "landlord") {
    return (
      <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
        <rect x="10" y="10" width="380" height="220" rx="16" fill={fill} stroke={stroke} />
        <circle cx="120" cy="120" r="22" fill="none" stroke={stroke} />
        <path d="M80 200 Q120 150 160 200" fill="none" stroke={stroke} />
        <circle cx="280" cy="120" r="22" fill="none" stroke={accent} />
        <path d="M240 200 Q280 150 320 200" fill="none" stroke={accent} />
        <rect x="70" y="40" width="110" height="40" rx="12" fill="none" stroke={stroke} />
        <rect x="220" y="34" width="120" height="40" rx="12" fill="none" stroke={accent} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <rect x="10" y="10" width="380" height="220" rx="16" fill={fill} stroke={stroke} />
      <rect x="40" y="150" width="320" height="16" rx="4" fill="none" stroke={stroke} />
      <rect x="110" y="40" width="180" height="140" rx="6" fill="rgba(255,255,255,0.05)" stroke={stroke} />
      {[64, 84, 104, 124, 144].map((y) => (
        <line key={y} x1="130" y1={y} x2="270" y2={y} stroke={stroke} />
      ))}
      <line x1="300" y1="190" x2="340" y2="130" stroke={accent} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function TourExperience() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const scene = tourScenes[sceneIndex];
  const activeHotspot = scene.hotspots.find((hotspot) => hotspot.id === activeHotspotId) ?? null;
  const isLastScene = sceneIndex === tourScenes.length - 1;

  const openHotspot = (id: string) => {
    setActiveHotspotId(id);
    setVisitedIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  const goToScene = (index: number) => {
    setSceneIndex(index);
    setActiveHotspotId(null);
    setShowSummary(false);
  };

  const restart = () => {
    setSceneIndex(0);
    setActiveHotspotId(null);
    setVisitedIds([]);
    setShowSummary(false);
  };

  return (
    <section className="panel p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow">示範房</p>
            <span className="inline-flex rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-[color:var(--text-muted)]">
              情境示範
            </span>
          </div>
          <h2 className="mt-3 font-serif text-3xl text-[color:var(--text-primary)]">{tourHouse.title}</h2>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{tourHouse.description}</p>
        </div>
        <p className="rounded-full border border-[color:var(--primary)]/30 bg-[color:var(--primary)]/8 px-4 py-2 text-sm text-[color:var(--text-primary)]">
          已檢查 {visitedIds.length} / {tourHotspotCount} 項
        </p>
      </div>

      <div className="mb-6 inline-flex flex-wrap rounded-full border border-white/10 bg-black/30 p-1 text-sm">
        {tourScenes.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={!showSummary && sceneIndex === index}
            onClick={() => goToScene(index)}
            className={`rounded-full px-4 py-2 transition ${
              !showSummary && sceneIndex === index
                ? "bg-[color:var(--primary)] font-semibold text-white"
                : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {showSummary ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "你看過的", visited: true },
              { title: "還沒看的", visited: false },
            ].map((group) => (
              <div key={group.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{group.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-[color:var(--text-secondary)]">
                  {tourScenes.flatMap((item) =>
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={tourHouse.checkHref} className="button-primary justify-center">
              帶著這間房去查核
            </Link>
            <Link href={tourHouse.contractHref} className="button-secondary justify-center">
              檢查這份合約
            </Link>
            <button type="button" className="button-secondary justify-center" onClick={restart}>
              重新開始
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 text-sm text-[color:var(--text-secondary)]">{scene.description}</p>
            <div className="relative aspect-[5/3] w-full">
              <SceneIllustration sceneId={scene.id} />
              {scene.hotspots.map((hotspot, index) => {
                const visited = visitedIds.includes(hotspot.id);
                const active = hotspot.id === activeHotspotId;

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    aria-label={hotspot.label}
                    aria-pressed={active}
                    onClick={() => openHotspot(hotspot.id)}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      active
                        ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
                        : visited
                          ? "border-[color:var(--primary)]/40 bg-black/70 text-[color:var(--primary-soft)]"
                          : "border-white/20 bg-black/70 text-[color:var(--text-primary)] shadow-[0_0_18px_rgba(249,115,22,0.45)]"
                    }`}
                  >
                    <span>{visited ? "✓" : index + 1}</span>
                    <span>{hotspot.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            {activeHotspot ? (
              <dl className="space-y-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                <div>
                  <dt className="text-[color:var(--text-muted)]">{activeHotspot.label}：注意什麼</dt>
                  <dd className="text-[color:var(--text-primary)]">{activeHotspot.attention}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--text-muted)]">依據</dt>
                  <dd>{activeHotspot.basis}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm leading-7 text-[color:var(--text-secondary)]">點插圖上的標記，看看這裡要注意什麼。</p>
            )}

            <button
              type="button"
              className="button-secondary justify-center"
              onClick={() => (isLastScene ? setShowSummary(true) : goToScene(sceneIndex + 1))}
            >
              {isLastScene ? "看看檢查了哪些" : `下一站：${tourScenes[sceneIndex + 1].title}`}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
