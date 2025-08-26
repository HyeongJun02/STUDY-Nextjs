'use client';

export default function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/70 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        <div className="text-2xl font-extrabold text-red-600 tracking-tight">NETFLIX</div>
        <nav className="hidden md:flex items-center gap-4 text-sm text-gray-200/90">
          <a href="#" className="hover:text-white">홈</a>
          <a href="#" className="hover:text-white">시리즈</a>
          <a href="#" className="hover:text-white">영화</a>
          <a href="#" className="hover:text-white">NEW</a>
          <a href="#" className="hover:text-white">내가 찜한 리스트</a>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <button aria-label="검색" className="text-white/90 hover:text-white">🔍</button>
          <button aria-label="알림" className="text-white/90 hover:text-white">🔔</button>
          <div className="h-7 w-7 rounded bg-white/30" />
        </div>
      </div>
    </header>
  );
}
