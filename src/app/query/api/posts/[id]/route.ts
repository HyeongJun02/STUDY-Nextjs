import { delay, POSTS, servedAt } from "../../data";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params; // Next 15+ 에서 params는 Promise다
  await delay(700);

  const post = POSTS.find((p) => p.id === id);
  if (!post) return Response.json({ error: "없는 글" }, { status: 404 });

  return Response.json({ post, servedAt: servedAt() });
}

/** 좋아요 +1. ?fail=1 을 붙이면 500을 돌려준다 (롤백 데모용). */
export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;
  await delay(700);

  const post = POSTS.find((p) => p.id === id);
  if (!post) return Response.json({ error: "없는 글" }, { status: 404 });

  if (new URL(req.url).searchParams.get("fail") === "1") {
    return Response.json({ error: "서버가 거절했습니다" }, { status: 500 });
  }

  post.likes += 1;
  return Response.json({ post, servedAt: servedAt() });
}
