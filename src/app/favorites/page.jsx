"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/features/products/components/ProductCard";

export default function FavoritesPage() {
  const { favorites } = useCart();

  if (!favorites.length) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight">Favorilər</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Hələ favoritə əlavə etdiyiniz məhsul yoxdur.
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
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">Favorilər</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


