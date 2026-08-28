import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// toBeInTheDocument() 같은 DOM 전용 매처를 expect에 추가한다.
import "@testing-library/jest-dom/vitest";

// 테스트가 끝날 때마다 화면을 치운다.
// 안 치우면 다음 테스트에 이전 화면이 남아서 "같은 버튼이 2개"가 된다.
afterEach(cleanup);
