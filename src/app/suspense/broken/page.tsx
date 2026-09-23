export const dynamic = "force-dynamic";

/** 일부러 터뜨리는 페이지. 상위의 error.tsx가 이걸 받아낸다. */
export default async function BrokenPage() {
  await new Promise((r) => setTimeout(r, 300));
  throw new Error("데이터를 가져오지 못했습니다 (일부러 낸 에러입니다)");
}
