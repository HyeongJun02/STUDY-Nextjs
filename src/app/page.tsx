import Link from "next/link";

const FEATURES = [
  {
    href: "/zustand",
    emoji: "🐻",
    title: "Zustand",
    desc: "Provider 없이 전역 상태 공유하기. selector로 필요한 조각만 구독하고, 리렌더 횟수를 눈으로 비교한다.",
    tags: ["상태관리", "client"],
  },
];

export default function Home() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl px-6 py-24">
        <p className="font-mono text-xs text-zinc-400">Next.js 16 · App Router</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          프론트 기능 실험실
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          하나씩 직접 만져보며 확인하는 페이지 모음.
        </p>

        <ul className="mt-10 flex flex-col gap-3">
          {FEATURES.map((f) => (
            <li key={f.href}>
              <Link
                href={f.href}
                className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
              >
                <span className="text-2xl">{f.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      {f.title}
                    </h2>
                    {f.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {f.desc}
                  </p>
                </div>
                <span className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-zinc-500 dark:text-zinc-600">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
