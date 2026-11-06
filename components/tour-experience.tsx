"use client";

import Link from "next/link";
import { useState } from "react";
import { tourHotspotCount, tourHouse, tourScenes, type TourScene } from "@/data/tour-data";

function SceneIllustration({ sceneId }: { sceneId: TourScene["id"] }) {
  if (sceneId === "viewing") {
    return (
      <svg viewBox="0 0 400 240" className="pixel-scene h-full w-full" aria-hidden="true">
        <rect width="400" height="240" fill="#111827" />
        <rect y="168" width="400" height="72" fill="#35251f" />
        <path d="M0 168H400M0 192H400M0 216H400M40 168V240M120 168V240M200 168V240M280 168V240M360 168V240" stroke="#593b2e" strokeWidth="2" />
        <rect x="16" y="16" width="368" height="152" fill="#263449" stroke="#080b12" strokeWidth="6" />
        <rect x="24" y="24" width="144" height="136" fill="#314158" />
        <rect x="176" y="24" width="200" height="136" fill="#2b3a50" />
        <rect x="188" y="38" width="82" height="66" fill="#172130" stroke="#080b12" strokeWidth="6" />
        <rect x="194" y="44" width="70" height="54" fill="#7dc7d9" />
        <rect x="194" y="76" width="70" height="22" fill="#e48b43" />
        <path d="M226 44V98M194 70H264" stroke="#24344b" strokeWidth="4" />
        <rect x="292" y="54" width="66" height="106" fill="#654838" stroke="#080b12" strokeWidth="6" />
        <rect x="300" y="62" width="50" height="98" fill="#82614b" />
        <rect x="338" y="108" width="6" height="6" fill="#ffd36a" />
        <g className="pixel-drip">
          <rect x="280" y="128" width="6" height="12" fill="#65d2e8" />
          <rect x="280" y="144" width="6" height="6" fill="#65d2e8" />
        </g>
        <rect x="42" y="119" width="106" height="49" fill="#151b28" stroke="#080b12" strokeWidth="6" />
        <rect x="50" y="126" width="90" height="34" fill="#df6e3b" />
        <rect x="56" y="136" width="36" height="18" fill="#f2a65a" />
        <g className="pixel-alarm">
          <rect x="74" y="30" width="34" height="10" fill="#080b12" />
          <rect x="80" y="34" width="22" height="12" fill="#f5f3e8" />
          <rect x="88" y="38" width="6" height="6" fill="#ef4444" />
        </g>
        <g className="pixel-character pixel-character-walk">
          <rect x="182" y="122" width="18" height="18" fill="#f2b38b" />
          <rect x="178" y="140" width="26" height="24" fill="#f97316" />
          <rect x="180" y="164" width="8" height="20" fill="#cbd5e1" />
          <rect x="194" y="164" width="8" height="20" fill="#cbd5e1" />
          <rect x="178" y="184" width="12" height="6" fill="#080b12" />
          <rect x="194" y="184" width="12" height="6" fill="#080b12" />
        </g>
      </svg>
    );
  }

  if (sceneId === "landlord") {
    return (
      <svg viewBox="0 0 400 240" className="pixel-scene h-full w-full" aria-hidden="true">
        <rect width="400" height="240" fill="#151b2b" />
        <rect y="166" width="400" height="74" fill="#443026" />
        <rect x="20" y="20" width="360" height="146" fill="#283750" stroke="#080b12" strokeWidth="6" />
        <rect x="36" y="38" width="104" height="74" fill="#172130" stroke="#080b12" strokeWidth="6" />
        <rect x="44" y="46" width="88" height="58" fill="#e7934c" />
        <rect x="52" y="54" width="30" height="42" fill="#f8c66d" />
        <rect x="90" y="62" width="34" height="34" fill="#d96b3e" />
        <g className="pixel-bubble">
          <rect x="66" y="18" width="112" height="36" fill="#fff8e8" stroke="#080b12" strokeWidth="5" />
          <rect x="88" y="50" width="12" height="10" fill="#fff8e8" />
          <rect x="78" y="29" width="74" height="5" fill="#5f6574" />
          <rect x="78" y="40" width="52" height="5" fill="#f97316" />
        </g>
        <g className="pixel-bubble pixel-bubble-delay">
          <rect x="228" y="22" width="112" height="36" fill="#fff8e8" stroke="#080b12" strokeWidth="5" />
          <rect x="304" y="54" width="12" height="10" fill="#fff8e8" />
          <rect x="242" y="33" width="78" height="5" fill="#5f6574" />
          <rect x="258" y="44" width="62" height="5" fill="#ef4444" />
        </g>
        <rect x="70" y="150" width="260" height="24" fill="#8b5b3f" stroke="#080b12" strokeWidth="6" />
        <rect x="104" y="174" width="14" height="50" fill="#60402f" />
        <rect x="282" y="174" width="14" height="50" fill="#60402f" />
        <g className="pixel-character pixel-character-talk">
          <rect x="102" y="96" width="24" height="24" fill="#f2b38b" />
          <rect x="98" y="120" width="32" height="34" fill="#3b82f6" />
          <rect x="104" y="154" width="8" height="32" fill="#cbd5e1" />
          <rect x="118" y="154" width="8" height="32" fill="#cbd5e1" />
        </g>
        <g className="pixel-character pixel-character-talk pixel-character-talk-delay">
          <rect x="274" y="96" width="24" height="24" fill="#d69b76" />
          <rect x="270" y="120" width="32" height="34" fill="#f97316" />
          <rect x="276" y="154" width="8" height="32" fill="#334155" />
          <rect x="290" y="154" width="8" height="32" fill="#334155" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 240" className="pixel-scene h-full w-full" aria-hidden="true">
      <rect width="400" height="240" fill="#121827" />
      <rect y="174" width="400" height="66" fill="#3b2a22" />
      <rect x="18" y="18" width="364" height="156" fill="#26364d" stroke="#080b12" strokeWidth="6" />
      <rect x="98" y="34" width="204" height="146" fill="#f4ead5" stroke="#080b12" strokeWidth="7" />
      <rect x="110" y="46" width="180" height="122" fill="#fffaf0" />
      {[58, 72, 86, 100, 114, 128, 142].map((y) => (
        <rect key={y} x="124" y={y} width={y === 100 ? 112 : 150} height="4" fill="#8b93a1" />
      ))}
      <g className="pixel-highlight">
        <rect x="116" y="50" width="168" height="25" fill="#f97316" opacity="0.25" />
      </g>
      <rect x="30" y="174" width="340" height="26" fill="#885b3f" stroke="#080b12" strokeWidth="6" />
      <rect x="54" y="200" width="16" height="40" fill="#5d3d2d" />
      <rect x="330" y="200" width="16" height="40" fill="#5d3d2d" />
      <g className="pixel-pen">
        <rect x="306" y="128" width="8" height="66" fill="#080b12" transform="rotate(36 310 161)" />
        <rect x="309" y="130" width="5" height="54" fill="#f97316" transform="rotate(36 311 157)" />
      </g>
      <g className="pixel-stamp">
        <rect x="56" y="128" width="34" height="28" fill="#ef4444" stroke="#080b12" strokeWidth="5" />
        <rect x="62" y="118" width="22" height="12" fill="#f6c453" stroke="#080b12" strokeWidth="4" />
      </g>
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
            <div className="tour-pixel-frame relative aspect-[5/3] w-full overflow-hidden">
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
                          : "border-white/20 bg-black/70 text-[color:var(--text-primary)]"
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
