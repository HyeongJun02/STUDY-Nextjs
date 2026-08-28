import Link from "next/link";

/**
 * 모든 기술 페이지의 바깥 틀.
 *
 * 페이지마다 max-w를 따로 적었더니 이동할 때마다 본문 폭이 바뀌었다.
 * 폭·여백·뒤로가기·제목은 여기 한 곳에서만 정한다.
 */
export function PageShell({
  title,
  desc,
  aside,
  children,
}: {
  title: string;
  desc?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <Link
          href="/"
          className="text-xs text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← 홈
        </Link>

        <header className="mt-4 mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {title}
            </h1>
            {desc && (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {desc}
              </p>
            )}
          </div>
          {aside}
        </header>

        {children}
      </div>
    </div>
  );
}
