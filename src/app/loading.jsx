import { ProductGridSkeleton } from "@/features/products/components/ProductGridSkeleton";

export default function RootLoading() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-64 rounded bg-zinc-200 dark:bg-zinc-700" />
      <ProductGridSkeleton />
    </div>
  );
}


