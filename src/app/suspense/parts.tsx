import { hhmmss } from "@/lib/time";

/**
 * 전부 서버 컴포넌트다. "use client"가 없다.
 * await로 데이터를 기다리고, 끝난 조각부터 브라우저로 흘려보낸다(스트리밍).
 */

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 느린 서버 조각. 실제로는 여기서 DB나 외부 API를 부른다. */
export async function SlowCard({
  title,
  ms,
  body,
}: {
  title: string;
  ms: number;
  body: string;
}) {
  await delay(ms); // 느린 조회 흉내

  return (
    <div className="rounded-2xl border border-emerald-300 bg-white p-5 dark:border-emerald-900 dark:bg-zinc-900/60">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
          {ms}ms
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        {body}
      </p>
      <p className="mt-3 font-mono text-[11px] text-zinc-400">
        서버 렌더 {hhmmss()}
      </p>
    </div>
  );
}

/** Suspense가 기다리는 동안 대신 보여줄 자리. 레이아웃이 안 흔들리게 크기를 비슷하게 잡는다. */
export function CardSkeleton({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 p-5 dark:border-zinc-700">
      <div className="flex items-baseline justify-between gap-2">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <span className="font-mono text-[11px] text-zinc-400">{label}</span>
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-4 h-3 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
