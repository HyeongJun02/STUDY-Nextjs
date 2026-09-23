# 프론트 기능 실험실

기술 하나에 페이지 하나. 글로 읽는 대신 **직접 눌러보고 숫자로 확인하는** 학습용 레포입니다.

리렌더가 몇 번 일어나는지, 요청이 서버까지 갔는지 캐시에서 왔는지, 검증이 어디서 막혔는지를
화면에 그대로 띄웁니다.

```bash
npm install
npm run dev      # http://localhost:3000
```

## 페이지

| 경로 | 기술 | 눈으로 확인하는 것 |
|---|---|---|
| `/zustand` | Zustand | props 없이 연결된 세 패널. 구독 대상에 따라 리렌더 횟수가 갈리는 것 |
| `/tailwind` | Tailwind v4 | 렌더된 결과와 그걸 만든 코드를 나란히. 예제 34개 |
| `/query` | TanStack Query | 캐시 히트/미스, `staleTime`, 낙관적 업데이트와 롤백 |
| `/form` | React Hook Form + Zod | 제어/비제어 리렌더 비교, 스키마 한 벌로 브라우저·서버 검증 |
| `/suspense` | Suspense · 스트리밍 | 느린 조각이 늦게 도착하는 것, `loading.tsx`, `error.tsx` |
| `/a11y` | 접근성 | 라이브러리 없이 만든 모달. 포커스 트랩·Esc·스크롤 잠금 |

각 페이지의 코드는 해당 폴더 안에만 있습니다 (`src/app/<기술>/`).

## 테스트

```bash
npm test          # 한 번 실행
npm run test:watch  # 파일 저장할 때마다 자동 실행
```

Vitest + Testing Library. 세 층으로 나눠 확인합니다.

- **순수 함수** — 장바구니 계산, 검증 스키마 규칙
- **컴포넌트** — 사용자가 하듯 버튼을 누르고 화면을 확인
- **라우트 핸들러** — 서버를 띄우지 않고 함수로 직접 호출

## 스택

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 ·
Zustand · TanStack Query · React Hook Form + Zod · Vitest

## 구조

```
src/
  app/
    <기술>/          기술 하나당 폴더 하나. 페이지·컴포넌트·테스트가 함께
      api/           그 페이지가 쓰는 가짜 API (라우트 핸들러)
  components/        페이지 껍데기, 공용 카드, 상단 헤더
  lib/               페이지 목록, 작은 훅
```

가짜 API는 일부러 느립니다. 캐시와 스트리밍의 효과는 서버가 느려야 눈에 보입니다.
