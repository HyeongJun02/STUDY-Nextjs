import Link from "next/link";
import { EventLog, PostsDemo, StaleTimeDemo } from "./parts";

export const metadata = { title: "TanStack Query · 서버 상태" };

const COMPARE = [
  {
    what: "무엇을 담나",
    zustand: "화면의 상태 — 모달 열림, 선택된 탭, 장바구니",
    query: "서버에 있는 데이터의 사본 — 글 목록, 유저 정보",
  },
  {
    what: "진짜 주인",
    zustand: "브라우저. 여기 있는 값이 곧 진실이다.",
    query: "서버. 여기 있는 건 언제든 낡을 수 있는 사본이다.",
  },
  {
    what: "그래서 필요한 것",
    zustand: "값을 바꾸는 함수",
    query: "캐시, 만료 시각, 재요청, 로딩/에러 상태",
  },
] as const;

export default function QueryPage() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <Link
          href="/"
          className="text-xs text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← 홈
        </Link>

        <header className="mt-4 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            TanStack Query
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            일부러 느리게 만든 가짜 API(목록 900ms, 상세 700ms)에 붙어 있습니다.
            무엇을 눌렀을 때 서버로 요청이 나가고 무엇이 캐시에서 오는지, 맨 아래
            로그로 확인하세요.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          <PostsDemo />
          <StaleTimeDemo />
          <EventLog />
        </div>

        {/* 이 페이지의 진짜 요점 */}
        <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            왜 API 응답을 zustand에 넣지 않는가
          </h2>
          <p className="mt-1 mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            면접에서 자주 나오는 질문. 둘은 경쟁 관계가 아니라 담는 게 다릅니다.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="w-32 py-2 font-medium text-zinc-500"></th>
                  <th className="py-2 font-medium text-zinc-900 dark:text-zinc-100">
                    Zustand (클라이언트 상태)
                  </th>
                  <th className="py-2 font-medium text-zinc-900 dark:text-zinc-100">
                    TanStack Query (서버 상태)
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr
                    key={row.what}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/60"
                  >
                    <td className="py-3 pr-4 align-top text-zinc-500">{row.what}</td>
                    <td className="py-3 pr-4 align-top leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {row.zustand}
                    </td>
                    <td className="py-3 align-top leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {row.query}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            서버 데이터를 전역 상태에 직접 넣으면 캐시·만료·재요청·로딩·에러를 전부
            손으로 짜게 됩니다. 이 페이지에서 한 일이 정확히 그{" "}
            <em className="not-italic text-zinc-900 dark:text-zinc-100">
              직접 짜지 않아도 되는 부분
            </em>{" "}
            입니다.
          </p>
        </section>

        <p className="mt-8 text-xs leading-relaxed text-zinc-400">
          코드: <code className="font-mono">src/app/query/</code> · 가짜 API는{" "}
          <code className="font-mono">src/app/query/api/</code>
          <br />
          오른쪽 아래 꽃 아이콘을 누르면 공식 Devtools가 열립니다 — 캐시에 뭐가
          들어있는지 통째로 보입니다.
        </p>
      </div>
    </div>
  );
}
