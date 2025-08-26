import type { MediaItem } from '@/data/mockHome';

export default function Hero({ item }: { item: MediaItem }) {
  return (
    <section className="relative h-[78vh] min-h-[560px] w-full">
      <img src={item.backdrop} alt={item.title}
           className="absolute inset-0 h-full w-full object-cover" />
      {/* 좌→우, 아래→위 그라디언트 겹침 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-28">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
          {item.title}
        </h1>
        <p className="mt-3 max-w-xl text-base md:text-lg text-neutral-200/90">
          {item.detail ?? '상세 설명이 없습니다.'}
        </p>
        <div className="mt-5 flex gap-3">
          <button className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5
                             text-black font-bold hover:bg-white/90">
            ▶ 재생
          </button>
          <button className="inline-flex items-center gap-2 rounded bg-neutral-500/40 px-5 py-2.5
                             text-white font-bold hover:bg-neutral-500/60">
            ⓘ 상세 정보
          </button>
        </div>
      </div>
    </section>
  );
}
