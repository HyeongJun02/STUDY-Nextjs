import { beforeEach, describe, expect, test } from "vitest";
import { cartLines, PRODUCTS, selectCount, selectTotal, useCart } from "./store";

/**
 * 첫 테스트. 브라우저도, 렌더링도 없이 함수만 확인한다.
 * describe는 그냥 묶음 제목이고, test 하나가 확인 하나다.
 */
describe("cartLines", () => {
  test("담은 상품을 상품 정보와 수량으로 묶어준다", () => {
    const lines = cartLines({ coffee: 2 });

    expect(lines).toHaveLength(1);
    expect(lines[0].product.name).toBe("원두 200g");
    expect(lines[0].qty).toBe(2);
  });

  test("상품 목록에 없는 id는 걸러낸다", () => {
    // persist를 붙였을 때 옛 장바구니에 남아 있을 수 있는 상황
    const lines = cartLines({ coffee: 1, 사라진상품: 3 });

    expect(lines).toHaveLength(1);
    expect(lines[0].product.id).toBe("coffee");
  });

  test("빈 장바구니는 빈 배열", () => {
    expect(cartLines({})).toEqual([]);
  });
});

describe("selectTotal", () => {
  test("가격 × 수량을 모두 더한다", () => {
    // 12,000 × 2 + 9,000 × 1 = 33,000
    const total = selectTotal({ items: { coffee: 2, mug: 1 } } as never);

    expect(total).toBe(33_000);
  });

  test("모르는 상품은 합계에 넣지 않는다", () => {
    const total = selectTotal({ items: { coffee: 1, 사라진상품: 99 } } as never);

    expect(total).toBe(12_000);
  });
});

/**
 * 여기부터는 스토어 자체. 스토어는 모듈 하나에 상태가 살아 있어서
 * 앞 테스트가 담아둔 게 다음 테스트로 넘어간다. 매번 비워주는 게 필수다.
 */
describe("useCart 액션", () => {
  beforeEach(() => {
    useCart.setState({ items: {}, lastAction: "init" });
  });

  test("같은 상품을 두 번 담으면 수량이 2가 된다", () => {
    const coffee = PRODUCTS[0];

    // getState()로 컴포넌트 없이 스토어를 직접 쓸 수 있다
    useCart.getState().add(coffee);
    useCart.getState().add(coffee);

    expect(useCart.getState().items).toEqual({ coffee: 2 });
    expect(selectCount(useCart.getState())).toBe(2);
  });

  test("수량이 0이 되면 목록에서 아예 사라진다", () => {
    const coffee = PRODUCTS[0];

    useCart.getState().add(coffee);
    useCart.getState().remove("coffee");

    // { coffee: 0 } 이 아니라 키 자체가 없어야 한다
    expect(useCart.getState().items).toEqual({});
  });

  test("clear는 전부 비운다", () => {
    useCart.getState().add(PRODUCTS[0]);
    useCart.getState().add(PRODUCTS[1]);

    useCart.getState().clear();

    expect(selectCount(useCart.getState())).toBe(0);
  });
});
