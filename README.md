### 0) 기술 스택(제안)

- Next.js (App Router) + TypeScript
- UI: Tailwind CSS (빠른 프로토타이핑)
- DB: Prisma + SQLite(로컬 개발) → 이후 PlanetScale/PostgreSQL 전환 가능
- 이미지: 1단계 URL만, 2단계 Cloudinary/UploadThing
- 상태/데이터: Server Actions + 캐시(Next) → 필요 시 React Query
- 인증: 1단계 없음 → 2단계 Auth.js(NextAuth) 도입(이메일/구글)

### 1) MVP 범위 (1~2일짜리)

- 기본 페이지
- `/` : 최신 상품 카드 리스트(무한스크롤 or 페이지네이션)
- `/listings/[id]` : 상세 보기(제목/가격/설명/이미지)
- `/sell` : 상품 등록 폼(제목/가격/설명/이미지URL)

- 기능
- 상품 등록(Create) / 목록(Read) / 상세(Read)
- 카테고리/키워드 검색 & 정렬(가격/최신)
- 간단한 지역 필터(텍스트)

> 로그인/채팅/찜/거래 상태 변경은 후속 단계에서 붙임.

### 2) 폴더 구조(초안)
```less
app/
  layout.tsx
  page.tsx                 // 홈(목록)
  listings/
    [id]/page.tsx          // 상세
  sell/
    page.tsx               // 등록 폼
  api/
    listings/route.ts      // POST(생성), GET(목록)
    listings/[id]/route.ts // GET(상세)
components/
  ListingCard.tsx
  ListingGrid.tsx
  ListingForm.tsx
  SearchBar.tsx
  CategoryFilter.tsx
  PriceSorter.tsx
lib/
  db.ts                    // Prisma client
  validations.ts           // zod 스키마(폼 검증)
prisma/
  schema.prisma
styles/
  globals.css
```

### 3) 데이터 모델 (Prisma 예시)
```prisma
// prisma/schema.prisma
datasource db { provider = "sqlite"; url = "file:./dev.db" }
generator client { provider = "prisma-client-js" }

model Listing {
  id        String   @id @default(cuid())
  title     String
  price     Int
  desc      String
  imageUrl  String?
  category  String?
  region    String?        // ex) "서울 강남"
  createdAt DateTime @default(now())
}
```

### 4) API 설계 (App Router / Server Routes)

- `GET /api/listings?query=&category=&sort=&page=` : 목록(검색/정렬/페이지네이션)
- `POST /api/listings` : 등록(본문: {title, price, desc, imageUrl, category, region})
- `GET /api/listings/:id` : 상세

초기엔 **서버 액션(Server Actions)**로 바로 DB쓰기/읽기도 가능.
테스트/디버깅 편하면 API Route 유지해도 OK.

### 5) UI 컴포넌트

- ListingCard: 이미지, 제목, 가격, 지역
- ListingGrid: 카드 그리드 + 무한스크롤(optional)
- ListingForm: zod + react-hook-form으로 검증
- SearchBar / CategoryFilter / PriceSorter: 쿼리스트링과 연동

### 6) 작업 순서(체크리스트)

1. 프로젝트 셋업
- `npx create-next-app@latest --ts`
- Tailwind 설치 & 기본 레이아웃 구성

2. Prisma + SQLite
- `npm i prisma @prisma/client`
- `npx prisma init` → `schema.prisma` 작성 → `npx prisma migrate dev`
- `lib/db.ts`에서 PrismaClient 싱글톤

3. 상품 모델/목록 페이지
- DB 시드 데이터 10~20개 넣고 `/`에서 카드 리스트 렌더
- 페이지네이션 or 무한스크롤(간단히 `?page=`부터)

4. 상세 페이지
- `/listings/[id]` 구현(이미지/가격/설명/등록일)

5. 등록 폼
- `/sell` 페이지
- react-hook-form + zod, 등록 성공 시 상세로 이동

6. 검색/필터/정렬
- 상단 바: 키워드 입력, 카테고리 드롭다운, 가격/최신 정렬
- URL 쿼리스트링 연동(`useSearchParams`)

7. 기본 접근성/성능
- 이미지 `next/image`, 카드 시맨틱 마크업, 폼 라벨
- 리스트 skeleton, 레이지 로딩

여기까지가 1차 완성(MVP). 배포하면 “보여줄 수 있는 결과물” 확보.

### 7) 확장 단계(선택)

- 인증: Auth.js(NextAuth) + OAuth(구글) → /profile, 내 글 관리
- 찜/관심: /favorites + 토글
- 채팅/거래: Conversation, Message 모델 + /chat/[roomId]
- 이미지 업로드: Cloudinary/UploadThing로 실제 업로드(모바일 촬영)
- 거래 상태: status: '판매중' | '예약중' | '거래완료'
- 지역/좌표: 카카오/네이버 지도, 역세권/반경 검색
- 테스트: Vitest/Playwright, e2e 시나리오
- 배포: Vercel(환경변수/DB 연결), PlanetScale/Postgres로 이전

### 8) “정의된 완료(DoD)” 예시

- 홈에서 20개 이상 카드 정상 노출(반응형)
- 검색/카테고리/정렬이 URL과 동기화
- 상세에서 이미지/가격/설명/시간 가독성 OK
- 등록 폼 유효성 검사/실패 메시지/성공 리다이렉트
- Lighthouse 90+ (Performance 제외해도 A11y/Best Practices 90+)

### 9) 바로 시작하는 명령어 (Windows 기준)
```bash
# 1. Next + TS
npx create-next-app@latest my-market --ts --eslint --tailwind --app
cd my-market

# 2. Prisma + SQLite
npm i prisma @prisma/client zod react-hook-form
npx prisma init

# 3. schema 작성 후
npx prisma migrate dev --name init

# 4. 개발 서버
npm run dev
```