import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

export async function GET(_request, { params }) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

