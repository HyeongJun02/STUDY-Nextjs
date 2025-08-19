import { headers } from 'next/headers';

// Server 전용에서 호출 (Server Component, Route Handler, Server Action)
export async function getBaseUrl() {
  const hdrs = await headers();
  const host  = hdrs.get('x-forwarded-host') ?? hdrs.get('host');
  const proto = hdrs.get('x-forwarded-proto') ?? (process.env.NODE_ENV === 'development' ? 'http' : 'https');

  if (host) return `${proto}://${host}`;
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
