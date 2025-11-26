"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const API =
    process.env.NEXT_PUBLIC_MEAL_API ||
    "https://www.themealdb.com/api/json/v1/1";
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMeals(query = "") {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API}/search.php?s=${query}`);
      if (!res.ok) throw new Error("API Error!");

      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchMeals("chicken");
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight">
          <span className="mr-2">🍽</span>
          Meal App
        </h1>

      
        <div className="flex gap-3 mb-8 max-w-2xl mx-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 shadow-sm
                       focus:outline-none focus:ring-2 ring-blue-500 bg-white"
            placeholder="Search meal (e.g. chicken, pasta, salad...)"
          />

          <button
            onClick={() => fetchMeals(search)}
            className="bg-blue-600 text-white px-6 rounded-xl font-medium shadow-sm
                       hover:bg-blue-700 active:scale-95 transition"
          >
            Search
          </button>
        </div>

    
        {error && (
          <p className="text-center text-red-500 text-lg mb-4">
            Hata: {error}
          </p>
        )}

     
        {loading && (
          <p className="text-center text-gray-500 text-lg mb-4">
            Yükleniyor...
          </p>
        )}

  
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {!loading && meals.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              Yemek bulunamadı.
            </p>
          )}

          {meals.map((meal) => (
            <Link
              key={meal.idMeal}
              href={`/${meal.idMeal}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition 
                         overflow-hidden border border-gray-100 flex flex-col"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                  {meal.strMeal}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {meal.strCategory} {meal.strArea && `• ${meal.strArea}`}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <span className="text-sm text-blue-600 font-medium">
                    Detallara bax
                  </span>

                  <span className="text-xs text-gray-400">ID: {meal.idMeal}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
