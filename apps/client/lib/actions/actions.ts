"use server";

import { Product } from "@client/app/(root)/products/cart-products-interface";

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
export async function deleteReview(reviewId: number) {

}
