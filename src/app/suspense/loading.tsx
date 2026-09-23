import { PageShell } from "@/components/page-shell";
import { CardSkeleton } from "./parts";

/**
 * 이 세그먼트(와 그 하위)로 이동할 때, 서버가 페이지를 만드는 동안 대신 보여주는 화면.
 * Next가 자동으로 <Suspense fallback={이 파일}> 로 감싸준다.
 */
export default function Loading() {
  return (
    <PageShell title="Suspense · 스트리밍" desc="페이지를 준비하는 중입니다…">
      <div className="grid gap-4 md:grid-cols-3">
        {["공지", "통계", "피드"].map((label) => (
          <CardSkeleton key={label} label={label} />
        ))}
      </div>
    </PageShell>
  );
}
