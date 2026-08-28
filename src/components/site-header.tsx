"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FEATURES } from "@/lib/features";

/**
 * 모든 페이지 위에 붙는 헤더. 루트 레이아웃에 있으므로 페이지들은 신경 쓸 게 없다.
 * 지금 어느 페이지인지 알아야 해서(usePathname) 클라이언트 컴포넌트다.
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-4 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          <span className="text-base">🧪</span>
          <span className="hidden sm:inline">실험실</span>
        </Link>

        {/* 링크가 넘치면 가로로 스크롤. 모바일에서 줄바꿈으로 헤더 높이가 변하는 것보다 낫다. */}
        <nav className="-mx-2 flex flex-1 items-center gap-1 overflow-x-auto px-2">
          {FEATURES.map((f) => {
            const active = pathname === f.href;
            return (
              <Link
                key={f.href}
                href={f.href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition ${
                  active
                    ? "bg-zinc-200/70 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-900 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
                }`}
              >
                <span>{f.emoji}</span>
                {f.short}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
