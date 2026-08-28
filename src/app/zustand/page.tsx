import { PageShell } from "@/components/page-shell";
import { CartBadge, CartPanel, LogPanel, ProductList } from "./parts";

export const metadata = { title: "Zustand · 전역 상태 실험" };

const POINTS = [
  ["스토어는 컴포넌트 밖에 있다", "Provider로 감쌀 필요가 없어서 어느 컴포넌트든 import 한 줄로 같은 상태를 본다."],
  ["필요한 조각만 구독한다", "selector가 고른 값이 바뀔 때만 리렌더된다. 각 패널의 render 숫자를 비교해보자."],
  ["파생 값은 저장하지 않는다", "합계·개수는 selector로 그때그때 계산한다. 동기화 버그가 생길 자리 자체가 없다."],
] as const;

export default function ZustandPage() {
  return (
    <PageShell
      title="Zustand"
      desc="서로 부모·자식 관계가 아닌 세 패널이 같은 장바구니 상태를 공유한다. props는 한 개도 오가지 않는다."
      aside={<CartBadge />}
    >

      <div className="grid gap-4 md:grid-cols-2">
        <ProductList />
        <CartPanel />
      </div>

      <div className="mt-4">
        <LogPanel />
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {POINTS.map(([title, body]) => (
          <div
            key={title}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {body}
            </p>
          </div>
        ))}
      </section>

      <p className="mt-6 text-xs text-zinc-400">
        코드: <code className="font-mono">src/app/zustand/store.ts</code> ·{" "}
        <code className="font-mono">src/app/zustand/parts.tsx</code>
      </p>
    </PageShell>
  );
}
