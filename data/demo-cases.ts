// 展示模式（F1）預設案例。結果仍取自 mock-data.ts，這裡只記載入時要帶入的輸入，不複製結果資料。
import { contractSamples } from "@/data/contract-samples";
import { mockContractResult } from "@/data/mock-data";

export type CheckDemoCase = {
  id: string;
  title: string;
  description: string;
  district: "文山區";
  rentalType: "獨立套房";
  listedRent: number;
  // true：凶宅模組顯示 mockHauntedDangerResult 的情境示範
  showHauntedRecord: boolean;
};

type ContractDemoCaseBase = {
  id: string;
  title: string;
  description: string;
};

// pdf：只做假的 loading，顯示 mockContractResult；text：把示範文字帶入「貼上合約文字」，跑 F3 規則比對
export type ContractDemoCase =
  | (ContractDemoCaseBase & { kind: "pdf"; fileName: string })
  | (ContractDemoCaseBase & { kind: "text"; text: string });

export const checkDemoCases: readonly CheckDemoCase[] = [
  {
    id: "wenshan-studio",
    title: "文山區頂樓套房",
    description: "坪數不符、疑似頂樓加蓋、租金偏高",
    district: "文山區",
    rentalType: "獨立套房",
    listedRent: 18000,
    showHauntedRecord: false,
  },
  {
    id: "wenshan-studio-haunted",
    title: "同一間房：房東在第 8 項勾選「有」",
    description: "情境示範：現況確認書第 8 項勾選「有」或有新聞報導",
    district: "文山區",
    rentalType: "獨立套房",
    listedRent: 18000,
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
  ...contractSamples.map((sample) => ({
    id: sample.id,
    title: sample.title,
    description: sample.description,
    kind: "text" as const,
    text: sample.text,
  })),
];

export function findCheckDemoCase(id: string | undefined) {
  return checkDemoCases.find((demoCase) => demoCase.id === id);
}

export function findContractDemoCase(id: string | undefined) {
  return contractDemoCases.find((demoCase) => demoCase.id === id);
}
