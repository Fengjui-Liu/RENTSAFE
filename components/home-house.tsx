"use client";

import Link from "next/link";
import { useState } from "react";
import { featureCards } from "@/data/mock-data";

// 首頁互動房子：四個部位對應四個查核面向。滑過、點擊或鍵盤聚焦都能切換，下方卡片顯示說明與入口。
const parts = ["roof", "tag", "door", "window"] as const;
type Part = (typeof parts)[number];

const partHints: Record<Part, string> = {
  roof: "屋頂上的加蓋",
  tag: "門口的租金牌",
  door: "門上的合約",
  window: "看不出來的事",
};

export function HomeHouse() {
  const [active, setActive] = useState(0);
  const card = featureCards[active];

  const partProps = (index: number) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-label": `${featureCards[index].title}：${partHints[parts[index]]}`,
    "aria-pressed": active === index,
    onMouseEnter: () => setActive(index),
    onFocus: () => setActive(index),
    onClick: () => setActive(index),
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActive(index);
      }
    },
    className: `house-part ${active === index ? "is-active" : ""}`,
  });

  return (
    <div className="panel animate-enter-delayed min-w-0 p-5 sm:p-7">
      <p className="text-sm text-[color:var(--text-muted)]">點點看這間房子，每個地方都有要確認的事</p>

      <svg viewBox="0 0 400 300" className="mx-auto mt-2 block w-full max-w-md" aria-label="互動房子示意圖">
        <ellipse cx="200" cy="272" rx="170" ry="16" fill="#000" opacity="0.35" />

        {/* 煙囪與煙 */}
        <rect x="262" y="70" width="22" height="46" rx="3" fill="#8a5d3b" />
        <circle className="house-smoke" cx="273" cy="56" r="7" fill="#d4d4d4" opacity="0.5" />
        <circle className="house-smoke house-smoke-2" cx="281" cy="40" r="5" fill="#d4d4d4" opacity="0.35" />

        {/* 房屋本體 */}
        <rect x="90" y="130" width="220" height="140" rx="10" fill="#efe3cf" />
        <rect x="90" y="240" width="220" height="30" rx="8" fill="#d9c7a8" />

        {/* 屋頂＋頂樓加蓋 → 建物合法性 */}
        <g {...partProps(0)}>
          <polygon points="70,136 200,52 330,136" fill="#c86b45" />
          <rect x="118" y="78" width="58" height="40" rx="5" fill="#9aa5b1" />
          <rect x="128" y="88" width="16" height="14" rx="2" fill="#dbeafe" />
          <line x1="118" y1="84" x2="176" y2="84" stroke="#6b7785" strokeWidth="4" />
        </g>

        {/* 租金牌 → 租金合理性 */}
        <g {...partProps(1)}>
          <line x1="330" y1="270" x2="330" y2="178" stroke="#8a5d3b" strokeWidth="6" strokeLinecap="round" />
          <rect x="304" y="150" width="62" height="46" rx="8" fill="#f6c453" />
          <text x="335" y="181" textAnchor="middle" fontSize="24" fontWeight="700" fill="#5b3b0a">
            租
          </text>
        </g>

        {/* 門＋合約 → 合約條款 */}
        <g {...partProps(2)}>
          <rect x="176" y="176" width="58" height="94" rx="7" fill="#8a5d3b" />
          <circle cx="224" cy="226" r="4" fill="#f6c453" />
          <rect x="186" y="188" width="30" height="38" rx="3" fill="#fffaf0" />
          <line x1="191" y1="198" x2="211" y2="198" stroke="#b9a98c" strokeWidth="3" />
          <line x1="191" y1="207" x2="211" y2="207" stroke="#b9a98c" strokeWidth="3" />
          <line x1="191" y1="216" x2="204" y2="216" stroke="#c2410c" strokeWidth="3" />
        </g>

        {/* 窗戶 → 凶宅風險提醒（看不出來，要問） */}
        <g {...partProps(3)}>
          <rect x="108" y="160" width="52" height="52" rx="7" fill="#27364a" />
          <line x1="134" y1="160" x2="134" y2="212" stroke="#efe3cf" strokeWidth="4" />
          <line x1="108" y1="186" x2="160" y2="186" stroke="#efe3cf" strokeWidth="4" />
          <text x="134" y="150" textAnchor="middle" fontSize="20" fontWeight="700" fill="#efe3cf">
            ?
          </text>
        </g>
      </svg>

      <div role="tablist" aria-label="查核面向" className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {featureCards.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm transition ${
              active === index
                ? "border-[color:var(--accent)]/60 bg-[color:var(--accent)]/12 text-[color:var(--text-primary)]"
                : "border-white/10 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4" aria-live="polite">
        <p className="text-sm text-[color:var(--accent)]">{partHints[parts[active]]}</p>
        <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">{card.title}</p>
        <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{card.description}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <Link href={card.href} className="text-[color:var(--text-primary)] underline underline-offset-4">
            前往查看
          </Link>
          <Link href="/tour" className="text-[color:var(--text-secondary)] underline underline-offset-4">
            或走進房子看一圈（情境看房）
          </Link>
        </div>
      </div>
    </div>
  );
}
