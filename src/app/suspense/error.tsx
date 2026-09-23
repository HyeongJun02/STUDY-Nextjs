"use client"; // 에러 경계는 클라이언트 컴포넌트여야 한다

import { useEffect } from "react";
import { PageShell } from "@/components/page-shell";

/**
 * 이 세그먼트 안에서 렌더 중 에러가 나면 페이지 대신 이 화면이 그려진다.
 * Next 16부터 두 번째 prop 이름이 reset이 아니라 retry다.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // 실제 서비스라면 여기서 Sentry 같은 곳으로 보낸다
    console.error("[error.tsx가 받은 에러]", error);
  }, [error]);

  return (
    <PageShell
      title="문제가 생겼습니다"
      desc="서버에서 페이지를 만드는 중 에러가 났습니다. 앱 전체가 죽지 않고 이 구역만 이 화면으로 바뀝니다."
    >
      <div className="rounded-2xl border border-rose-300 bg-rose-50 p-5 dark:border-rose-900 dark:bg-rose-950/30">
        <p className="font-mono text-xs break-all text-rose-700 dark:text-rose-300">
          {error.message}
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-rose-500">
            digest: {error.digest} — 서버 로그에서 이 값으로 찾을 수 있습니다
          </p>
        )}

        <button
          onClick={retry}
          className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm text-white transition hover:bg-rose-700"
        >
          다시 시도
        </button>
        <p className="mt-2 text-[11px] text-rose-600/80 dark:text-rose-400/80">
          retry()는 이 구역만 다시 렌더합니다. 페이지 새로고침이 아닙니다.
        </p>
      </div>
    </PageShell>
  );
}
