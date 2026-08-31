import { expect, test } from "vitest";
import { toCode, type Demo } from "./demos";

/**
 * 이 페이지는 대부분이 스타일 데이터라 테스트할 게 많지 않다.
 * (className에 무슨 클래스가 있는지를 테스트하면 디자인을 바꿀 때마다 깨진다)
 *
 * 다만 toCode는 데이터를 화면에 보여줄 코드 문자열로 바꾸는 진짜 함수라
 * 최소한의 확인은 남겨둔다.
 */
test("toCode는 데이터를 그대로 JSX 문자열로 옮긴다", () => {
  const demo: Demo = {
    title: "예제",
    container: "flex gap-3",
    boxes: [{ cls: "size-12", text: "1" }],
  };

  const code = toCode(demo);

  expect(code).toBe(
    ['<div className="flex gap-3">', '  <div className="size-12">1</div>', "</div>"].join(
      "\n",
    ),
  );
});
