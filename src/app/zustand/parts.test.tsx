import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test } from "vitest";
import { CartPanel, ProductList } from "./parts";
import { useCart } from "./store";

/**
 * 컴포넌트 테스트. 진짜 브라우저 대신 jsdom(가짜 DOM) 위에 화면을 그려놓고
 * 사용자가 하듯 버튼을 누른다.
 *
 * 두 컴포넌트는 서로 props를 주고받지 않는다. 그런데도 같이 움직이는지 —
 * 그게 zustand를 쓴 이유이자, 여기서 확인하려는 것이다.
 */
beforeEach(() => {
  useCart.setState({ items: {}, lastAction: "init" });
});

test("상품을 담으면 장바구니에 나타난다", async () => {
  const user = userEvent.setup();
  render(
    <>
      <ProductList />
      <CartPanel />
    </>,
  );

  // 담기 전: 비어 있다는 안내가 보인다
  expect(screen.getByText("왼쪽에서 상품을 담아보세요")).toBeInTheDocument();

  // 사용자가 보는 방식으로 버튼을 찾는다 (클래스명이 아니라 눈에 보이는 글자로)
  await user.click(screen.getByRole("button", { name: /원두 200g/ }));

  expect(screen.getByText("× 1")).toBeInTheDocument();
  expect(screen.queryByText("왼쪽에서 상품을 담아보세요")).not.toBeInTheDocument();
});

test("두 번 담으면 수량과 합계가 같이 오른다", async () => {
  const user = userEvent.setup();
  render(
    <>
      <ProductList />
      <CartPanel />
    </>,
  );

  const 담기 = screen.getByRole("button", { name: /원두 200g/ });
  await user.click(담기);
  await user.click(담기);

  expect(screen.getByText("× 2")).toBeInTheDocument();
  expect(screen.getByText("24,000원")).toBeInTheDocument(); // 12,000 × 2
});

test("빼기 버튼으로 수량을 줄이면 장바구니에서 사라진다", async () => {
  const user = userEvent.setup();
  render(
    <>
      <ProductList />
      <CartPanel />
    </>,
  );

  await user.click(screen.getByRole("button", { name: /원두 200g/ }));
  // aria-label 덕분에 이렇게 찾을 수 있다. 스크린리더가 읽는 이름과 같은 이름이다.
  await user.click(screen.getByRole("button", { name: "원두 200g 하나 빼기" }));

  expect(screen.getByText("왼쪽에서 상품을 담아보세요")).toBeInTheDocument();
});

test("비우기 버튼은 담은 게 없으면 눌리지 않는다", async () => {
  const user = userEvent.setup();
  render(<CartPanel />);

  const 비우기 = screen.getByRole("button", { name: "비우기" });
  expect(비우기).toBeDisabled();

  // 담으면 활성화된다 — 화면 밖(스토어)에서 바꿔도 화면이 따라온다
  useCart.getState().add({ id: "coffee", name: "원두 200g", price: 12_000, emoji: "☕" });
  expect(await screen.findByRole("button", { name: "비우기" })).toBeEnabled();

  await user.click(screen.getByRole("button", { name: "비우기" }));
  expect(screen.getByText("왼쪽에서 상품을 담아보세요")).toBeInTheDocument();
});
