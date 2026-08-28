"use client";

import { useEffect } from "react";
import { useRenderCount } from "@/lib/use-render-count";
import {
  cartLines,
  PRODUCTS,
  selectCount,
  selectTotal,
  useCart,
  useLog,
  type Product,
} from "./store";

const won = (n: number) => n.toLocaleString("ko-KR") + "원";

function Panel({
  title,
  subscribes,
  renders,
  children,
  accent = false,
}: {
  title: string;
  subscribes: string;
  renders: number;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <section
      className={`flex flex-col rounded-2xl border p-5 shadow-sm ${
        accent
          ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60"
      }`}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <code className="mt-1 block font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            {subscribes}
          </code>
        </div>
        <span
          className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 font-mono text-[11px] tabular-nums text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          title="이 컴포넌트가 렌더된 횟수"
        >
          render {renders}
        </span>
      </header>
      {children}
    </section>
  );
}

/** 헤더 배지: 개수 하나만 구독한다. 상품 목록과는 부모/자식 관계가 전혀 없다. */
export function CartBadge() {
  const count = useCart(selectCount);
  const renders = useRenderCount();

  return (
    <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <span className="text-lg">🛒</span>
      <span className="font-mono text-sm tabular-nums text-zinc-900 dark:text-zinc-100">
        {count}개
      </span>
      <span className="font-mono text-[11px] text-zinc-400">render {renders}</span>
    </div>
  );
}

/** 상품 목록: 액션(add)만 꺼내 쓴다. 액션은 참조가 고정이라 장바구니가 바뀌어도 리렌더되지 않는다. */
export function ProductList() {
  const add = useCart((s) => s.add);
  const renders = useRenderCount();

  return (
    <Panel title="상품 목록" subscribes="useCart((s) => s.add)" renders={renders}>
      <ul className="flex flex-col gap-2">
        {PRODUCTS.map((p: Product) => (
          <li key={p.id}>
            <button
              onClick={() => add(p)}
              className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2.5 text-left transition hover:border-emerald-400 hover:bg-emerald-50 active:scale-[0.99] dark:border-zinc-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/40"
            >
              <span className="text-xl">{p.emoji}</span>
              <span className="flex-1 text-sm text-zinc-800 dark:text-zinc-200">
                {p.name}
              </span>
              <span className="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                {won(p.price)}
              </span>
              <span className="rounded-md bg-emerald-600 px-2 py-1 text-[11px] font-medium text-white">
                담기
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        담아도 이 패널의 <code className="font-mono">render</code> 숫자는 그대로다.
        액션만 구독했기 때문.
      </p>
    </Panel>
  );
}

/** 장바구니: items를 구독하므로 담을 때마다 리렌더된다. */
export function CartPanel() {
  const items = useCart((s) => s.items);
  const total = useCart(selectTotal);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const renders = useRenderCount();
  const lines = cartLines(items);

  return (
    <Panel
      title="장바구니"
      subscribes="useCart((s) => s.items)"
      renders={renders}
      accent
    >
      {lines.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-400">
          왼쪽에서 상품을 담아보세요
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {lines.map(({ product, qty }) => (
            <li
              key={product.id}
              className="flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2 dark:bg-zinc-900/70"
            >
              <span className="text-lg">{product.emoji}</span>
              <span className="flex-1 text-sm text-zinc-800 dark:text-zinc-200">
                {product.name}
              </span>
              <span className="font-mono text-xs tabular-nums text-zinc-500">
                × {qty}
              </span>
              <button
                onClick={() => remove(product.id)}
                aria-label={`${product.name} 하나 빼기`}
                className="h-6 w-6 rounded-md border border-zinc-300 text-xs text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                −
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-emerald-200/70 pt-3 dark:border-emerald-900/60">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">합계</span>
        <span className="font-mono text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
          {won(total)}
        </span>
      </div>
      <button
        onClick={clear}
        disabled={lines.length === 0}
        className="mt-3 rounded-lg border border-zinc-300 px-3 py-2 text-xs text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        비우기
      </button>
    </Panel>
  );
}

/** 컴포넌트 밖에서도 스토어를 구독할 수 있다 (subscribe). 여기선 그걸로 로그를 남긴다. */
export function LogPanel() {
  const entries = useLog((s) => s.entries);
  const push = useLog((s) => s.push);
  const clearLog = useLog((s) => s.clear);
  const renders = useRenderCount();

  useEffect(
    () =>
      useCart.subscribe((state, prev) => {
        if (state.items === prev.items) return;
        console.log("[zustand]", state.lastAction, state.items);
        push({
          time: new Date().toLocaleTimeString("ko-KR", { hour12: false }),
          action: state.lastAction,
          count: selectCount(state),
          total: selectTotal(state),
        });
      }),
    [push],
  );

  return (
    <Panel
      title="상태 변화 로그"
      subscribes="useCart.subscribe((state, prev) => …)"
      renders={renders}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          같은 내용이 브라우저 콘솔에도 찍힌다
        </p>
        <button
          onClick={clearLog}
          className="rounded-md border border-zinc-300 px-2 py-1 text-[11px] text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          지우기
        </button>
      </div>

      {/* flex-col-reverse: 줄이 늘어나도 스크롤이 알아서 맨 아래에 붙어 있는다 (JS 불필요) */}
      <div className="flex max-h-64 flex-col-reverse overflow-y-auto rounded-xl bg-zinc-950 p-3 font-mono text-[12px] leading-relaxed">
        {entries.length === 0 ? (
          <p className="text-zinc-600">아직 변화 없음…</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {entries.map((e) => (
              <li key={e.id} className="flex gap-3 tabular-nums">
                <span className="text-zinc-600">{e.time}</span>
                <span className="flex-1 text-emerald-400">{e.action}</span>
                <span className="text-zinc-400">
                  count={e.count} total={e.total}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
}
