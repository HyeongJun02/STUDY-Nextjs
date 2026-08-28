"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState 초기화 함수 안에서 만든다.
  // 모듈 최상단에서 만들면 서버에서 모든 요청이 같은 캐시를 공유하게 된다.
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5_000, // 5초 동안은 "신선함" — 다시 요청하지 않는다
            retry: false, // 실패 데모가 즉시 보이도록 재시도 끔 (기본값은 3회)
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* 이 라이브러리의 최고 장점. 오른쪽 아래 아이콘을 눌러보면 캐시가 통째로 보인다. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
