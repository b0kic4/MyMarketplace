"use server";

export async function getProducts(filter: string, userId?: string) {
  // Construct the query parameters string based on provided filter and userId
  const queryParams = new URLSearchParams({ filter });
  if (userId) queryParams.append("userId", userId);

  const url = `${process.env.NEXT_PUBLIC_NESTJS_URL}/products/getProductsWithFilter?${queryParams}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
export async function getAllProducts() {
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const response = await fetch(`${url}/products/getAll`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}
