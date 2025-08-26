'use client';
import { useRef } from 'react';
import Card from './Card';
import type { MediaItem } from '@/data/mockHome';

export default function Row({
  title, items, ranked = false,
}: { title: string; items: MediaItem[]; ranked?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (dir: 'L'|'R') => () => {
    const el = ref.current; if (!el) return;
    const amt = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === 'L' ? -amt : amt, behavior: 'smooth' });
  };

  return (
    <section className="px-6 py-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <div className="hidden md:flex gap-2">
          <button onClick={move('L')}
            className="rounded bg-white/10 px-2 py-1 hover:bg-white/20">◀</button>
          <button onClick={move('R')}
            className="rounded bg-white/10 px-2 py-1 hover:bg-white/20">▶</button>
        </div>
      </div>

      <div ref={ref}
           className="mask-x scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth">
        {items.map((it, i) => (
          <Card key={it.id} item={it} rank={ranked ? i + 1 : undefined} />
        ))}
      </div>
    </section>
  );
}
