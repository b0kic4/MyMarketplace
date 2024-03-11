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
import ProductsSkeletonLoader from "../../components/ProductsSkeletonLoader";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { saveProduct } from "@client/lib/actions/actions";
import { removeSavedProduct } from "@client/lib/actions/actions";
import { addToCart } from "@client/lib/actions/actions";
import { removeFromCart } from "@client/lib/actions/actions";
import { toast } from "react-toastify";

const Productpage = () => {
  const searchParams = useSearchParams();
  const user = useUser()

  const filter = searchParams.get("filter") || "all";
  const userId = user.user?.id as string;

  const [productIdsInCart, setProductIdsInCart] = useState<number[]>([]);
  const [savedProductIds, setSavedProductIds] = useState<number[]>([]);

  const [apiProdUrl, setApiProdUrl] = useState<string>('');
  const [apiCartUrl, setApiCartUrl] = useState<string>('');

  // fetching products

  useEffect(() => {
    if (userId) {
      const queryParams = new URLSearchParams({ filter, userId });
      const cartQueryParams = new URLSearchParams({ userId });
      setApiProdUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/products/getProductsWithFilter?${queryParams}`);
      setApiCartUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/cart/getCartByUserId?${cartQueryParams}`);
    } else {
      const queryParams = new URLSearchParams({ filter })
      setApiProdUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/products/getProductsWithFilter?${queryParams}`);
    }
  }, [userId, filter]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: products, error: error } = useSWR(apiProdUrl, fetcher, { shouldRetryOnError: false, revalidateOnFocus: false });
  const { data: cart, error: cartError } = useSWR(apiCartUrl, fetcher, { shouldRetryOnError: false, revalidateOnFocus: false });

  // getting products that are in cart
  useEffect(() => {
    if (cart && cart.products) { // Ensuring both cart and cart.products are not undefined
      const productIds = cart.products.map((product: any) => product.product.id) as number[] | undefined;
      setProductIdsInCart(productIds || []); // Use an empty array if productIds is undefined
    } else {
      setProductIdsInCart([]); // Ensuring productIdsInCart is reset/empty if cart or cart.products are undefined
    }
  }, [cart]);

  // getting saved products
  useEffect(() => {
    if (products) {
      // Assuming products is an array of product objects
      const savedIds = products
        .filter((product: Product) => product.savedByUsers.some(user => user.clerkUserId === userId))
        .map((product: Product) => product.id);

      setSavedProductIds(savedIds);
    }
  }, [products, userId]);


  const handleAddToCartOptimistically = async (product: Product) => {

    if (!user.isSignedIn) return toast.error("Please login to use cart", {
      position: "top-left",
      theme: "dark"
    })
    console.log("is logged in: ", user.isSignedIn)
    console.log("user: ", user.user)

    // Optimistically update UI
    setProductIdsInCart((currentIds) => [...currentIds, product.id]);
    try {
      await addToCart(product, userId);
      mutate(apiCartUrl); // Revalidate cache if necessary
    } catch (error) {
      // Revert UI on error
      setProductIdsInCart((currentIds) => currentIds.filter(id => id !== product.id));
      // Handle error (e.g., show a notification)
    }
  };

  const handleRemoveFromCartOptimistically = async (product: Product) => {

    if (!user.isSignedIn) return toast.error("Please login to use cart", {
      position: "top-left",
      theme: "dark"
    })
    console.log("user: ", user.user)

    // Optimistically update UI
    setProductIdsInCart((currentIds) => currentIds.filter(id => id !== product.id));
    try {
      await removeFromCart(product, userId);
      mutate(apiCartUrl); // Revalidate cache if necessary
    } catch (error) {
      // Revert UI on error
      setProductIdsInCart((currentIds) => [...currentIds, product.id]);
      // Handle error
    }
  };

  const handleSaveProductOptimistically = async (product: Product) => {

    if (!user.isSignedIn) return toast.error("Please login to save product", {
      position: "top-left",
      theme: "dark"
    })
    // Optimistically update UI
    setSavedProductIds((currentIds) => [...currentIds, product.id]);
    try {
      await saveProduct(product, userId);
      mutate(apiProdUrl); // Revalidate if necessary
    } catch (error) {
      setSavedProductIds((currentIds) => currentIds.filter(id => id !== product.id));
      toast.error("Error occured while saving product", { position: "top-left", theme: "dark" })
    }
  };

  const handleRemoveSavedProductOptimistically = async (product: Product) => {

    if (!user.isSignedIn) return toast.error("Please login to remove saved product", {
      position: "top-left",
      theme: "dark"
    })

    // Optimistically update UI
    setSavedProductIds((currentIds) => currentIds.filter(id => id !== product.id));
    try {
      await removeSavedProduct(product, userId);
      mutate(apiProdUrl); // Revalidate if necessary
    } catch (error) {
      // Revert UI on error
      setSavedProductIds((currentIds) => [...currentIds, product.id]);
      toast.error("Error occured while removing saved product", { position: "top-left", theme: "dark" })
    }
  };

  if (!products && !error) {
    return (
      <div className="flex flex-1 min-h-screen min-w-full">
        <div className="flex-1 flex w-full flex-col min-h-screen">
          <Headerbar />
          <section className="grid gap-6 md:gap-8 p-4 md:p-6">
            <Navbuttons />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6">
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
                              loading="lazy"
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
                            onClick={() => handleRemoveFromCartOptimistically(product)}
                            size="sm"
                            variant="outline"
                          >
                            Remove from Cart
                          </Button>
                        ) : (
                          <Button
                            key={product.id}
                            onClick={() => handleAddToCartOptimistically(product)}
                            size="sm"
                            variant="outline"
                          >
                            Add to Cart
                          </Button>
                        )}
                      {savedProductIds.includes(product.id) ? (
                        <>
                          <Button
                            onClick={() => handleRemoveSavedProductOptimistically(product)}
                            size="sm"
                            variant="outline"
                          >
                            <FaBookmark />
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleSaveProductOptimistically(product)}
                          size="sm"
                          variant="outline"
                        >
                          <FaRegBookmark />
                        </Button>
                      )}
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
