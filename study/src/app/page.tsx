import { fetchListings } from '@/lib/api';

type SP = {
  q?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export default async function Home({
  // ✅ searchParams는 이제 Promise
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  // ✅ 먼저 await 해서 꺼낸다
  const sp = await searchParams;

  const { items, total } = await fetchListings({
    q: sp.q,
    category: sp.category,
    sort: (sp.sort as 'latest' | 'priceAsc' | 'priceDesc' | undefined) ?? 'latest',
    page: Number(sp.page ?? '1'),
    pageSize: 20,
  });

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">중고 거래</h1>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <li key={it.id} className="border rounded p-3">
            <a href={`/listings/${it.id}`} className="block">
              <img src={it.imageUrl} alt={it.title} className="w-full h-40 object-cover rounded" />
              <div className="mt-2 font-medium">{it.title}</div>
              <div className="text-sm text-gray-600">{it.price.toLocaleString()}원</div>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-gray-500">총 {total}개</div>
    </main>
  );
}
