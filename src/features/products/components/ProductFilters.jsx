"use client";

import { useCallback, useState } from "react";

const CATEGORIES = ["All", "Shoes", "Electronics", "Home"];

export function ProductFilters({ onChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onChange({
        search,
        category: category === "All" ? undefined : category,
      });
    },
    [onChange, search, category]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center"
    >
      <input
        type="text"
        placeholder="Məhsul, marka və ya kateqoriya axtar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none ring-zinc-300 placeholder:text-zinc-400 focus:border-transparent focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-zinc-600"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none ring-zinc-300 focus:border-transparent focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-zinc-600"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Axtar
      </button>
    </form>
  );
}


