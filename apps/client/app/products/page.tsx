"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import Image from "next/image";
import Headerbar from "./components/Headerbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, ProductImage } from "./cart-products-interface";
import Navbuttons from "./components/Navbuttons";
import { useUser } from "@clerk/nextjs";
import ProductsSkeletonLoader from "../components/ProductsSkeletonLoader";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { saveProduct } from "@client/lib/actions/actions";
import { removeSavedProduct } from "@client/lib/actions/actions";
import { addToCart } from "@client/lib/actions/actions";
import { removeFromCart } from "@client/lib/actions/actions";


const Productpage = () => {
  const searchParams = useSearchParams();
  const user = useUser()
  const filter = searchParams.get("filter") || "all";
  const userId = user.user?.id as string;
  const queryParams = new URLSearchParams({ filter });
  const cartQueryParams = new URLSearchParams({ userId });
  const [productIdsInCart, setProductIdsInCart] = useState<number[]>([]);

  // fetching products
  if (userId) queryParams.append("userId", userId);

  const apiProdUrl = `${process.env.NEXT_PUBLIC_NESTJS_URL}/products/getProductsWithFilter?${queryParams}`;

  const apiCartUrl = `${process.env.NEXT_PUBLIC_NESTJS_URL}/cart/getCartByUserId?${cartQueryParams}`
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: products, error } = useSWR(apiProdUrl, fetcher);
  const { data: cart } = useSWR(apiCartUrl, fetcher)
  // console.log("cart: ", cart)

  useEffect(() => {
    if (cart && cart.products) { // Ensuring both cart and cart.products are not undefined
      const productIds = cart.products.map((product: any) => product.product.id) as number[] | undefined;
      setProductIdsInCart(productIds || []); // Use an empty array if productIds is undefined
    } else {
      setProductIdsInCart([]); // Ensuring productIdsInCart is reset/empty if cart or cart.products are undefined
    }
  }, [cart]);

  const handleAddToCart = async (product: Product) => {
    await addToCart(product, userId);
    setProductIdsInCart((currentIds) => [...currentIds, product.id]);
    mutate(apiCartUrl); // Trigger revalidation
  };

  const handleRemoveFromCart = async (product: Product) => {
    await removeFromCart(product, userId);
    setProductIdsInCart((currentIds) => currentIds.filter(id => id !== product.id));
    mutate(apiCartUrl); // Trigger revalidation
  };

  const handleSaveProduct = async (product: Product) => {
    await saveProduct(product, userId)
    mutate(apiProdUrl)
  }
  const handleRemoveSavedProduct = async (product: Product) => {
    await removeSavedProduct(product, userId)
    mutate(apiProdUrl)
  }


  if (!products && !error) {
    return (
      <div className="flex flex-1 min-h-screen min-w-full">
        <div className="flex-1 flex w-full flex-col min-h-screen">
          <Headerbar />
          <section className="grid gap-6 md:gap-8 p-4 md:p-6">
            <Navbuttons />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6">
              {/* Render multiple skeleton loaders based on an estimated number of products */}
              {Array.from({ length: 8 }, (_, index) => (
                <ProductsSkeletonLoader key={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  } if (error) return <div>Failed to load products.</div>;

  return (
    <div className="flex flex-1 min-h-screen min-w-full">
      <div className="flex-1 flex w-full flex-col min-h-screen">
        {/* Headerbar */}
        <Headerbar />
        <section className="grid gap-6 md:gap-8 p-4 md:p-6">
          {/* nav buttons */}
          <Navbuttons />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6">
            {products.length > 0 ? (
              products.map((product: Product) => (
                <Card className="p-1" key={product.id}>
                  <CardContent className="p-4">
                    <Link href={`/products/${product.id}`}>
                      {product.images.map(
                        (image: ProductImage, index: number) =>
                          image.isLogo === true || image.isLogo === "true" ? (
                            <Image
                              key={index}
                              alt={product.title}
                              className="mx-auto rounded-lg aspect-[1/1] overflow-hidden object-cover object-center"
                              height={500}
                              src={image.imageUrl || "/placeholder.svg"}
                              width={500}
                            />
                          ) : null
                      )}
                    </Link>
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-xl font-bold">{product.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.description}
                      </p>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Category: {product.categoryType}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <p className="text-gray-500">by:</p>
                      <p className="text-gray-700 font-semibold">
                        {product.user && product.user.username}
                      </p>
                    </div>
                    <div className="flex py-1">
                      <Link href={`/products/${product.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">${product.price}</span>
                    <div className="items-center text-center flex gap-2">
                      {productIdsInCart.includes(product.id)
                        ? (
                          <Button
                            key={product.id}
                            onClick={() => handleRemoveFromCart(product)}
                            size="sm"
                            variant="outline"
                          >
                            Remove from Cart
                          </Button>
                        ) : (
                          <Button
                            key={product.id}
                            onClick={() => handleAddToCart(product)}
                            size="sm"
                            variant="outline"
                          >
                            Add to Cart
                          </Button>
                        )}
                      {product.savedByUsers.some(
                        (u) => u.clerkUserId === user.user?.id
                      ) ? (
                        <>
                          <Button
                            onClick={() => handleRemoveSavedProduct(product)}
                            size="sm"
                            variant="outline"
                          >
                            <FaBookmark />
                          </Button>

                        </>
                      ) : <Button
                        onClick={() => handleSaveProduct(product)}
                        size="sm"
                        variant="outline"
                      >
                        <FaRegBookmark />
                      </Button>}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>No Products found</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Productpage;
