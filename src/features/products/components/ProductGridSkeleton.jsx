export function ProductGridSkeleton({ count = 6 }) {
  const items = Array.from({ length: count });
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((_, idx) => (
        <div
          key={idx}
          className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-52 w-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-auto h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  );
}


