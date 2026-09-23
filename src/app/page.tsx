import Link from "next/link";
import { FEATURES, PLANNED } from "@/lib/features";

/**
 * Tailwind는 소스에 적힌 클래스 문자열만 찾아낸다.
 * `bg-${color}-100` 처럼 조립하면 CSS가 안 만들어지므로 통째로 적어둔다.
 */
const ACCENT = {
  emerald: {
    tile: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    border: "hover:border-emerald-400 dark:hover:border-emerald-700",
    glow: "group-hover:bg-emerald-500/20",
    arrow: "group-hover:text-emerald-500",
  },
  sky: {
    tile: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    border: "hover:border-sky-400 dark:hover:border-sky-700",
    glow: "group-hover:bg-sky-500/20",
    arrow: "group-hover:text-sky-500",
  },
  violet: {
    tile: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    border: "hover:border-violet-400 dark:hover:border-violet-700",
    glow: "group-hover:bg-violet-500/20",
    arrow: "group-hover:text-violet-500",
  },
  amber: {
    tile: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    border: "hover:border-amber-400 dark:hover:border-amber-700",
    glow: "group-hover:bg-amber-500/20",
    arrow: "group-hover:text-amber-500",
  },
  rose: {
    tile: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    border: "hover:border-rose-400 dark:hover:border-rose-700",
    glow: "group-hover:bg-rose-500/20",
    arrow: "group-hover:text-rose-500",
  },
} as const;

export default function Home() {
  return (
    <div className="relative flex-1 overflow-hidden bg-zinc-50 dark:bg-black">
      {/* 위쪽에 은은한 빛 하나. 배경이 완전히 밋밋하지 않게. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(50rem_24rem_at_50%_-6rem,rgba(16,185,129,0.16),transparent)]" />

      <main className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
        <header>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <p className="font-mono text-xs text-zinc-500">
              Next.js 16 · App Router · TypeScript
            </p>
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            프론트 기능{" "}
            <span className="bg-linear-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              실험실
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            기술 하나에 페이지 하나. 글로 읽는 대신 직접 눌러보고, 리렌더·캐시·검증이
            실제로 어떻게 도는지 화면에서 확인합니다.
          </p>

          <dl className="mt-8 flex gap-8">
            {[
              ["기술", String(FEATURES.length)],
              ["예정", String(PLANNED.length)],
              ["의존성", "5"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] text-zinc-400">{k}</dt>
                <dd className="font-mono text-xl tabular-nums text-zinc-900 dark:text-zinc-100">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f, i) => {
            const a = ACCENT[f.accent];
            return (
              <li key={f.href}>
                <Link
                  href={f.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 ${a.border}`}
                >
                  {/* 마우스를 올리면 카드 구석에 색이 번진다 */}
                  <div
                    className={`pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-transparent blur-2xl transition duration-300 ${a.glow}`}
                  />

                  <div className="relative flex items-start gap-3">
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-xl text-xl ${a.tile}`}
                    >
                      {f.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <h2 className="truncate text-base font-medium text-zinc-900 dark:text-zinc-100">
                          {f.title}
                        </h2>
                        <span className="ml-auto font-mono text-[11px] text-zinc-300 dark:text-zinc-700">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {f.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-4 flex items-center gap-1.5 pt-3">
                    {f.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                    <span
                      className={`ml-auto text-zinc-300 transition group-hover:translate-x-0.5 dark:text-zinc-600 ${a.arrow}`}
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <section className="mt-14">
          <h2 className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
            다음에 만들 것
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {PLANNED.map((p) => (
              <li
                key={p.title}
                className="rounded-2xl border border-dashed border-zinc-300 p-4 dark:border-zinc-800"
              >
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {p.title}
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500">
                  {p.desc}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <p className="font-mono text-[11px] text-zinc-400">
            npm run dev · localhost:3000
          </p>
        </footer>
      </main>
    </div>
  );
}
