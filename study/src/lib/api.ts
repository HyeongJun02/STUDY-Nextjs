// src/lib/api.ts
import type { ListQuery, Listing } from '@/types/listing';
import { getBaseUrl } from './baseUrl';

export async function fetchListings(q: ListQuery = {}) {
  const usp = new URLSearchParams(
    Object.fromEntries(Object.entries(q).filter(([, v]) => v != null)) as [string, string][]
  );

  const base = typeof window === 'undefined' ? await getBaseUrl() : '';
  const res = await fetch(`${base}/api/listings?${usp.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed');
  return res.json() as Promise<{ items: Listing[]; total: number }>;
}

export async function fetchListing(id: string) {
  const base = typeof window === 'undefined' ? await getBaseUrl() : '';
  const res = await fetch(`${base}/api/listings/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed');
  return res.json() as Promise<Listing>;
}

// createListing은 보통 클라이언트에서 호출 → 상대 경로 OK
export async function createListing(input: Partial<Listing>) {
  const res = await fetch(`/api/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to create');
  return res.json() as Promise<Listing>;
}
