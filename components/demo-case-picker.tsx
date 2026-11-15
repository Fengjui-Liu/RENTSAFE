type DemoCasePickerProps = {
  cases: readonly { id: string; title: string; description: string }[];
  selectedId: string | null;
  onLoad: (id: string) => void;
  onReset: () => void;
};

// 展示模式工具列：/check 與 /contract 共用。案例說明改放在 title（hover 提示），按鈕維持單行
const chipBase =
  "min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[15px] leading-6 transition";

export function DemoCasePicker({ cases, selectedId, onLoad, onReset }: DemoCasePickerProps) {
  return (
    <section
      aria-label="展示模式"
      className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-3"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="eyebrow whitespace-nowrap">展示模式</p>
        <p className="text-[15px] text-[color:var(--text-muted)]">預設案例・離線可用</p>
      </div>
      <div className="demo-chip-row">
      {cases.map((demoCase) => {
        const selected = selectedId === demoCase.id;
        return (
          <button
            key={demoCase.id}
            type="button"
            title={demoCase.description}
            aria-pressed={selected}
            onClick={() => onLoad(demoCase.id)}
            className={`${chipBase} ${
              selected
                ? "border-[color:var(--accent)]/50 bg-[color:var(--accent)]/8 text-[color:var(--text-primary)]"
                : "border-white/10 bg-white/[0.03] text-[color:var(--text-secondary)] hover:border-[color:var(--accent)]/30 hover:text-[color:var(--text-primary)]"
            }`}
          >
            {demoCase.title}
          </button>
        );
      })}
      <button
        type="button"
        onClick={onReset}
        className={`${chipBase} border-white/12 text-[color:var(--text-secondary)] hover:border-[color:var(--accent)]/30 hover:text-[color:var(--text-primary)]`}
      >
        重置
      </button>
      </div>
      {selectedId ? (
        <p
          role="status"
          className="rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-[15px] text-amber-100"
        >
          目前顯示的是示範資料，不是你自己的房源或合約。改成自己的輸入後，此提示會消失。
        </p>
      ) : null}
    </section>
  );
}
