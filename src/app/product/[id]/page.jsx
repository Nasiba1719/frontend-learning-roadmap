import Image from "next/image";
import { getProductById, getAllProducts } from "@/lib/products";
import { ProductGridSkeleton } from "@/features/products/components/ProductGridSkeleton";
import Link from "next/link";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage(props) {
  const { id } = await props.params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Məhsul tapılmadı.
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-orange-500 hover:underline"
        >
          Ana səhifəyə qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {product.brand}
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <div className="text-xs text-zinc-500">
            ⭐ {product.rating} ({product.ratingCount} rəy)
          </div>
        </div>
        <div className="text-2xl font-semibold text-orange-500">
          {product.price.toLocaleString("tr-TR")}{" "}
          <span className="text-sm font-normal text-zinc-500">
            {product.currency}
          </span>
        </div>
        <div className="space-x-2 text-xs">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              #{tag}
            </span>
          ))}
        </div>
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-orange-500 hover:underline"
        >
          ← Bütün məhsullara qayıt
        </Link>
      </div>
    </div>
  );
}

export function Loading() {
  return <ProductGridSkeleton count={1} />;
}


