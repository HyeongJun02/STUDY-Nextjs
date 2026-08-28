import Link from "next/link";
import { SECTIONS } from "./demos";
import { SectionBlock } from "./parts";

export const metadata = { title: "Tailwind · 스타일 카탈로그" };

export default function TailwindPage() {
  const demoCount = SECTIONS.reduce((n, s) => n + s.demos.length, 0);

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <Link
          href="/"
          className="text-xs text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← 홈
        </Link>

        <header className="mt-4 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Tailwind 스타일 카탈로그
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {SECTIONS.length}개 갈래 · 예제 {demoCount}개. 위는 실제로 렌더된 결과,
            아래는 그걸 만든 코드다. hover·focus·반응형 예제는 직접 올려보고 창을
            줄여봐야 보인다.
          </p>
        </header>

        {/* 목차: 스크롤해도 따라오도록 sticky */}
        <nav className="sticky top-0 z-10 -mx-6 mb-10 border-y border-zinc-200 bg-zinc-50/90 px-6 py-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/90">
          <ul className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-14">
          {SECTIONS.map((s) => (
            <SectionBlock key={s.id} section={s} />
          ))}
        </div>

        <p className="mt-14 text-xs leading-relaxed text-zinc-400">
          예제는 전부{" "}
          <code className="font-mono">src/app/tailwind/demos.ts</code> 안의 데이터다.
          미리보기와 코드 블록이 같은 데이터에서 생성되므로 둘이 어긋날 일이 없다.
          <br />
          Tailwind v4.3 기준. v3에서 이름이 바뀐 것들은 해당 예제에 적어뒀다.
        </p>
      </div>
    </div>
  );
}
