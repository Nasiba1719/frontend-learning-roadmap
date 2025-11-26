export async function fetchExampleItems() {
  // Hazırda sadə local data qaytarır.
  // Sonradan bunu real API çağırışı ilə əvəz edə bilərsən.
  return Promise.resolve([
    {
      id: 1,
      title: "components/",
      description: "UI üçün təkrar istifadə olunan React komponentləri.",
    },
    {
      id: 2,
      title: "hooks/",
      description: "Məntiqi təkrar istifadə etmək üçün custom hooks.",
    },
    {
      id: 3,
      title: "lib/",
      description: "Helper funksiyalar, API çağırışları və s.",
    },
    {
      id: 4,
      title: "features/",
      description: "Müəyyən modul üçün (məs: auth, dashboard) xüsusi kodlar.",
    },
  ]);
}


