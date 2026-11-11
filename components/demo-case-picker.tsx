type DemoCasePickerProps = {
  cases: readonly { id: string; title: string; description: string }[];
  selectedId: string | null;
  onLoad: (id: string) => void;
  onReset: () => void;
};

// 展示模式工具列：/check 與 /contract 共用。案例說明改放在 title（hover 提示），按鈕維持單行
const chipBase =
  "whitespace-nowrap rounded-full border px-4 py-2 text-[15px] leading-6 transition";

export function DemoCasePicker({ cases, selectedId, onLoad, onReset }: DemoCasePickerProps) {
  return (
    <section
      aria-label="展示模式"
      className="flex flex-wrap items-center gap-2 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-3"
    >
      <p className="eyebrow mr-2 whitespace-nowrap">展示模式</p>
      <p className="mr-2 whitespace-nowrap text-[15px] text-[color:var(--text-secondary)]">預設案例・離線可用</p>
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
                ? "border-[color:var(--primary)]/50 bg-[color:var(--primary)]/8 text-[color:var(--text-primary)]"
                : "border-white/10 bg-white/[0.03] text-[color:var(--text-secondary)] hover:border-[color:var(--primary)]/30 hover:text-[color:var(--text-primary)]"
            }`}
          >
            {demoCase.title}
          </button>
        );
      })}
      <button
        type="button"
        onClick={onReset}
        className={`${chipBase} border-white/12 text-[color:var(--text-secondary)] hover:border-[color:var(--primary)]/30 hover:text-[color:var(--text-primary)]`}
      >
        重置
      </button>
    </section>
  );
}
