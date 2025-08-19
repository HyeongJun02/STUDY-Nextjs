export interface Listing {
  id: string;
  title: string;
  price: number;     // KRW
  desc: string;
  imageUrl?: string;
  category?: string;
  region?: string;
  createdAt: string; // ISO
}

export interface ListQuery {
  q?: string;
  category?: string;
  sort?: 'latest' | 'priceAsc' | 'priceDesc';
  page?: number;
  pageSize?: number;
}
