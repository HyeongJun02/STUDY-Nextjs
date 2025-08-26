import type { MediaItem } from '@/data/mockHome';

export default function Card({ item, rank }: { item: MediaItem; rank?: number }) {
  return (
    <div className="group relative min-w-[174px] sm:min-w-[186px] md:min-w-[200px]
                    h-[260px] sm:h-[280px] md:h-[300px]">
      {/* 카드 그림자 & 라운드 */}
      <div className="absolute inset-0 rounded-md bg-neutral-800 shadow
                      transition-transform duration-300 group-hover:-translate-y-1">
        <img src={item.poster} alt={item.title}
             className="h-full w-full rounded-md object-cover
                        transition-transform duration-300 group-hover:scale-[1.06]" />
      </div>

      {/* Top10용 거대 숫자 */}
      {typeof rank === 'number' && (
        <div className="pointer-events-none absolute -left-3 -bottom-8 select-none
                        text-[130px] font-black leading-none tracking-[-0.04em]
                        text-black/50 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          {rank}
        </div>
      )}
    </div>
  );
}
