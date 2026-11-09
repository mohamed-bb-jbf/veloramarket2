"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/lib/data";

export type CartItem = { productId: string; shade?: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (productId: string, shade?: string, qty?: number) => void;
  setQty: (productId: string, shade: string | undefined, qty: number) => void;
  remove: (productId: string, shade?: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "velora-cart";
const same = (a: CartItem, id: string, shade?: string) => a.productId === id && a.shade === shade;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const value = useMemo<CartCtx>(() => {
    const valid = items.filter((i) => getProduct(i.productId));
    return {
      items: valid,
      count: valid.reduce((n, i) => n + i.qty, 0),
      subtotal: valid.reduce((n, i) => n + i.qty * (getProduct(i.productId)?.price ?? 0), 0),
      add: (id, shade, qty = 1) =>
        setItems((prev) => {
          const stock = getProduct(id)?.stock ?? 0;
          const found = prev.find((i) => same(i, id, shade));
          if (found)
            return prev.map((i) => (same(i, id, shade) ? { ...i, qty: Math.min(stock, i.qty + qty) } : i));
          return [...prev, { productId: id, shade, qty: Math.min(stock, qty) }];
        }),
      setQty: (id, shade, qty) =>
        setItems((prev) =>
          prev.map((i) =>
            same(i, id, shade) ? { ...i, qty: Math.max(1, Math.min(getProduct(id)?.stock ?? 1, qty)) } : i,
          ),
        ),
      remove: (id, shade) => setItems((prev) => prev.filter((i) => !same(i, id, shade))),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
