import { EXTERNAL_API_BASE_URL } from "./config";

// Hər məhsul üçün fərqli rəngli şəkillər (id-ə görə) – 1-dən 20-yə hamısı istifadə olunur
const PRODUCT_IMAGES = {
  1: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800",
  2: "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=800",
  3: "https://images.pexels.com/photos/1961794/pexels-photo-1961794.jpeg?auto=compress&cs=tinysrgb&w=800",
  4: "https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&w=800",
  5: "https://images.pexels.com/photos/2988633/pexels-photo-2988633.jpeg?auto=compress&cs=tinysrgb&w=800",
  6: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=800",
  7: "https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg?auto=compress&cs=tinysrgb&w=800",
  8: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=800",
  9: "https://images.pexels.com/photos/2988635/pexels-photo-2988635.jpeg?auto=compress&cs=tinysrgb&w=800",
  10: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
  11: "https://images.pexels.com/photos/3251532/pexels-photo-3251532.jpeg?auto=compress&cs=tinysrgb&w=800",
  12: "https://images.pexels.com/photos/3251533/pexels-photo-3251533.jpeg?auto=compress&cs=tinysrgb&w=800",
  13: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800",
  14: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800",
  15: "https://images.pexels.com/photos/1961791/pexels-photo-1961791.jpeg?auto=compress&cs=tinysrgb&w=800",
  16: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800",
  17: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800",
  19: "https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800",
  20: "https://images.pexels.com/photos/2988632/pexels-photo-2988632.jpeg?auto=compress&cs=tinysrgb&w=800",
};

function mapApiProduct(apiProduct) {
  const category = apiProduct.category;
  const customImage = PRODUCT_IMAGES[apiProduct.id];

  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    brand: category,
    category,
    price: apiProduct.price,
    currency: "USD",
    rating: apiProduct.rating?.rate ?? 0,
    ratingCount: apiProduct.rating?.count ?? 0,
    image: customImage || apiProduct.image,
    tags: [category],
  };
}

export async function getAllProducts() {
  const res = await fetch(`${EXTERNAL_API_BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch products from FakeStore API");
  }
  const data = await res.json();
  return data.map(mapApiProduct);
}

export async function getProductById(id) {
  const res = await fetch(`${EXTERNAL_API_BASE_URL}/products/${id}`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return mapApiProduct(data);
}

export async function getCategories() {
  const res = await fetch(`${EXTERNAL_API_BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories from FakeStore API");
  }
  return res.json();
}

export function filterProductsInMemory(
  products,
  { search = "", category, minPrice, maxPrice } = {}
) {
  const term = search.toLowerCase();

  return products.filter((p) => {
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term);

    const matchesCategory = !category || p.category === category;

    const matchesMin = minPrice == null || p.price >= minPrice;
    const matchesMax = maxPrice == null || p.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });
}

