import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()], // JSX를 테스트에서도 읽을 수 있게
  test: {
    // 컴포넌트 테스트는 브라우저가 필요하다. jsdom이 가짜 브라우저 역할.
    environment: "jsdom",
    // 각 테스트 파일 실행 전에 돌릴 준비 코드
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    // 소스에서 쓰는 "@/..." 를 테스트에서도 똑같이 알아듣게 (tsconfig의 paths와 짝)
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
