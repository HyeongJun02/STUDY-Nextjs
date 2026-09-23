import Link from "next/link";
import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { hhmmss } from "@/lib/time";
import { CardSkeleton, SlowCard } from "./parts";

export const metadata = { title: "Suspense · 스트리밍" };

// 빌드 때 미리 만들어두면 매번 같은 시각이 찍혀 데모가 무의미해진다.
export const dynamic = "force-dynamic";

const CARDS = [
  {
    title: "공지",
    ms: 600,
    body: "가장 빨리 준비되는 조각. 먼저 도착해서 먼저 그려진다.",
  },
  {
    title: "통계",
    ms: 1800,
    body: "조금 느린 조각. 위 카드가 이미 보이는 동안 여기는 아직 뼈대만 있다.",
  },
  {
    title: "피드",
    ms: 3200,
    body: "가장 느린 조각. 이것 때문에 페이지 전체가 기다리지는 않는다.",
  },
];

export default function SuspensePage() {
  return (
    <PageShell
      title="Suspense · 스트리밍"
      desc="서버 컴포넌트가 데이터를 기다리는 동안, 페이지의 나머지는 먼저 도착합니다. 새로고침하면 카드가 하나씩 차례로 채워집니다."
    >
      {/* 이 줄은 기다릴 게 없으므로 즉시 전송된다 */}
      <p className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
        이 문장은 <strong>즉시</strong> 보입니다 · 서버 렌더 {hhmmss()} — 아래 카드들의
        시각과 비교해보세요.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          // Suspense = "여기부터는 나중에 채워도 된다"는 표시.
          // 이 경계가 없으면 페이지 전체가 가장 느린 조각을 기다린다.
          <Suspense key={c.title} fallback={<CardSkeleton label={`${c.ms}ms 대기`} />}>
            <SlowCard {...c} />
          </Suspense>
        ))}
      </div>

      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/suspense/blocking"
          className="group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-rose-400 dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Suspense 없이 하면? →
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            경계를 치지 않고 그냥 <code className="font-mono">await</code> 하면 어떻게
            되는지. 같은 3.2초인데 체감이 완전히 다릅니다.
          </p>
        </Link>

        <Link
          href="/suspense/broken"
          className="group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-rose-400 dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            에러가 나면? →
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            서버 렌더 중 에러가 터지면 <code className="font-mono">error.tsx</code>가
            대신 그려집니다. 다시 시도 버튼까지.
          </p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          /query 와 무엇이 다른가
        </h2>
        <p className="mt-1 mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          둘 다 &quot;느린 데이터를 기다리는&quot; 문제를 풀지만, 기다리는 주체가 다릅니다.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="w-28 py-2 font-medium text-zinc-500"></th>
                <th className="py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  서버 컴포넌트 + Suspense (이 페이지)
                </th>
                <th className="py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  클라이언트 + TanStack Query
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["누가 가져오나", "서버. 브라우저는 완성된 HTML을 받는다", "브라우저. 화면이 뜬 뒤 요청을 보낸다"],
                ["로딩 표시", "fallback / loading.tsx — Next가 처리", "isPending을 보고 직접 그린다"],
                ["에러 처리", "error.tsx가 자동으로 받는다", "isError를 보고 직접 그린다"],
                ["잘 맞는 곳", "첫 진입 화면, 검색엔진에 보여야 하는 것", "사용자 조작에 따라 자주 바뀌는 데이터"],
              ].map(([k, a, b]) => (
                <tr key={k} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/60">
                  <td className="py-3 pr-4 align-top text-zinc-500">{k}</td>
                  <td className="py-3 pr-4 align-top leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {a}
                  </td>
                  <td className="py-3 align-top leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          섞어 쓰는 게 보통입니다. 첫 화면은 서버에서 그려 보내고, 그 뒤 사용자가 만지는
          부분만 클라이언트에서 다시 가져오는 식으로요.
        </p>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-zinc-400">
        코드: <code className="font-mono">src/app/suspense/</code> ·{" "}
        <code className="font-mono">loading.tsx</code>는 페이지 자체를 기다릴 때,{" "}
        <code className="font-mono">{"<Suspense>"}</code>는 페이지 안의 조각을 기다릴 때
        씁니다.
      </p>
    </PageShell>
  );
}
