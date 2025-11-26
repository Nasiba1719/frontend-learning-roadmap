import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { fetchExampleItems } from "@/lib/api/example";

export async function DashboardOverview() {
  const items = await fetchExampleItems();

  return (
    <section className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Layihə strukturu
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Next.js + Tailwind layihən üçün əsas qovluqlar.
          </p>
        </div>
        <PrimaryButton>Yeni modul əlavə et</PrimaryButton>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="font-medium">{item.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}


