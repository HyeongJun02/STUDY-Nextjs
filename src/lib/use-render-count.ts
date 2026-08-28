"use client";

import { useRef } from "react";

/**
 * 이 컴포넌트가 몇 번 렌더됐는지 세는 데모용 훅.
 *
 * 렌더 중 ref를 건드리는 건 원래 금지(순수하지 않음)지만, 리렌더를 눈으로
 * 보여주는 게 목적이라 예외로 둔다. 실제 기능 코드에 복붙하지 말 것.
 * dev(StrictMode)에서는 2배로 세므로 절대값이 아니라 서로 비교하는 용도로만 본다.
 */
/* eslint-disable react-hooks/refs -- 렌더 횟수 시각화용 데모 */
export function useRenderCount() {
  const n = useRef(0);
  n.current += 1;
  return n.current;
}
/* eslint-enable react-hooks/refs */
