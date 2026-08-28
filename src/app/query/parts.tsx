"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Post } from "./api/data";

type PostsRes = { posts: Post[]; servedAt: string };
type PostRes = { post: Post; servedAt: string };

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "요청 실패");
  return json as T;
}

/* ------------------------------------------------------------------ 공용 UI */

function Card({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {note && (
        <p className="mt-1 mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {note}
        </p>
      )}
      {children}
    </section>
  );
}

const TONE = {
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  zinc: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
} as const;

function Badge({
  tone = "zinc",
  children,
}: {
  tone?: keyof typeof TONE;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${TONE[tone]}`}
    >
      {children}
    </span>
  );
}

/** 쿼리 하나의 현재 상태를 한 줄로. Devtools가 보여주는 것과 같은 정보다. */
function QueryStatus({
  isPending,
  isFetching,
  isStale,
  servedAt,
}: {
  isPending: boolean;
  isFetching: boolean;
  isStale: boolean;
  servedAt?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {isPending ? (
        <Badge tone="amber">pending · 보여줄 데이터 없음</Badge>
      ) : (
        <Badge tone="green">success</Badge>
      )}
      {isFetching && <Badge tone="amber">fetching · 요청 중</Badge>}
      {!isPending &&
        (isStale ? <Badge>stale</Badge> : <Badge tone="green">fresh</Badge>)}
      {servedAt && <Badge>서버 응답 {servedAt}</Badge>}
    </div>
  );
}

/* -------------------------------------------------- 1. 캐시 + 낙관적 업데이트 */

export function PostsDemo() {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<string | null>(null);
  const [failMode, setFailMode] = useState(false);

  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => api<PostsRes>("/query/api/posts"),
  });

  const detail = useQuery({
    queryKey: ["post", selected],
    queryFn: () => api<PostRes>(`/query/api/posts/${selected}`),
    enabled: selected !== null,
  });

  const like = useMutation({
    mutationFn: (id: string) =>
      api<PostRes>(`/query/api/posts/${id}${failMode ? "?fail=1" : ""}`, {
        method: "POST",
      }),

    // 1) 서버 응답을 기다리지 않고 캐시를 먼저 고친다
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["posts"] }); // 진행 중인 요청이 덮어쓰지 않도록
      const prev = qc.getQueryData<PostsRes>(["posts"]);
      qc.setQueryData<PostsRes>(["posts"], (old) =>
        old
          ? {
              ...old,
              posts: old.posts.map((p) =>
                p.id === id ? { ...p, likes: p.likes + 1 } : p,
              ),
            }
          : old,
      );
      return { prev }; // 2) 실패하면 되돌릴 스냅샷
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(["posts"], ctx.prev); // 롤백
    },

    // 3) 성공이든 실패든 서버 상태로 최종 동기화
    onSettled: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });

  return (
    <Card
      title="1. 캐시 히트 / 미스, 그리고 낙관적 업데이트"
      note="글 제목을 눌러 상세를 열고, 닫았다가 다시 눌러보세요. 두 번째부터는 기다리지 않습니다."
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <QueryStatus
          isPending={posts.isPending}
          isFetching={posts.isFetching}
          isStale={posts.isStale}
          servedAt={posts.data?.servedAt}
        />
        <div className="flex gap-2">
          <button
            onClick={() => posts.refetch()}
            className="rounded-lg border border-zinc-300 px-2.5 py-1 text-xs transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            강제 새로고침
          </button>
          <button
            onClick={() => qc.removeQueries({ queryKey: ["posts"] })}
            className="rounded-lg border border-zinc-300 px-2.5 py-1 text-xs transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            캐시 삭제
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 목록 */}
        <div className="flex flex-col gap-2">
          {posts.isPending && (
            <div className="flex flex-col gap-2">
              {[0, 1, 2, 4].map((i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"
                />
              ))}
            </div>
          )}

          {posts.data?.posts.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition ${
                selected === p.id
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <button
                onClick={() => setSelected(p.id)}
                className="flex-1 text-left text-sm text-zinc-800 hover:text-emerald-600 dark:text-zinc-200"
              >
                {p.title}
              </button>
              <button
                onClick={() => like.mutate(p.id)}
                className="rounded-lg border border-zinc-200 px-2 py-1 font-mono text-xs tabular-nums transition hover:border-rose-400 hover:text-rose-500 dark:border-zinc-700"
              >
                ♥ {p.likes}
              </button>
            </div>
          ))}
        </div>

        {/* 상세 */}
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          {selected === null ? (
            <p className="py-10 text-center text-sm text-zinc-400">
              왼쪽에서 글을 골라보세요
            </p>
          ) : (
            <>
              <QueryStatus
                isPending={detail.isPending}
                isFetching={detail.isFetching}
                isStale={detail.isStale}
                servedAt={detail.data?.servedAt}
              />
              {detail.isPending ? (
                <div className="mt-3 h-16 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              ) : (
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {detail.data?.post.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {detail.data?.post.body}
                  </p>
                </div>
              )}
              <button
                onClick={() => setSelected(null)}
                className="mt-4 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                닫기
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-950/50">
        <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={failMode}
            onChange={(e) => setFailMode(e.target.checked)}
            className="size-3.5 accent-rose-500"
          />
          서버 실패 모드 — 켜고 ♥ 를 누르면, 숫자가 올랐다가 되돌아갑니다 (롤백)
        </label>
        {like.isError && (
          <p className="mt-2 font-mono text-xs text-rose-500">
            mutation error: {like.error.message} → onError에서 이전 캐시로 복구함
          </p>
        )}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------ 2. staleTime */

function TimeCard({ staleTime }: { staleTime: number }) {
  const q = useQuery({
    queryKey: ["time", staleTime],
    queryFn: () => api<{ servedAt: string }>("/query/api/time"),
    staleTime,
  });

  return (
    <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
      <p className="font-mono text-xs text-zinc-500">staleTime: {staleTime}</p>
      <p className="mt-2 font-mono text-lg tabular-nums text-zinc-900 dark:text-zinc-100">
        {q.isPending ? "…" : q.data?.servedAt}
      </p>
      <div className="mt-2">
        <QueryStatus
          isPending={q.isPending}
          isFetching={q.isFetching}
          isStale={q.isStale}
        />
      </div>
    </div>
  );
}

export function StaleTimeDemo() {
  const [mounted, setMounted] = useState(true);

  return (
    <Card
      title="2. staleTime — 언제 서버에 다시 물어보나"
      note="언마운트했다가 다시 마운트해보세요. 왼쪽은 매번 새 시각을 받아오고, 오른쪽은 10초 안에는 캐시를 그대로 씁니다."
    >
      <button
        onClick={() => setMounted((m) => !m)}
        className="mb-3 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs text-white transition hover:bg-emerald-700"
      >
        {mounted ? "언마운트" : "다시 마운트"}
      </button>

      {mounted ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <TimeCard staleTime={0} />
          <TimeCard staleTime={10_000} />
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-zinc-300 py-8 text-center text-xs text-zinc-400 dark:border-zinc-700">
          컴포넌트가 사라졌습니다. 캐시는 gcTime(기본 5분) 동안 남아 있습니다.
        </p>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------- 3. 이벤트 로그 */

type Ev = { id: number; time: string; label: string; tone: keyof typeof TONE };

export function EventLog() {
  const qc = useQueryClient();
  const [events, setEvents] = useState<Ev[]>([]);

  useEffect(() => {
    const now = () => new Date().toLocaleTimeString("ko-KR", { hour12: false });
    const add = (label: string, tone: Ev["tone"]) =>
      setEvents((prev) =>
        [...prev, { id: (prev.at(-1)?.id ?? 0) + 1, time: now(), label, tone }].slice(
          -40,
        ),
      );

    // 캐시에서 벌어지는 일을 그대로 구독한다 (Devtools도 이걸 쓴다)
    const offQuery = qc.getQueryCache().subscribe((e) => {
      if (e.type !== "updated") return;
      const key = JSON.stringify(e.query.queryKey);
      const t = e.action.type;
      if (t === "fetch") add(`fetch  ${key}  → 서버 요청`, "amber");
      else if (t === "success") add(`success ${key}`, "green");
      else if (t === "error") add(`error  ${key}`, "rose");
      else if (t === "invalidate") add(`invalidate ${key} → stale 처리`, "zinc");
    });

    const offMutation = qc.getMutationCache().subscribe((e) => {
      if (e.type !== "updated") return;
      const s = e.mutation.state.status;
      if (s === "pending") add("mutation pending → 캐시를 먼저 수정 (낙관적)", "amber");
      else if (s === "success") add("mutation success", "green");
      else if (s === "error") add("mutation error → 롤백", "rose");
    });

    return () => {
      offQuery();
      offMutation();
    };
  }, [qc]);

  const fetchCount = events.filter((e) => e.label.startsWith("fetch")).length;

  return (
    <Card
      title="3. 캐시 이벤트 로그"
      note="위에서 뭘 누를 때마다 캐시에서 실제로 일어난 일. 캐시 히트면 fetch 줄이 아예 안 찍힙니다."
    >
      <div className="mb-3 flex items-center justify-between">
        <Badge tone="amber">서버 요청 {fetchCount}회</Badge>
        <button
          onClick={() => setEvents([])}
          className="rounded-md border border-zinc-300 px-2 py-1 text-[11px] text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          지우기
        </button>
      </div>

      {/* flex-col-reverse: 새 줄이 아래에 쌓이고 스크롤이 알아서 따라간다 */}
      <div className="flex max-h-72 flex-col-reverse overflow-y-auto rounded-xl bg-zinc-950 p-3 font-mono text-[12px] leading-relaxed">
        {events.length === 0 ? (
          <p className="text-zinc-600">아직 이벤트 없음…</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {events.map((e) => (
              <li key={e.id} className="flex gap-3">
                <span className="text-zinc-600">{e.time}</span>
                <span
                  className={
                    e.tone === "green"
                      ? "text-emerald-400"
                      : e.tone === "amber"
                        ? "text-amber-400"
                        : e.tone === "rose"
                          ? "text-rose-400"
                          : "text-zinc-400"
                  }
                >
                  {e.label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
