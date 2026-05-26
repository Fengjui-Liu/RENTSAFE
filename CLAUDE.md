# RentSafe 賃居守護 — Claude Code 開發指引

## 專案概述

RentSafe 是一個 AI 租屋風險查核工具的 **展示用前端 Demo**。
目標是做出一個可以在競賽現場展示的靜態互動原型，**不需要真實後端**，所有分析結果用 Mock Data 模擬即可。

技術棧：**Next.js 14 + Tailwind CSS + TypeScript**
風格：深色主題，橘色為主色調（參考競賽官網配色）

---

## 頁面結構

### 1. 首頁（`/`）
- Hero Section：大標題「60 秒，看清你要租的房子」
- 副標題：「整合地政謄本、實價登錄與 AI 技術，讓每個學生都能像專業人士一樣看房」
- 兩個 CTA 按鈕：「上傳截圖查核」、「上傳合約審查」
- 三個功能亮點卡片（建案合法性 / 租金合理性 / 合約條款）

### 2. 物件查核頁（`/check`）
- 上傳區塊：支援拖曳上傳圖片（591 截圖 / FB 截圖）
- 或輸入 591 連結（輸入框）
- 送出後顯示 Loading 動畫（模擬分析中，2 秒後跳出結果）
- 結果頁：體檢報告卡片（見下方 Mock Data 說明）

### 3. 合約審查頁（`/contract`）
- 上傳 PDF 區塊
- 送出後顯示 Loading 動畫
- 結果頁：條款風險報告（見下方 Mock Data 說明）

### 4. 關於我們（`/about`）
- 團隊介紹（一段文字即可）
- 專案背景與理念

---

## Mock Data 規格

### 物件查核結果（`/check` 的結果）

```typescript
const mockCheckResult = {
  address: "台北市文山區木柵路一段 XX 號",
  analysisTime: "58秒",
  modules: {
    legality: {
      status: "warning", // "safe" | "warning" | "danger"
      items: [
        {
          label: "坪數真實性",
          status: "danger",
          detail: "廣告坪數 12 坪，登記建坪 8.2 坪，差異達 46%"
        },
        {
          label: "違建查核",
          status: "danger",
          detail: "建物使用執照登記為 4 樓，廣告物件位於 5 樓，疑似頂樓加蓋"
        },
        {
          label: "非法隔間",
          status: "warning",
          detail: "建物登記用途為一般住宅，廣告標示為套房，建議進一步確認"
        },
        {
          label: "租金補貼資格",
          status: "safe",
          detail: "建物登記用途符合租金補貼申請基本條件"
        }
      ]
    },
    pricing: {
      status: "danger",
      marketMedian: 7200,
      listedPrice: 8000,
      deviation: 11.1,
      level: "偏高", // "合理" | "偏高" | "明顯偏高"
      detail: "報價高於文山區同類型物件中位數 11.1%"
    },
  },
  summary: "此物件存在 2 項高風險警示，建議謹慎評估或放棄此物件。"
}
```

### 合約審查結果（`/contract` 的結果）

```typescript
const mockContractResult = {
  fileName: "租賃契約書.pdf",
  analysisTime: "2分14秒",
  riskLevel: "high", // "low" | "medium" | "high"
  clauses: [
    {
      risk: "high",
      label: "提前終止條款",
      original: "房東得於一個月前通知承租人終止租約",
      issue: "違反定型化契約規定，房東不得任意終止租約",
      suggestion: "此條款屬不得記載事項，簽約前應要求房東刪除"
    },
    {
      risk: "high",
      label: "押金條款",
      original: "承租人應繳納三個月押金",
      issue: "押金上限為兩個月租金，超過部分違法",
      suggestion: "依法要求押金上限改為兩個月"
    },
    {
      risk: "medium",
      label: "修繕責任",
      original: "室內所有設備損壞由承租人自行負責修繕",
      issue: "自然損耗應由房東負責，此條款範圍過廣",
      suggestion: "建議修改為「人為損壞由承租人負責，自然損耗由房東負責」"
    },
    {
      risk: "low",
      label: "轉租條款",
      original: "未經房東同意不得轉租",
      issue: "條款本身合法，但建議確認定義範圍",
      suggestion: "符合一般慣例，可接受"
    }
  ],
  resources: [
    { name: "崔媽媽基金會", url: "https://www.tmm.org.tw" },
    { name: "消費者保護官", url: "https://www.cpc.ey.gov.tw" }
  ]
}
```

---

## UI 元件規格

### 色彩系統
```css
--primary: #F97316;      /* 橘色主色 */
--primary-dark: #EA580C;
--bg-dark: #0F0F0F;      /* 深色背景 */
--bg-card: #1A1A1A;      /* 卡片背景 */
--bg-card-hover: #242424;
--text-primary: #FFFFFF;
--text-secondary: #A3A3A3;
--success: #22C55E;       /* 綠色：合法/安全 */
--warning: #EAB308;       /* 黃色：警示 */
--danger: #EF4444;        /* 紅色：高風險 */
```

### 風險標示元件
- 🟢 綠色徽章：`合法` / `合理` / `低風險`
- 🟡 黃色徽章：`警示` / `偏高` / `中風險`
- 🔴 紅色徽章：`違規` / `明顯偏高` / `高風險`

### Loading 動畫
分析中畫面要有逐步顯示的文字，模擬真實分析過程：
```
正在解析物件資訊...
比對內政部建物登記資料...
查核實價登錄租金行情...
產生體檢報告...
```
每行間隔約 0.5 秒出現。

---

## 導覽列
- Logo：RentSafe 賃居守護（橘色）
- 連結：首頁 / 物件查核 / 合約審查 / 關於我們
- 右側 CTA 按鈕：「開始查核」（橘色）

---

## 頁尾
- 版權聲明
- 說明：「本工具提供資訊揭露，不構成法律建議」
- 資料來源：內政部實價登錄、全國地政電子謄本系統

---

## 注意事項

1. **全部用 Mock Data**，不需要真實 API 串接
2. 上傳圖片/PDF 後只需要做假的 loading，直接顯示預設結果
3. RWD：手機版也要能看
4. 語言：全繁體中文
5. 字型建議：標題用 `Noto Serif TC`，內文用 `Noto Sans TC`
