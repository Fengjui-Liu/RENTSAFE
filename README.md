# RentSafe 賃居守護

> AI 驅動的台灣學生租屋詐騙查核平台

NCCU Prometheus 2026 AI 跨域 X 永續創新競賽 參賽作品

---

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 開啟瀏覽器
http://localhost:3000
```

---

## 專案結構

```
rentsafe/
├── app/
│   ├── page.tsx          # 首頁
│   ├── check/
│   │   └── page.tsx      # 物件查核頁
│   ├── contract/
│   │   └── page.tsx      # 合約審查頁
│   └── about/
│       └── page.tsx      # 關於我們
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── RiskBadge.tsx     # 風險標示徽章
│   ├── CheckResult.tsx   # 物件查核結果卡片
│   ├── ContractResult.tsx # 合約審查結果卡片
│   └── LoadingAnalysis.tsx # 分析中動畫
├── lib/
│   └── mockData.ts       # Mock 資料
└── CLAUDE.md             # Claude Code 開發指引
```

---

## 功能說明

### 物件查核
- 上傳 591 或 FB 租屋截圖
- AI 自動查核建案合法性、租金合理性
- 輸出紅黃綠燈體檢報告

### 合約審查
- 上傳租賃契約 PDF
- AI 標記違法條款與缺漏項目
- 依風險等級分類並提供修改建議

---

## 技術棧

- **框架**：Next.js 14 (App Router)
- **樣式**：Tailwind CSS
- **語言**：TypeScript
- **資料**：Mock Data（展示用）

---

## 資料來源（實際產品規劃）

| 資料 | 來源 |
|---|---|
| 租金行情 | 內政部實價登錄 |
| 建物登記 | 全國地政電子謄本系統 |
| 合約標準 | 行政院定型化契約範本 |

---

> 本工具提供資訊揭露，不構成法律建議。
# RENTSAFE
