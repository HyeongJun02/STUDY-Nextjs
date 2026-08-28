import { Providers } from "./provider";

/**
 * /query 아래에서만 QueryClientProvider가 감싼다.
 * 루트 레이아웃에 넣으면 이 기능을 안 쓰는 페이지까지 클라이언트 번들을 지고 간다.
 */
export default function QueryLayout({ children }: LayoutProps<"/query">) {
  return <Providers>{children}</Providers>;
}
