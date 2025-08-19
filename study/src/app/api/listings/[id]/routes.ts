import { NextRequest, NextResponse } from 'next/server';
import { SEED_LIST } from '@/mocks/seed';
import type { Listing } from '@/types/listing';

let data: Listing[] = [...SEED_LIST];

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = data.find(d => d.id === params.id);
  if (!item) return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  return NextResponse.json(item);
}
