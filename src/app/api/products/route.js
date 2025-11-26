import { NextResponse } from "next/server";
import { getAllProducts, filterProductsInMemory } from "@/lib/products";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  try {
    const allProducts = await getAllProducts();

    const products = filterProductsInMemory(allProducts, {
      search,
      category,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("API /products error:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
