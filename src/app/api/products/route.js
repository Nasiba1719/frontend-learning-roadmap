import { NextResponse } from "next/server";
import { getAllProducts, filterProductsInMemory } from "@/lib/products";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const allProducts = await getAllProducts();

  const products = filterProductsInMemory(allProducts, {
    search,
    category,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  return NextResponse.json(products);
}

