"use server";

// get products with filtering
export async function getProducts(filter: string, userId?: string) {
  // Construct the query parameters string based on provided filter and userId
  const queryParams = new URLSearchParams({ filter });
  if (userId) queryParams.append("userId", userId);

  const url = `https://server-production-155b.up.railway.app/products/getProductsWithFilter?${queryParams}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
// get products for Main.tsx
export async function getAllProducts() {
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const response = await fetch(
    `https://server-production-155b.up.railway.app/products/getAll`,
    { cache: "no-store" }
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}

// cart and products manipulation
