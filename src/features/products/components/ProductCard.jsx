"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import { useCart } from "@/context/CartContext";

function ProductCardInner({ product }) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = useCallback(() => {
    addToCart(product, 1);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 1500);
  }, [addToCart, product]);

  const handleToggleFavorite = useCallback(
    (e) => {
      e.preventDefault();
      toggleFavorite(product);
    },
    [toggleFavorite, product]
  );

  const favorite = isFavorite(product.id);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative h-72 w-full overflow-hidden bg-linear-to-b from-zinc-100 via-zinc-50 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          loading="eager"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleToggleFavorite}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-base text-zinc-700 shadow-md hover:bg-white dark:bg-zinc-900/90 dark:text-zinc-100 cursor-pointer"
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {product.brand}
        </div>
        <div className="line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {product.name}
        </div>
        <div className="flex items-center justify-between pt-1 text-xs text-zinc-500">
          <span>{product.category}</span>
          <span>
            ⭐ {product.rating} ({product.ratingCount})
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-orange-500">
            {product.price.toLocaleString("tr-TR")}{" "}
            <span className="text-xs font-normal text-zinc-500">
              {product.currency}
            </span>
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            className={`inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium transition cursor-pointer ${addedMessage
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              }`}
          >
            {addedMessage ? "Səbətə əlavə olundu" : "Səbətə at"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export const ProductCard = memo(ProductCardInner);


