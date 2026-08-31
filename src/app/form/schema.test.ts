import { describe, expect, test } from "vitest";
import { z } from "zod";
import { signupSchema } from "./schema";

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  연습 파일. test.todo 를 test 로 바꾸고 직접 채워보세요.       │
 * │  npm run test:watch  로 켜두면 저장할 때마다 바로 채점됩니다. │
 * └─────────────────────────────────────────────────────────────┘
 *
 * 대상: signupSchema — 회원가입 값이 규칙에 맞는지 검사하는 스키마.
 * 규칙은 src/app/form/schema.ts 에 있습니다. 먼저 읽어보세요.
 */

/** 어디에도 걸리지 않는 정상 값. 테스트마다 여기서 한 칸씩만 망가뜨려 쓴다. */
const 정상값 = {
  email: "hong@example.com",
  nickname: "홍길동",
  password: "abcd1234",
  passwordConfirm: "abcd1234",
  age: 20,
  agree: true,
};

/**
 * 스키마에 값을 넣어보고 결과를 쓰기 쉬운 모양으로 바꿔주는 도우미.
 * - 통과하면 null
 * - 걸리면 { 필드이름: ["이유", ...] }
 *
 * 이런 도우미를 만들어두면 테스트 본문이 짧아진다. 테스트도 코드다.
 */
function 검증(값: unknown) {
  const result = signupSchema.safeParse(값);
  return result.success ? null : z.flattenError(result.error).fieldErrors;
}

describe("signupSchema", () => {
  /* ── 예제입니다. 이 모양을 따라 하시면 됩니다. ───────────────────── */

  test("모든 값이 규칙에 맞으면 통과한다", () => {
    // 준비 + 실행
    const 에러 = 검증(정상값);

    // 확인: 걸린 게 없어야 하니 null
    expect(에러).toBeNull();
  });

  test("이메일 형식이 아니면 email 칸에 이유가 붙는다", () => {
    // 정상값에서 email 한 칸만 망가뜨린다
    const 에러 = 검증({ ...정상값, email: "골뱅이없음" });

    expect(에러?.email).toContain("이메일 형식이 아닙니다");
  });

  test("비밀번호가 8자보다 짧으면 password 칸에 이유가 붙는다", () => {
    // 정상값에서 password 한 칸만 망가뜨린다
    const 에러 = 검증({ ...정상값, password: "1234567" });

    expect(에러?.password).toContain("8자 이상 입력해주세요");
  });

  test("비밀번호에 숫자가 하나도 없으면 password 칸에 이유가 붙는다", () => {
    // 정상값에서 password 한 칸만 망가뜨린다
    const 에러 = 검증({ ...정상값, password: "abcdefgh" });

    expect(에러?.password).toContain("숫자를 하나 이상 포함해주세요");
  });


  test("비밀번호 확인이 다르면 passwordConfirm 칸에 붙는다 (password 칸에는 안 붙어야 한다)", () => {
    // password 자체는 규칙을 다 지킨 값이다. 두 칸이 서로 다른 것만 문제.
    const 에러 = 검증({ ...정상값, passwordConfirm: "abcd9999" });

    expect(에러?.passwordConfirm).toContain("비밀번호가 일치하지 않습니다");
    // 화면에서 빨개져야 하는 건 "비밀번호 확인" 칸이지 "비밀번호" 칸이 아니다
    expect(에러?.password).toBeUndefined();
  });

  test("만 14세 미만이면 age 칸에 이유가 붙는다", () => {
    const 에러 = 검증({ ...정상값, age: 13 });

    expect(에러?.age).toContain("만 14세 이상만 가입할 수 있습니다");
  });

  test("약관에 동의하지 않으면 agree 칸에 이유가 붙는다", () => {
    const 에러 = 검증({ ...정상값, agree: false });

    expect(에러?.agree).toContain("약관에 동의해야 합니다");
  });
});
