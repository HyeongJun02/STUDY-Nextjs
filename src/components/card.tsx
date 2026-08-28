/** 데모 한 덩어리를 감싸는 카드. 제목 + 설명 + 내용. */
export function Card({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {note && (
        <p className="mt-1 mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {note}
        </p>
      )}
      {children}
    </section>
  );
}
