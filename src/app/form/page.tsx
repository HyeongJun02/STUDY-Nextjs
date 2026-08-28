import Link from "next/link";
import { BypassDemo, RenderCompare, SignupForm } from "./parts";

export const metadata = { title: "폼 · React Hook Form + Zod" };

export default function FormPage() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black">
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="text-xs text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← 홈
        </Link>

        <header className="mt-4 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            React Hook Form + Zod
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            검증 규칙을 스키마 한 곳에 적고, 브라우저와 서버가 그걸 같이 씁니다.
            폼 라이브러리는 리렌더를 줄이려고, 스키마는 규칙이 두 벌로 갈라지지
            않게 하려고 씁니다.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          <RenderCompare />
          <SignupForm />
          <BypassDemo />
        </div>

        <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            스키마 한 벌, 쓰는 곳 세 군데
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["브라우저 검증", "zodResolver(signupSchema)", "타이핑 중에 즉시 안내"],
              ["서버 검증", "signupSchema.safeParse(body)", "진짜 방어선"],
              ["타입", "z.infer<typeof signupSchema>", "폼·API가 같은 타입을 공유"],
            ].map(([where, code, why]) => (
              <div
                key={where}
                className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {where}
                </p>
                <code className="mt-1.5 block font-mono text-[11px] break-all text-emerald-600 dark:text-emerald-400">
                  {code}
                </code>
                <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500">{why}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            규칙을 바꿀 일이 생기면{" "}
            <code className="font-mono">src/app/form/schema.ts</code> 한 파일만 고치면
            됩니다. 클라이언트와 서버 검증을 따로 적어두면 반드시 한쪽만 고치는 날이
            옵니다.
          </p>
        </section>

        <p className="mt-8 text-xs text-zinc-400">
          코드: <code className="font-mono">src/app/form/</code>
        </p>
      </div>
    </div>
  );
}
