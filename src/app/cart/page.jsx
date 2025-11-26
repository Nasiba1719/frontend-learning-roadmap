"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  if (!items.length) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight">Səbət</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Səbətiniz boşdur.
        </p>
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-orange-500 hover:underline"
        >
          Məhsullara bax
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Səbət</h1>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-zinc-500">{item.brand}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {item.price.toLocaleString("tr-TR")} {item.currency}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="px-2"
                  >
                    -
                  </button>
                  <span className="min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-zinc-500 hover:text-red-500"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
        <aside className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span>Toplam</span>
            <span className="text-lg font-semibold text-orange-500">
              {cartTotal.toLocaleString("tr-TR")}{" "}
              <span className="text-xs font-normal text-zinc-500">TRY</span>
            </span>
          </div>
          <button
            onClick={clearCart}
            className="w-full rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Səbəti təmizlə
          </button>
        </aside>
      </div>
    </div>
  );
}


