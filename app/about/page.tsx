const features = [
  "實價登錄租金比對：與同行政區、同建物類型的月租中位數比較",
  "住宅租賃契約書範本規則比對：標出與範本不同的條款，附條號與頁碼",
  "情境看房：列出簽約前要向房東確認的項目",
];

const sources = [
  "內政部實價登錄（租賃）",
  "內政部《住宅租賃契約書範本》113 年 7 月 8 日修正版",
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">關於 RentSafe</h1>

      <section className="panel grid gap-10 p-8 lg:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">功能</h2>
          <ul className="mt-3 space-y-2 text-base leading-7 text-[color:var(--text-secondary)]">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">資料來源</h2>
          <ul className="mt-3 space-y-2 text-base leading-7 text-[color:var(--text-secondary)]">
            {sources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">團隊</h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--text-secondary)]">NCCU 團隊</p>
          {/* TODO（團隊）：填入成員姓名與分工，例如 <ul><li>姓名・負責項目</li></ul>。請勿使用虛構姓名。 */}
        </div>
      </section>
    </div>
  );
}
