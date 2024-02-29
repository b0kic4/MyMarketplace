"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@client/lib/actions/actions";
import Headerbar from "./components/Headerbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, ProductImage } from "./cart-products-interface";
import Navbuttons from "./components/Navbuttons";
import { useUser } from "@clerk/nextjs";
import Listingtext from "./components/Listingtext";

// export async function loader() {
//   const products = await getProducts()
//   return { products }
// }

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Productpage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filter = searchParams.get("filter") || "all";
  const userId = useUser().user?.id;

  useEffect(() => {
    setLoading(true);
    getProducts(filter, userId)
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [filter, userId]); // Include userId in the dependency array
  if (error) return <div>Failed to load products.</div>;
  if (loading) return <div>Loading...</div>;

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
                    {/* <div className="items-center text-center flex gap-2">
                      {productIdsInCart.includes(product.id) &&
                      !isUpdatingCart[product.id] ? (
                        <Button
                          key={product.id}
                          onClick={() => handleRemoveFromCart(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          {isUpdatingCart[product.id] ? (
                            <Spinner />
                          ) : (
                            "Remove from Cart"
                          )}
                        </Button>
                      ) : !isUpdatingCart[product.id] ? (
                        <Button
                          key={product.id}
                          onClick={() => handleAddToCart(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          {isUpdatingCart[product.id] ? (
                            <Spinner />
                          ) : (
                            "Add to Cart"
                          )}
                        </Button>
                      ) : (
                        <Spinner />
                      )}

                      {product.savedByUsers.some(
                        (u) => u.clerkUserId === user.user?.id
                      ) && !isSavingProduct[product.id] ? (
                        <Button
                          onClick={() => handleRemoveSavedProduct(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          {isSavingProduct[product.id] ? (
                            <Spinner />
                          ) : (
                            <FaBookmark />
                          )}
                        </Button>
                      ) : !isSavingProduct[product.id] ? (
                        <Button
                          onClick={() => handleSaveProduct(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          {isSavingProduct[product.id] ? (
                            <Spinner />
                          ) : (
                            <FaRegBookmark />
                          )}
                        </Button>
                      ) : (
                        <Spinner />
                      )}
                    </div> */}
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
