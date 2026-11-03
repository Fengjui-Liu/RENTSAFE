// 展示模式（F1）預設案例。結果仍取自 mock-data.ts，這裡只記載入時要帶入的輸入，不複製結果資料。
import { mockContractResult } from "@/data/mock-data";

export type CheckDemoCase = {
  id: string;
  title: string;
  description: string;
  uploadedName: string;
  link: string;
  // true：凶宅模組顯示 mockHauntedDangerResult 的情境示範
  showHauntedRecord: boolean;
};

export type ContractDemoCase = {
  id: string;
  title: string;
  description: string;
  kind: "pdf";
  fileName: string;
};

export const checkDemoCases: readonly CheckDemoCase[] = [
  {
    id: "wenshan-studio",
    title: "文山區頂樓套房",
    description: "坪數不符、疑似頂樓加蓋、租金偏高",
    uploadedName: "591_文山區套房截圖.png",
    link: "https://rent.591.com.tw/home/示範物件",
    showHauntedRecord: false,
  },
  {
    id: "wenshan-studio-haunted",
    title: "同一間房：房東在第 8 項勾選「有」",
    description: "情境示範：現況確認書第 8 項勾選「有」或有新聞報導",
    uploadedName: "591_文山區套房截圖.png",
    link: "https://rent.591.com.tw/home/示範物件",
    showHauntedRecord: true,
  },
];

export const contractDemoCases: readonly ContractDemoCase[] = [
  {
    id: "sample-pdf",
    title: "示範租約 PDF",
    description: "押金三個月、禁止遷戶籍等 5 條示範條款",
    kind: "pdf",
    fileName: mockContractResult.fileName,
  },
];

export function findCheckDemoCase(id: string | undefined) {
  return checkDemoCases.find((demoCase) => demoCase.id === id);
}

export function findContractDemoCase(id: string | undefined) {
  return contractDemoCases.find((demoCase) => demoCase.id === id);
}
