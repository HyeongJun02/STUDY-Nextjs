import { describe, expect, test } from "vitest";
import { toCode, type Demo } from "./demos";

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  연습 파일. 아래 test.todo 를 test 로 바꾸고 직접 채워보세요.  │
 * │  npm run test:watch  로 켜두면 저장할 때마다 바로 채점됩니다. │
 * └─────────────────────────────────────────────────────────────┘
 *
 * 대상: toCode() — 데모 데이터를 화면에 보여줄 JSX 코드 문자열로 바꾸는 함수.
 * 코드는 src/app/tailwind/demos.ts 맨 아래에 있습니다. 먼저 읽어보세요.
 */

describe("toCode", () => {
  /* ── 여기까지는 예제입니다. 이 모양을 따라 하시면 됩니다. ───────────── */

  test("container 클래스가 첫 줄의 div에 들어간다", () => {
    // 1) 준비: 테스트에 쓸 입력값을 만든다
    const demo: Demo = {
      title: "예제",
      container: "flex gap-3",
      boxes: [],
    };

    // 2) 실행: 확인하려는 함수를 부른다
    const code = toCode(demo);

    // 3) 확인: 기대한 결과인지 본다
    expect(code).toContain('<div className="flex gap-3">');
  });

  /* ── 여기서부터 직접 ──────────────────────────────────────────────
   *
   * 힌트로 쓸 매처들:
   *   expect(문자열).toContain("일부")       문자열 안에 들어있나
   *   expect(값).toBe("정확히 이것")          완전히 같나 (숫자·문자열)
   *   expect(배열).toHaveLength(3)            길이가 맞나
   *   expect(문자열).not.toContain("이건없어야") 없어야 하나
   *
   * 여러 줄 문자열의 줄 수를 세려면: code.split("\n")
   */

  test.todo("박스가 2개면 전체가 4줄이다 (여는 div + 박스 2 + 닫는 div)");

  test.todo("tag를 안 적은 박스는 div로 그려진다");

  test.todo("tag가 input인 박스는 text가 placeholder로 들어가고, 닫는 태그가 없다");

  test.todo("text가 없는 박스는 내용이 비어 있다");
});
