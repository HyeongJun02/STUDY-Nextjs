/**
 * 만든 페이지 목록. 홈 카드와 상단 헤더가 같은 데이터를 쓴다.
 * 페이지를 추가하면 여기 한 줄만 늘리면 양쪽에 다 반영된다.
 */
export type Feature = {
  href: string;
  emoji: string;
  title: string;
  /** 헤더처럼 좁은 곳에서 쓸 짧은 이름 */
  short: string;
  desc: string;
  tags: string[];
  accent: "emerald" | "sky" | "violet" | "amber";
};

export const FEATURES: Feature[] = [
  {
    href: "/zustand",
    emoji: "🐻",
    title: "Zustand",
    short: "Zustand",
    desc: "Provider 없이 전역 상태 공유하기. selector로 필요한 조각만 구독하고, 리렌더 횟수를 눈으로 비교한다.",
    tags: ["상태관리", "리렌더"],
    accent: "emerald",
  },
  {
    href: "/tailwind",
    emoji: "🎨",
    title: "Tailwind",
    short: "Tailwind",
    desc: "레이아웃부터 애니메이션까지, 렌더된 결과와 그걸 만든 코드를 나란히 보는 스타일 카탈로그.",
    tags: ["CSS", "v4"],
    accent: "sky",
  },
  {
    href: "/query",
    emoji: "🔄",
    title: "TanStack Query",
    short: "Query",
    desc: "느린 가짜 API에 붙여 캐시 히트/미스, staleTime, 낙관적 업데이트와 롤백을 이벤트 로그로 확인한다.",
    tags: ["서버 상태", "캐싱"],
    accent: "violet",
  },
  {
    href: "/form",
    emoji: "📝",
    title: "React Hook Form + Zod",
    short: "Form",
    desc: "스키마 하나로 브라우저와 서버가 같이 검증한다. 제어 컴포넌트와 리렌더 횟수도 나란히 비교.",
    tags: ["폼", "검증"],
    accent: "amber",
  },
];

/** 다음에 만들 것. 투두를 문서가 아니라 화면에 둔다. */
export const PLANNED = [
  { title: "Suspense · 스트리밍", desc: "loading.tsx / error.tsx, 서버 컴포넌트로 가져오기" },
  { title: "접근성 모달", desc: "포커스 트랩, Esc, aria-*, 스크롤 잠금 — 직접 구현" },
  { title: "중고거래 MVP", desc: "실험실을 멈추고 완성된 서비스 하나로" },
];
