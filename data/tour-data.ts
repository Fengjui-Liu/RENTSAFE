// F8 情境看房。熱點內容只取自 docs/LEGAL_CHECKLIST.md 區塊 D（現況確認書）與區塊 C（合約規則）。
// 示範房與 F1 預設案例共用；合約相關熱點直接引用 lib/contract-rules.ts 的說明與依據，不另寫一份。
import { findCheckDemoCase, findContractDemoCase } from "@/data/demo-cases";
import { contractRules } from "@/lib/contract-rules";

export type TourHotspot = {
  id: string;
  label: string;
  // 熱點在插圖上的位置（百分比）
  x: number;
  y: number;
  // 風險＝建議向房東確認；ok＝一般正常現象，用來練習分辨正常與可疑
  kind: "risk" | "ok";
  // 揭曉卡三段：你看到的／為什麼（attention）／現場怎麼問
  see: string;
  attention: string;
  ask: string;
  basis: string;
};

export type TourScene = {
  id: "viewing" | "landlord" | "signing";
  title: string;
  description: string;
  hotspots: TourHotspot[];
};

const checkCase = findCheckDemoCase("wenshan-studio");
const contractCase = findContractDemoCase("text-common-risks");

if (!checkCase || !contractCase) {
  throw new Error("tour-data：找不到 F1 預設案例");
}

export const tourHouse = {
  title: checkCase.title,
  description: checkCase.description,
  checkHref: `/check?case=${checkCase.id}`,
  contractHref: `/contract?case=${contractCase.id}`,
};

function fromRule(id: string, label: string, x: number, y: number, see: string, ask: string): TourHotspot {
  const rule = contractRules.find((item) => item.id === id);
  if (!rule) {
    throw new Error(`tour-data：找不到規則 ${id}`);
  }

  return { id: `rule-${id}`, label, x, y, kind: "risk", see, attention: rule.message, ask, basis: rule.basis };
}

const confirmationBasis = (item: number) => `範本附件一 租賃標的現況確認書第 ${item} 項（p10–13）`;

export const tourScenes: TourScene[] = [
  {
    id: "viewing",
    title: "看房現場",
    description: "客廳、廁所、陽台走一圈，這些都是現況確認書要請房東填的項目",
    hotspots: [
      {
        id: "rooftop",
        label: "頂樓陽台",
        x: 82,
        y: 30,
        kind: "risk",
        see: "這間在頂樓，陽台與頂樓空間是常見的增建、加建位置",
        ask: "請問頂樓或陽台有沒有未登記的增建、加建或違建？可以請您填在現況確認書第 1 項嗎？",
        attention:
          "這間在頂樓。請房東說明有無未登記的改建、增建、加建或違建（含頂樓、面積）；範本備註違建有隨時被拆除的風險",
        basis: confirmationBasis(1),
      },
      {
        id: "partition",
        label: "客廳隔間",
        x: 38,
        y: 55,
        kind: "risk",
        see: "客廳一帶有分隔空間的格局",
        ask: "這間的建物型態、格局和出租型態（整層、獨立套房還是分租）是什麼？有沒有隔間？請寫在現況確認書第 2 項。",
        attention: "請房東確認建物型態、格局、有無隔間，以及出租型態（整棟、分層、獨立套房、分租套房、分租雅房）",
        basis: confirmationBasis(2),
      },
      {
        id: "fire-alarm",
        label: "天花板",
        x: 22,
        y: 14,
        kind: "risk",
        see: "天花板上有一個圓形裝置，看起來像火災警報器",
        ask: "有裝住宅用火災警報器嗎？其他消防設施有哪些？多久檢查一次？請寫在現況確認書第 4 項。",
        attention: "看看有沒有住宅用火災警報器，並請房東說明其他消防設施、是否定期消防安全檢查",
        basis: confirmationBasis(4),
      },
      {
        id: "bathroom",
        label: "廁所",
        x: 62,
        y: 62,
        kind: "risk",
        see: "廁所的水氣、水管與牆角，是看房時容易略過的地方",
        ask: "廁所有沒有滲漏水過？怎麼處理的？供水和排水都正常嗎？請寫在現況確認書第 5、9 項。",
        attention: "留意有無滲漏水與處理方式，並確認供水及排水是否正常",
        basis: `範本附件一 租賃標的現況確認書第 5、9 項（p10–13）`,
      },
      {
        id: "window",
        label: "窗戶採光",
        x: 52,
        y: 22,
        kind: "ok",
        see: "窗戶有採光，窗框完整，看不出明顯異狀",
        attention: "這裡看起來是正常的。窗戶能順利開關、鎖得上、窗邊沒有水痕，就屬正常現象，不必過度擔心",
        ask: "（自己確認即可）開關一次窗戶，看看窗邊有沒有水痕或發霉。",
        basis: "一般看房觀察，非現況確認書的重點項目",
      },
      {
        id: "sofa",
        label: "沙發",
        x: 14,
        y: 52,
        kind: "ok",
        see: "沙發與桌椅看起來是普通的家具",
        attention: "家具本身不是風險。要確認的是它算不算房東提供的附屬設備，這點會在「與房東談」那一關處理",
        ask: "（自己確認即可）看看家具有沒有明顯損壞，拍照留存。",
        basis: "一般看房觀察，非現況確認書的重點項目",
      },
    ],
  },
  {
    id: "landlord",
    title: "與房東談",
    description: "有些事看不出來，要請房東寫在現況確認書上",
    hotspots: [
      {
        id: "haunted",
        label: "凶宅風險",
        x: 30,
        y: 28,
        kind: "risk",
        see: "房東口頭說「這間沒什麼問題」，但口頭說明不等於書面紀錄",
        ask: "請問這間房有沒有發生過兇殺、自殺、一氧化碳中毒或其他非自然死亡？請在現況確認書第 8 項勾選。",
        attention:
          "無法以官方資料查證。出租人須說明是否曾發生兇殺、自殺、一氧化碳中毒或其他非自然死亡情事，簽約前請要求房東填寫。房東可在產權持有前勾選「不知道」，填寫結果不等於保證沒有",
        basis: "範本附件一 租賃標的現況確認書第 8 項（p12）",
      },
      fromRule("R3", "今天就要簽？", 70, 24, "房東說「很多人在看，今天不簽就沒了」", "範本載明合約審閱期至少三日，我想先把合約和現況確認書帶回去看，可以嗎？"),
      {
        id: "management-fee",
        label: "管理費",
        x: 22,
        y: 70,
        kind: "risk",
        see: "租金之外，還有管理費這類每月固定支出",
        ask: "管理費和停車位管理費各是多少？有沒有積欠？請寫在現況確認書第 11 項。",
        attention: "請房東說明管理費、停車位管理費，以及有無積欠",
        basis: confirmationBasis(11),
      },
      {
        id: "equipment",
        label: "附屬設備",
        x: 76,
        y: 72,
        kind: "risk",
        see: "家電與家具，哪些是房東提供、哪些不是，口頭很容易記錯",
        ask: "附屬設備可以列成清單嗎？我想在簽約前逐項對照（現況確認書第 12 項）。",
        attention: "請房東列出附屬設備清單，簽約前逐項對照",
        basis: confirmationBasis(12),
      },
    ],
  },
  {
    id: "signing",
    title: "簽約桌",
    description: "合約上這幾條，簽名前要看清楚",
    hotspots: [
      fromRule("R1", "押金", 24, 34, "合約上的押金條款", "押金是幾個月的租金？退還的條件和時間寫在哪一條？"),
      fromRule("R6", "戶籍", 70, 34, "合約上關於遷入戶籍的條款", "合約有沒有限制我遷入戶籍？這條可以刪掉或改寫嗎？"),
      fromRule("R13", "修繕", 26, 72, "合約上的修繕條款", "哪些情況由誰負責修繕？東西壞了要通知誰、多久內處理？"),
      fromRule("R15", "提前終止", 72, 72, "合約上提前終止租約的條款", "提前終止要提前多久通知？有沒有違約金？金額怎麼算？"),
    ],
  },
];

export const tourHotspotCount = tourScenes.reduce((total, scene) => total + scene.hotspots.length, 0);

// ── 房況版本：只改「看房現場」，讓玩家比較「有疑慮」與「沒問題」的房（均為虛構示範）
export type TourProfileId = "rooftop" | "good" | "pricey";

export const tourProfiles: { id: TourProfileId; title: string; note: string; checkNote?: string }[] = [
  { id: "rooftop", title: "文山區頂樓套房", note: "頂樓、隔間、消防、漏水都有要確認的地方" },
  { id: "good", title: "狀況良好的套房", note: "現場看起來都正常，練習分辨「沒問題」" },
  {
    id: "pricey",
    title: "開價偏高的套房",
    note: "現場沒有明顯問題，但租金要另外比對",
    checkNote: "現場看起來都正常，但開價是否合理，肉眼看不出來。這類風險要靠物件查核，拿實價登錄的同區中位數來比對。",
  },
];

type HotspotPatch = Pick<TourHotspot, "kind" | "see" | "attention" | "ask" | "basis">;

// 「狀況良好」與「開價偏高」共用的現場描述（虛構示範：房東已書面說明、現場與書面一致）
const normalViewing: Record<string, HotspotPatch> = {
  rooftop: {
    kind: "ok",
    see: "陽台沒有加蓋的痕跡，現況確認書第 1 項寫明無增建，現場看起來一致",
    attention: "書面與現場吻合，這一項沒有明顯疑慮。保留一份有房東簽名的現況確認書即可",
    ask: "（確認即可）請房東在現況確認書第 1 項簽名，並留一份給自己。",
    basis: confirmationBasis(1),
  },
  partition: {
    kind: "ok",
    see: "格局與現況確認書第 2 項寫的一致，沒有額外隔間",
    attention: "格局和書面相符，沒有看到可疑的隔間。出租型態也與刊登的一致",
    ask: "（確認即可）對照確認書，確認出租型態與刊登資訊相同。",
    basis: confirmationBasis(2),
  },
  "fire-alarm": {
    kind: "ok",
    see: "天花板上有住宅用火災警報器，指示燈正常",
    attention: "有警報器，這一項是正常的。仍可請房東說明其他消防設施的檢查時間",
    ask: "（確認即可）警報器的電池或檢查日期，可以請房東一併說明。",
    basis: confirmationBasis(4),
  },
  bathroom: {
    kind: "ok",
    see: "牆面乾燥，沒有水痕或壁癌，排水順暢",
    attention: "目前沒有看到滲漏水的跡象。不同季節狀況可能不同，簽約前可再放水測試一次",
    ask: "（確認即可）放水試一次，看排水速度，並拍照留存目前狀況。",
    basis: "範本附件一 租賃標的現況確認書第 5、9 項（p10–13）",
  },
};

export function getTourScenes(profileId: TourProfileId): TourScene[] {
  if (profileId === "rooftop") return tourScenes;
  return tourScenes.map((scene) =>
    scene.id !== "viewing"
      ? scene
      : {
          ...scene,
          hotspots: scene.hotspots.map((hotspot) => ({ ...hotspot, ...(normalViewing[hotspot.id] ?? {}) })),
        },
  );
}

// ── 壓力情境（與房東談）：三題，不計分、沒有標準答案，只標示「比較穩妥／比較冒險」
export type PressureOption = { id: string; text: string; tone: "比較穩妥" | "比較冒險"; reaction: string; script: string | null };
export type PressureQuestion = { id: string; title: string; line: string; options: PressureOption[] };

export const pressureQuestions: PressureQuestion[] = [
  {
    id: "rush",
    title: "房東催你今天簽",
    line: "房東說：「很多人在看，你今天不簽，明天就沒了。」",
    options: [
      {
        id: "sign-now",
        text: "好，那我現在就簽",
        tone: "比較冒險",
        reaction: "房東很快拿出合約。但你還沒看完合約條款和現況確認書，簽名後想改就不容易。",
        script: null,
      },
      {
        id: "skim",
        text: "我現場快速翻一下，沒問題就簽",
        tone: "比較冒險",
        reaction: "現場很難逐條看完，又有人在旁邊等，容易漏掉押金、修繕、提前終止這類條款。",
        script: null,
      },
      {
        id: "take-home",
        text: "我想先帶回去看，再回覆您",
        tone: "比較穩妥",
        reaction: "房東可能會再催一次，這時可以平靜地再說一次。範本載明審閱期至少三日，合理的審閱時間本來就是你的權利。",
        script: "我很有興趣，但合約和現況確認書我想帶回去仔細看，確定後再給您答覆，可以嗎？",
      },
    ],
  },
  {
    id: "deposit",
    title: "房東要你先轉訂金",
    line: "房東說：「這間很搶手，你先轉訂金，我才幫你保留。」",
    options: [
      {
        id: "pay-now",
        text: "好，我現在就轉",
        tone: "比較冒險",
        reaction: "沒有書面寫明金額和退還條件，之後退不退、退多少，很容易起爭議。",
        script: null,
      },
      {
        id: "written",
        text: "請先寫明金額和退還條件，雙方簽名再付",
        tone: "比較穩妥",
        reaction: "房東可能覺得麻煩，但書面條件正是保護雙方。願意簽的房東，之後也比較好溝通。",
        script: "如果要先付訂金，請先用書面寫明金額，以及哪些情況下會全額退還，雙方簽名再付款。",
      },
      {
        id: "no-deposit",
        text: "我先不付，等看完合約再決定",
        tone: "比較穩妥",
        reaction: "房東可能說會先租給別人。這是正常的取捨：錯過一間房，通常比簽到有問題的合約容易補救。",
        script: "我想先看完合約和現況確認書再決定，如果您先租給別人，我也能理解。",
      },
    ],
  },
  {
    id: "verbal",
    title: "房東說小事不用寫進合約",
    line: "房東說：「冷氣壞了我會修，這種小事不用寫進合約啦。」",
    options: [
      {
        id: "trust",
        text: "好，相信您",
        tone: "比較冒險",
        reaction: "口頭承諾事後很難舉證。真的壞了，誰負責、多久修，可能各說各話。",
        script: null,
      },
      {
        id: "write-in",
        text: "請寫進合約或附件，我比較放心",
        tone: "比較穩妥",
        reaction: "範本預設由出租人負責修繕，寫進去只是把原本的約定寫清楚，房東通常不好拒絕。",
        script: "冷氣和其他附屬設備的修繕責任，可以請您寫進合約或附屬設備清單嗎？這樣我們雙方都有依據。",
      },
      {
        id: "photo",
        text: "先拍照存證設備現況，再簽約",
        tone: "比較穩妥",
        reaction: "拍照能證明簽約時的狀態，之後處理損壞責任時有依據。建議搭配附屬設備清單一起留存。",
        script: null,
      },
    ],
  },
];
