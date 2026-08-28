import { z } from "zod";
import { signupSchema, TAKEN_EMAILS } from "../../schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await new Promise((r) => setTimeout(r, 800)); // 느린 서버 흉내

  // 브라우저에서 이미 검증했더라도 서버는 다시 검증한다.
  // 클라이언트 검증은 사용자 편의고, 진짜 방어선은 여기다 (curl로 바로 때릴 수 있으므로).
  const parsed = signupSchema.safeParse(await req.json().catch(() => null));

  if (!parsed.success) {
    // formErrors는 특정 필드에 못 붙는 에러(본문 자체가 깨진 경우 등)
    const { fieldErrors, formErrors } = z.flattenError(parsed.error);
    return Response.json({ fieldErrors, formErrors }, { status: 400 });
  }

  // 스키마로는 알 수 없는 검증 — DB를 봐야 아는 것들
  if (TAKEN_EMAILS.includes(parsed.data.email)) {
    return Response.json(
      { fieldErrors: { email: ["이미 사용 중인 이메일입니다"] } },
      { status: 409 },
    );
  }

  const { email, nickname } = parsed.data; // 비밀번호는 돌려주지 않는다
  return Response.json({ ok: true, user: { email, nickname } });
}
