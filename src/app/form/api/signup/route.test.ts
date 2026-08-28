// @vitest-environment node
// 서버 코드라 브라우저(jsdom)가 필요 없다. 파일 맨 위 이 주석 하나로 환경을 바꾼다.

import { describe, expect, test } from "vitest";
import { POST } from "./route";

/**
 * 라우트 핸들러는 그냥 함수다. Request를 넣으면 Response가 나온다.
 * 서버를 띄우지 않아도, curl을 치지 않아도 여기서 그대로 부를 수 있다.
 */
const 가입요청 = (body: unknown) =>
  POST(
    new Request("http://test/form/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );

const 올바른값 = {
  email: "new@example.com",
  nickname: "홍길동",
  password: "abcd1234",
  passwordConfirm: "abcd1234",
  age: 20,
  agree: true,
};

describe("POST /form/api/signup", () => {
  test("올바른 값이면 가입된다", async () => {
    const res = await 가입요청(올바른값);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.user.email).toBe("new@example.com");
    // 비밀번호를 그대로 돌려주면 사고다. 안 돌려주는지 확인한다.
    expect(json.user).not.toHaveProperty("password");
  });

  test("잘못된 값은 필드별 이유와 함께 400", async () => {
    const res = await 가입요청({ ...올바른값, email: "이메일아님", password: "123" });
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.fieldErrors.email).toContain("이메일 형식이 아닙니다");
    expect(json.fieldErrors.password).toContain("8자 이상 입력해주세요");
  });

  test("비밀번호 확인이 다르면 그 칸에 에러가 붙는다", async () => {
    const res = await 가입요청({ ...올바른값, passwordConfirm: "다른비번1" });
    const json = await res.json();

    expect(res.status).toBe(400);
    // password가 아니라 passwordConfirm에 붙어야 화면에서 올바른 칸이 빨개진다
    expect(json.fieldErrors.passwordConfirm).toContain("비밀번호가 일치하지 않습니다");
    expect(json.fieldErrors.password).toBeUndefined();
  });

  test("이미 쓰는 이메일은 409로 구분해서 거절한다", async () => {
    const res = await 가입요청({ ...올바른값, email: "taken@example.com" });
    const json = await res.json();

    // 형식이 틀린 것(400)과 중복(409)은 다른 문제라 상태 코드를 나눈다
    expect(res.status).toBe(409);
    expect(json.fieldErrors.email).toContain("이미 사용 중인 이메일입니다");
  });

  test("본문이 비어 있어도 터지지 않는다", async () => {
    const res = await POST(
      new Request("http://test/form/api/signup", { method: "POST" }),
    );

    expect(res.status).toBe(400);
  });
});
