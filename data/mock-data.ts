export type Status = "safe" | "warning" | "danger";
export type ContractRisk = "low" | "medium" | "high";

export const navigationItems = [
  { href: "/", label: "首頁" },
  { href: "/check", label: "物件查核" },
  { href: "/contract", label: "合約審查" },
  { href: "/about", label: "關於我們" },
] as const;

export const propertyLoadingSteps = [
  "正在解析物件資訊...",
  "比對內政部建物登記資料...",
  "查核實價登錄租金行情...",
  "產生體檢報告...",
] as const;

export const contractLoadingSteps = [
  "正在解析合約內容...",
  "比對租賃定型化契約規範...",
  "標記高風險條款...",
  "產生條款審查報告...",
] as const;

export const mockCheckResult = {
  address: "台北市文山區木柵路一段 XX 號",
  analysisTime: "58秒",
  modules: {
    legality: {
      status: "warning" as Status,
      items: [
        {
          label: "坪數真實性",
          status: "danger" as Status,
          detail: "廣告坪數 12 坪，登記建坪 8.2 坪，差異達 46%",
        },
        {
          label: "違建查核",
          status: "danger" as Status,
          detail: "建物使用執照登記為 4 樓，廣告物件位於 5 樓，疑似頂樓加蓋",
        },
        {
          label: "非法隔間",
          status: "warning" as Status,
          detail: "建物登記用途為一般住宅，廣告標示為套房，建議進一步確認",
        },
        {
          label: "租金補貼資格",
          status: "safe" as Status,
          detail: "建物登記用途符合租金補貼申請基本條件",
        },
      ],
    },
    pricing: {
      status: "warning" as Status,
      marketMedian: 7200,
      listedPrice: 8000,
      deviation: 11.1,
      level: "偏高",
      detail: "報價高於文山區同類型物件中位數 11.1%",
    },
    haunted: {
      status: "safe" as Status,
      label: "凶宅查詢",
      detail: "比對內政部凶宅資料庫，此地址無凶宅紀錄",
      source: "資料來源：內政部不動產成交案件實際資訊資料庫",
    },
  },
  summary: "此物件存在 2 項高風險警示，建議謹慎評估或放棄此物件。",
};

// 第二筆測試資料：展示查到凶宅紀錄的情況
export const mockHauntedDangerResult = {
  haunted: {
    status: "danger" as Status,
    label: "凶宅查詢",
    detail: "此地址於 2019 年有非自然死亡紀錄，建議謹慎評估",
    source: "資料來源：內政部不動產成交案件實際資訊資料庫",
  },
  summary: "此物件存在 3 項高風險警示（含凶宅紀錄），建議謹慎評估或放棄此物件。",
};

export const mockContractResult = {
  fileName: "租賃契約書.pdf",
  analysisTime: "2分14秒",
  riskLevel: "high" as ContractRisk,
  clauses: [
    {
      risk: "high" as ContractRisk,
      label: "提前終止條款",
      original: "房東得於一個月前通知承租人終止租約",
      issue: "違反定型化契約規定，房東不得任意終止租約",
      suggestion: "此條款屬不得記載事項，簽約前應要求房東刪除",
    },
    {
      risk: "high" as ContractRisk,
      label: "押金條款",
      original: "承租人應繳納三個月押金",
      issue: "押金上限為兩個月租金，超過部分違法",
      suggestion: "依法要求押金上限改為兩個月",
    },
    {
      risk: "medium" as ContractRisk,
      label: "修繕責任",
      original: "室內所有設備損壞由承租人自行負責修繕",
      issue: "自然損耗應由房東負責，此條款範圍過廣",
      suggestion: "建議修改為「人為損壞由承租人負責，自然損耗由房東負責」",
    },
    {
      risk: "low" as ContractRisk,
      label: "轉租條款",
      original: "未經房東同意不得轉租",
      issue: "條款本身合法，但建議確認定義範圍",
      suggestion: "符合一般慣例，可接受",
    },
  ],
  resources: [
    { name: "崔媽媽基金會", url: "https://www.tmm.org.tw" },
    { name: "消費者保護官", url: "https://www.cpc.ey.gov.tw" },
  ],
};

export const featureCards = [
  {
    title: "建案合法性",
    description: "比對建物登記謄本，揪出坪數灌水、頂樓加蓋與非法隔間。",
    href: "/check",
  },
  {
    title: "租金合理性",
    description: "對照實價登錄同區同類型行情，判斷報價是否偏高。",
    href: "/check",
  },
  {
    title: "合約條款",
    description: "逐條比對租賃定型化契約，標示違法與不利條款。",
    href: "/contract",
  },
  {
    title: "凶宅查詢",
    description: "比對內政部資料庫，確認是否有非自然死亡紀錄",
    href: "/check",
  },
] as const;
