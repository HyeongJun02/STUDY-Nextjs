```bash
src/
  app/
    layout.tsx                 # 반드시 <html><body> 포함(전역 레이아웃)
    globals.css

    (public)/                  # 로그인 전 랜딩/홍보/법적 고지 등
      page.tsx                 # 랜딩 (예: 티저 배경 + CTA)
      help/page.tsx

    (auth)/                    # 인증 라우트 그룹
      signin/page.tsx          # 로그인/회원가입
      profiles/page.tsx        # 프로필 선택(아바타)

    (app)/                     # 로그인 후 앱 영역
      browse/                  # 홈(추천)
        page.tsx               # SSR + 서버컴포넌트
      search/
        page.tsx
      my-list/
        page.tsx
      movie/
        [id]/page.tsx          # 동적 라우트 (영화 상세)
      tv/
        [id]/page.tsx          # 동적 라우트 (시리즈 상세)
      genre/
        [id]/page.tsx          # 장르별 목록
      watch/
        [id]/page.tsx          # 플레이어(동영상 모달/전체화면)

    api/                        # 서버 라우트 (TMDB 프록시/이미지 서명 등)
      tmdb/
        discover/route.ts       # GET /api/tmdb/discover
        search/route.ts         # GET /api/tmdb/search
        trending/route.ts       # GET /api/tmdb/trending
        detail/
          [mediaType]/[id]/route.ts  # GET /api/tmdb/detail/movie/123
      mylist/
        route.ts                # (선택) 임시 인메모리 목록/찜

  components/
    layout/
      AppHeader.tsx            # 상단 네비(프로필/검색/내 리스트)
      AppFooter.tsx
    home/
      Hero.tsx                 # 상단 히어로(큰 배너)
      Row.tsx                  # 가로 캐러셀(타이틀+슬라이더)
      Card.tsx                 # 썸네일 카드
    media/
      MediaModal.tsx           # 상세 모달(영상/정보)
      Player.tsx               # 동영상 플레이어(클라 전용)
    ui/
      Button.tsx
      Skeleton.tsx
      Icon.tsx

  hooks/
    useModal.ts                # 모달 상태
    useMediaQuery.ts
    useScrollLock.ts
    useDebounce.ts

  store/
    modal.store.ts             # zustand (선택)
    mylist.store.ts

  lib/
    env.mjs                    # 환경변수 안전 로더
    tmdb.ts                    # TMDB 호출 유틸(fetcher)
    images.ts                  # 이미지 URL 헬퍼(포스터/백드롭)
    cache.ts                   # revalidate 옵션/태그
    typesafeFetch.ts           # 공통 fetch 래퍼

  types/
    media.ts                   # Movie, TV, Credit, Genre 등 타입
    api.ts                     # API 응답 타입

  styles/
    variables.css              # CSS 커스텀 프로퍼티(색/그라데이션)
    tailwind.css               # (globals에서 import)

  mocks/                       # (선택) 개발용 목 데이터
    seed.ts

public/
  icons/                       # 아이콘/로고
  posters/                     # (선택) 정적 샘플 이미지
```