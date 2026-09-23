import { hhmmss } from "@/lib/time";

/** 가짜 서버. 라우트 핸들러들이 공유하는 데이터와 유틸. */

export type Post = { id: string; title: string; body: string; likes: number };

// ponytail: 프로세스 메모리에만 산다. dev 서버를 껐다 켜면 좋아요 수가 초기화된다.
// 진짜 DB가 필요해지면 그때 Prisma로 바꾼다.
export const POSTS: Post[] = [
  {
    id: "cache",
    title: "캐시는 왜 필요한가",
    body: "같은 데이터를 두 번 요청하지 않기 위해서. 그리고 두 번째부터는 기다리지 않기 위해서.",
    likes: 3,
  },
  {
    id: "stale",
    title: "stale 하다는 것",
    body: "데이터가 틀렸다는 뜻이 아니라, 서버에 다시 물어볼 때가 됐다는 뜻이다.",
    likes: 7,
  },
  {
    id: "optimistic",
    title: "낙관적 업데이트",
    body: "서버 응답을 기다리지 않고 화면을 먼저 바꾼다. 실패하면 되돌린다.",
    likes: 1,
  },
  {
    id: "key",
    title: "queryKey 가 곧 캐시 주소",
    body: "키가 같으면 같은 캐시를 본다. 키가 바뀌면 새로 가져온다.",
    likes: 5,
  },
];

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 응답이 캐시에서 온 건지 서버에서 온 건지 눈으로 구분하려고 붙인다. */
export const servedAt = hhmmss;
