import { NextRequest, NextResponse } from 'next/server';
import { SEED_LIST } from '@/mocks/seed';
import type { Listing } from '@/types/listing';

let data: Listing[] = [...SEED_LIST]; // 인메모리 (배포 데모 OK, 영속성 X)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const sort = (searchParams.get('sort') || 'latest') as 'latest'|'priceAsc'|'priceDesc';
  const page = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('pageSize') || '20');

  let items = data.filter(d =>
    (!q || d.title.toLowerCase().includes(q.toLowerCase())) &&
    (!category || d.category === category)
  );

  if (sort === 'latest') items.sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  if (sort === 'priceAsc') items.sort((a,b) => a.price - b.price);
  if (sort === 'priceDesc') items.sort((a,b) => b.price - a.price);

  const total = items.length;
  const start = (page - 1) * pageSize;
  items = items.slice(start, start + pageSize);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newItem: Listing = {
    id: crypto.randomUUID(),
    title: body.title,
    price: Number(body.price),
    desc: body.desc ?? '',
    imageUrl: body.imageUrl ?? '',
    category: body.category ?? '',
    region: body.region ?? '',
    createdAt: new Date().toISOString(),
  };
  data.unshift(newItem);
  return NextResponse.json(newItem, { status: 201 });
}
