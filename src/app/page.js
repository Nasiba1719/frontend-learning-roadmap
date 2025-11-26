import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import { ProductListClient } from "@/features/products/components/ProductListClient";
import { HeroSlider } from "@/features/home/components/HeroSlider";
import { ProductGridSkeleton } from "@/features/products/components/ProductGridSkeleton";

export default async function Home() {
  let initialProducts = [];
  try {
    initialProducts = await getAllProducts();
  } catch (error) {
    console.error("Home products fetch error:", error);
    initialProducts = [];
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <HeroSlider />

      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Trendyol tipli e-commerce saytı
        </h1>
        <p className="max-w-2xl text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
          Məhsulları axtara, filter edə, detallara baxa və səbətə əlavə edə bilərsiniz.
        </p>
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductListClient initialProducts={initialProducts} />
      </Suspense>
    </div>
  );
}
