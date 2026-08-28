"use client";

import { create } from "zustand";

export type Product = { id: string; name: string; price: number; emoji: string };

export const PRODUCTS: Product[] = [
  { id: "coffee", name: "원두 200g", price: 12000, emoji: "☕" },
  { id: "mug", name: "머그컵", price: 9000, emoji: "🍵" },
  { id: "book", name: "기술서적", price: 28000, emoji: "📘" },
  { id: "keyboard", name: "기계식 키보드", price: 89000, emoji: "⌨️" },
];

type CartState = {
  items: Record<string, number>; // productId -> 수량
  lastAction: string;
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
};

/**
 * 스토어 하나 = 상태 + 그 상태를 바꾸는 액션.
 * Provider도, reducer도, dispatch도 없다. 어느 컴포넌트에서든 import 해서 쓴다.
 */
export const useCart = create<CartState>((set) => ({
  items: {},
  lastAction: "init",

  add: (p) =>
    set((s) => ({
      items: { ...s.items, [p.id]: (s.items[p.id] ?? 0) + 1 },
      lastAction: `add("${p.id}")`,
    })),

  remove: (id) =>
    set((s) => {
      const items = { ...s.items };
      const next = (items[id] ?? 0) - 1;
      if (next > 0) items[id] = next;
      else delete items[id];
      return { items, lastAction: `remove("${id}")` };
    }),

  clear: () => set({ items: {}, lastAction: "clear()" }),
}));

// 파생 값은 상태로 저장하지 않고 selector로 계산한다 (동기화할 필요가 없어짐).
export const selectCount = (s: CartState) =>
  Object.values(s.items).reduce((a, b) => a + b, 0);

/**
 * 장바구니 줄 목록(상품 + 수량). 상품 목록에 없는 id는 조용히 버린다.
 * persist를 붙였을 때 예전에 담아둔, 지금은 사라진 상품이 들어와도 터지지 않게.
 *
 * 주의: 호출할 때마다 새 배열을 만든다. useCart(cartLines)처럼 selector로 넘기면
 * 매번 참조가 달라져 무한 리렌더가 된다. items를 구독한 뒤 그 값으로 호출할 것.
 */
export const cartLines = (items: CartState["items"]) =>
  Object.entries(items).flatMap(([id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return product ? [{ product, qty }] : [];
  });

export const selectTotal = (s: CartState) =>
  cartLines(s.items).reduce((sum, line) => sum + line.product.price * line.qty, 0);

export type LogEntry = {
  id: number;
  time: string;
  action: string;
  count: number;
  total: number;
};

/** 로그 전용 스토어. 스토어는 여러 개 만들어도 된다 (관심사별로 쪼개는 게 정석). */
export const useLog = create<{
  entries: LogEntry[];
  push: (e: Omit<LogEntry, "id">) => void;
  clear: () => void;
}>((set) => ({
  entries: [],
  push: (e) =>
    set((s) => ({
      // 콘솔처럼 새 줄은 뒤에 붙이고, 오래된 것부터 버린다.
      entries: [...s.entries, { ...e, id: (s.entries.at(-1)?.id ?? 0) + 1 }].slice(-30),
    })),
  clear: () => set({ entries: [] }),
}));
