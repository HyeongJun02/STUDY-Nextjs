import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test } from "vitest";
import { Modal } from "./modal";

/**
 * 접근성은 "지켰다고 믿는 것"과 "실제로 되는 것"이 자주 다르다.
 * 여기서 확인하는 건 전부 키보드 사용자에게 직접 영향을 주는 동작이다.
 */
function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>모달 열기</button>
      <Modal open={open} onClose={() => setOpen(false)} title="정말 삭제할까요?">
        되돌릴 수 없습니다.
      </Modal>
    </>
  );
}

const 모달열기 = () => screen.getByRole("button", { name: "모달 열기" });

test("대화상자로 인식되고, 제목이 이름으로 연결된다", async () => {
  const user = userEvent.setup();
  render(<Harness />);

  await user.click(모달열기());

  // aria-labelledby가 제목을 가리키고 있어야 이 이름으로 찾힌다
  expect(screen.getByRole("dialog", { name: "정말 삭제할까요?" })).toBeInTheDocument();
});

test("열면 포커스가 모달 안으로 들어간다", async () => {
  const user = userEvent.setup();
  render(<Harness />);

  await user.click(모달열기());

  expect(screen.getByRole("button", { name: "취소" })).toHaveFocus();
});

test("Tab이 모달 밖으로 새어나가지 않는다", async () => {
  const user = userEvent.setup();
  render(<Harness />);
  await user.click(모달열기());

  await user.tab();
  expect(screen.getByRole("button", { name: "확인" })).toHaveFocus();

  // 마지막에서 한 번 더 누르면 밖으로 나가지 않고 처음으로 돌아온다
  await user.tab();
  expect(screen.getByRole("button", { name: "취소" })).toHaveFocus();

  // 반대 방향도 마찬가지
  await user.tab({ shift: true });
  expect(screen.getByRole("button", { name: "확인" })).toHaveFocus();
});

test("Esc로 닫히고, 열었던 버튼으로 포커스가 돌아온다", async () => {
  const user = userEvent.setup();
  render(<Harness />);
  await user.click(모달열기());

  await user.keyboard("{Escape}");

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  // 이게 없으면 사용자는 닫은 뒤 페이지 맨 처음부터 다시 Tab 해야 한다
  expect(모달열기()).toHaveFocus();
});

test("열려 있는 동안 배경 스크롤을 잠그고, 닫으면 되돌린다", async () => {
  const user = userEvent.setup();
  render(<Harness />);

  await user.click(모달열기());
  expect(document.body.style.overflow).toBe("hidden");

  await user.keyboard("{Escape}");
  expect(document.body.style.overflow).not.toBe("hidden");
});
