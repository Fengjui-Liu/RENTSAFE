export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="panel p-8 sm:p-10">
        <p className="eyebrow">關於我們</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight text-[color:var(--text-primary)]">讓學生租屋不再只能靠運氣</h1>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">團隊介紹</h2>
          <p className="mt-3 text-base leading-8 text-[color:var(--text-secondary)]">
            關注學生居住安全與資訊不對稱的 NCCU 團隊。
          </p>
        </div>
        <p className="mt-8 text-base leading-8 text-[color:var(--text-secondary)]">
          把建物、行情、合約三種資訊整理成簽約前看得懂的提示。
        </p>
      </section>
    </div>
  );
}
