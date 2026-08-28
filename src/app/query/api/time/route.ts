import { delay, servedAt } from "../data";

export const dynamic = "force-dynamic";

/** staleTime 데모용. 응답 시각만 돌려준다 — 시각이 그대로면 캐시에서 온 것. */
export async function GET() {
  await delay(500);
  return Response.json({ servedAt: servedAt() });
}
