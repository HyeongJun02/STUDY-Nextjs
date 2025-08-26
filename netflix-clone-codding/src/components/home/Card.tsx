import type { MediaItem } from '@/data/mockHome';

export default function Card({ item, rank }: { item: MediaItem; rank?: number }) {
  return (
    <div className="relative min-w-[180px] h-[270px] overflow-hidden rounded-md bg-neutral-800">
      <img
        src={item.poster}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
      />
      {typeof rank === 'number' && (
        <div className="pointer-events-none absolute -left-2 -bottom-8 select-none text-[140px] font-black leading-none text-black/50">
          {rank}
        </div>
      )}
    </div>
  );
}
