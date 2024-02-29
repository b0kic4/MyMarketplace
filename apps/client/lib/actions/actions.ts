"use server";

const url = process.env.NEXT_PUBLIC_NESTJS_URL;
export async function getProducts(filter: string) {
  let queryParam = filter ? `?filter=${filter}` : "";
  const response = await fetch(`${url}/products/getAll${queryParam}`);
  return response.json();
}
