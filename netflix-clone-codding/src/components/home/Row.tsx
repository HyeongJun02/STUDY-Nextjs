'use client';

import { useRef } from 'react';
import Card from './Card';
import type { MediaItem } from '@/data/mockHome';

export default function Row({
  title,
  items,
  ranked = false,
}: {
  title: string;
  items: MediaItem[];
  ranked?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 'left' | 'right') => () => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="px-6 py-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <div className="hidden gap-2 md:flex">
          <button onClick={scrollBy('left')} className="rounded bg-white/10 px-2 py-1 hover:bg-white/20">◀</button>
          <button onClick={scrollBy('right')} className="rounded bg-white/10 px-2 py-1 hover:bg-white/20">▶</button>
        </div>
      </div>

      <div
        ref={ref}
        className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth"
      >
        {items.map((it, i) => (
          <Card key={it.id} item={it} rank={ranked ? i + 1 : undefined} />
        ))}
      </div>
    </section>
  );
}
