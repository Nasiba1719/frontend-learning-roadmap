"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

export function ProductListClient({ initialProducts }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || undefined;

  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category) params.set("category", category);

        const query = params.toString();
        const url = query ? `/api/products?${query}` : `/api/products`;

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!search && !category && initialProducts?.length) {
      setProducts(initialProducts);
      return;
    }

    fetchProducts();
  }, [search, category, initialProducts]);

  return (
    <div className="space-y-4">
      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}


