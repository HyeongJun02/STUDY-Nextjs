import type { Listing } from '@/types/listing';

export const SEED_LIST: Listing[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `L${i + 1}`,
  title: `맥북 프로 ${i + 1}`,
  price: 1200000 + i * 10000,
  desc: '깨끗하게 사용, 생활기스 약간.',
  imageUrl: `https://picsum.photos/seed/${i + 1}/640/480`,
  category: i % 2 === 0 ? '디지털' : '가전',
  region: '서울 강남',
  createdAt: new Date(Date.now() - i * 3600_000).toISOString(),
}));
