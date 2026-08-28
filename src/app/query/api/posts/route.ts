import { delay, POSTS, servedAt } from "../data";

// 빌드 때 미리 만들어두면 servedAt이 고정되어 데모가 무의미해진다.
export const dynamic = "force-dynamic";

export async function GET() {
  await delay(900); // 느린 서버 흉내
  return Response.json({ posts: POSTS, servedAt: servedAt() });
}
