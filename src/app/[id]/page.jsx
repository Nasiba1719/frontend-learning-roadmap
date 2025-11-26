import Link from "next/link";

const API =
    process.env.NEXT_PUBLIC_MEAL_API ||
    "https://www.themealdb.com/api/json/v1/1";

async function getMeal(id) {
    const res = await fetch(`${API}/lookup.php?i=${id}`);

    if (!res.ok) {
        throw new Error("API error");
    }

    const data = await res.json();
    return data.meals?.[0] || null;
}

function getIngredients(meal) {
    if (!meal) return [];

    const items = [];

    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ing && ing.trim()) {
            items.push({
                ingredient: ing.trim(),
                measure: measure?.trim() || "",
            });
        }
    }

    return items;
}

export default async function MealDetailPage({ params }) {
    // Next 16 + React 19: params Promise ola bilər, əvvəlcə await edirik
    const resolvedParams = await params;
    const meal = await getMeal(resolvedParams.id);

    if (!meal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4">
                    <p className="text-2xl font-semibold">Yemek tapılmadı</p>
                    <Link
                        href="/"
                        className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                    >
                        ← Ana səhifəyə qayıt
                    </Link>
                </div>
            </div>
        );
    }

    const ingredients = getIngredients(meal);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto p-6 md:p-8 max-w-5xl">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                    ← Geri
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-[2fr,3fr]">
                    <div className="relative h-64 md:h-full">
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                            <h1 className="text-2xl md:text-3xl font-bold drop-shadow">
                                {meal.strMeal}
                            </h1>
                            <p className="text-sm md:text-base opacity-90">
                                {meal.strCategory} {meal.strArea && `• ${meal.strArea}`}
                            </p>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col gap-5">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                    Ingredients
                                </h2>
                                <ul className="space-y-1 max-h-52 overflow-y-auto pr-2 text-sm text-gray-700">
                                    {ingredients.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between gap-3 border-b border-gray-100 pb-1"
                                        >
                                            <span>• {item.ingredient}</span>
                                            {item.measure && (
                                                <span className="text-gray-500">{item.measure}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                    Instructions
                                </h2>
                                <p className="text-sm text-gray-700 whitespace-pre-line max-h-52 overflow-y-auto pr-2 leading-relaxed">
                                    {meal.strInstructions}
                                </p>
                            </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-3">
                            {meal.strSource && (
                                <Link
                                    href={meal.strSource}
                                    target="_blank"
                                    className="text-sm px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
                                >
                                    Mənbə sayta get
                                </Link>
                            )}
                            {meal.strYoutube && (
                                <Link
                                    href={meal.strYoutube}
                                    target="_blank"
                                    className="text-sm px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                                >
                                    ▶ YouTube videoya bax
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


