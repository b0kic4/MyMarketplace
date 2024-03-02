"use server";

import { Product } from "@client/app/products/cart-products-interface";

// get products with filtering
//
export async function getProducts(filter: string, userId?: string) {
  // Construct the query parameters string based on provided filter and userId
  const queryParams = new URLSearchParams({ filter });
  if (userId) queryParams.append("userId", userId);

  const url = `${process.env.NEXT_PUBLIC_NESTJS_URL}/products/getProductsWithFilter?${queryParams}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
// get products for Main.tsx
export async function getAllProducts() {
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const response = await fetch(`${url}/products/getAll`, { cache: "no-store" });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}


// functionality for saving products
export async function saveProduct(product: Product, userId: string) {
  const data = {
    foundProduct: product,
    userID: userId
  }
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const response = await fetch(`${url}/products/save-product`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Specifies that the body format is JSON
    },
    body: JSON.stringify(data), // Converts the product object to a JSON string
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function removeSavedProduct(product: Product, userId: string) {
  const data = {
    foundProduct: product,
    userID: userId
  }
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const response = await fetch(`${url}/products/remove-saved-product`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json(); // Correctly parses the JSON response body
}

// cart functionalities
export async function getCart(userId: string) {
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;

  const queryParams = new URLSearchParams({ userId });
  const response = await fetch(`${url}/getCartByUserId?${queryParams}`)
  if (!response.ok) throw new Error("Network request failed")
  return response.json()

}


export async function addToCart(product: Product, userId: string) {
  const data = {
    foundProduct: product,
    userID: userId
  };
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const response = await fetch(`${url}/products/add-to-cart`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // Parse the JSON response body once
  const jsonResponse = await response.json();
  // Return the parsed JSON response
  return jsonResponse;
}

export async function removeFromCart(product: Product, userId: string) {
  const data = {
    foundProduct: product,
    userID: userId
  };
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const response = await fetch(`${url}/products/remove-from-cart`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // Parse the JSON response body once
  const jsonResponse = await response.json();
  // Return the parsed JSON response
  return jsonResponse;
}

export async function handleCartProductQuantityChange(productId: number, quantity: number, userId: string) {
  console.log(productId)
  console.log(quantity)
  console.log(userId)
  const url = `${process.env.NEXT_PUBLIC_NESTJS_URL}/products/update-quantity`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: productId,
      quantity: quantity,
      userId: userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response error");
  }

  return response.json();
}
