import type { MediaItem } from '@/data/mockHome';

export default function Hero({ item }: { item: MediaItem }) {
  return (
    <section className="relative h-[75vh] min-h-[520px] w-full">
      <img
        src={item.backdrop}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* 어두운 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end gap-4 px-6 pb-24">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">{item.title}</h1>
        <p className="max-w-2xl text-base md:text-lg text-white/85">
          대한민국을 대표하는 장수 예능 프로그램. 다양한 미션을 해결하기 위해 여러 유명 장소를 열심히 뛰어다닙니다.
        </p>
        <div className="mt-2 flex gap-3">
          <button className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 font-semibold text-black hover:bg-white/90">
            ▶ 재생
          </button>
          <button className="inline-flex items-center gap-2 rounded bg-white/30 px-4 py-2 font-semibold text-white hover:bg-white/40">
            ⓘ 상세 정보
          </button>
        </div>
      </div>
    </section>
  );
}
