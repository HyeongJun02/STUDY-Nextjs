import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { hhmmss } from "@/lib/time";
import { SlowCard } from "../parts";

export const metadata = { title: "Suspense 없이 · 스트리밍" };
export const dynamic = "force-dynamic";

/**
 * 같은 카드들인데 <Suspense>로 감싸지 않았다.
 * 경계가 없으니 페이지 전체가 가장 느린 조각(3.2초)을 기다린다.
 */
export default function BlockingPage() {
  return (
    <PageShell
      title="Suspense 없이"
      desc="앞 페이지와 데이터도 지연 시간도 똑같습니다. 다른 건 <Suspense>로 감쌌는지 여부 하나뿐입니다."
    >
      <p className="mb-6 rounded-xl bg-rose-50 px-4 py-3 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
        이 문장도 &quot;즉시&quot; 보이게 적혀 있지만, 실제로는 3.2초 뒤에야 나타납니다 · 서버
        렌더 {hhmmss()} — 아래 카드들과 시각이 거의 같을 겁니다.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Suspense가 없다. 세 카드가 전부 끝나야 페이지가 전송된다. */}
        <SlowCard title="공지" ms={600} body="이미 0.6초에 준비됐지만, 아직 보낼 수 없다." />
        <SlowCard title="통계" ms={1800} body="1.8초에 준비됐지만, 역시 기다린다." />
        <SlowCard title="피드" ms={3200} body="이 조각이 끝나야 비로소 전부 전송된다." />
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          무엇이 달랐나
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          이동하는 동안 <code className="font-mono">loading.tsx</code>가 3.2초 내내 떠
          있었을 겁니다. 먼저 준비된 조각들도 같이 묶여서 기다렸기 때문입니다. 코드 차이는
          이것뿐입니다:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-950 p-4 font-mono text-[12px] leading-relaxed text-zinc-300">
{`  <SlowCard ... />                        ← 이 페이지

  <Suspense fallback={<CardSkeleton />}>   ← 앞 페이지
    <SlowCard ... />
  </Suspense>`}
        </pre>
        <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          총 소요 시간은 같습니다. 바뀐 건 <strong>사용자가 언제부터 뭔가를 보는가</strong>
          입니다.
        </p>
      </div>

      <Link
        href="/suspense"
        className="mt-6 inline-block text-xs text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        ← Suspense 있는 쪽으로 돌아가기
      </Link>
    </PageShell>
  );
}
