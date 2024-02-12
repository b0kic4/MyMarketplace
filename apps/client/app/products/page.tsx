"use client";
// https://v0.dev/r/ge7QyM20jYK
import Link from "next/link";
import Image from "next/image";
import Headerbar from "./components/Headerbar";
import Navbuttons from "./components/Navbuttons";
import { useEffect, useState } from "react";
import { ProductImage, Products } from "./new/interfaces";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Spinner from "../components/Loading";
import { toast } from "react-toastify";
export default function Page() {
  const [products, setProducts] = useState<Products[]>([]);
  const [initialProducts, setInitialProducts] = useState<Products[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const user = useUser();
  const [filter, setFilter] = useState<string>("all");

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/products`);
      const prod = response.data;
      setInitialProducts(prod);
      switch (filter) {
        case "all": {
          const shuffledProducts = response.data.sort(
            () => Math.random() - 0.5
          );
          setProducts(shuffledProducts);
          break;
        }
        case "newArrivals": {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

          const filteredProducts = initialProducts.filter((product) => {
            return new Date(product.createdAt) >= oneWeekAgo;
          });

          setProducts(filteredProducts);
          break;
        }
        case "usedItems": {
          const filteredProducts = initialProducts.filter((product) => {
            return product.isUsed === true;
          });
          setProducts(filteredProducts);
          break;
        }
        case "my-products": {
          const filteredProducts = initialProducts.filter((product) => {
            return product.user.clerkUserId === user.user?.id;
          });
          setProducts(filteredProducts);
          break;
        }
        case "saved-products": {
          const filteredProduct = initialProducts.filter((product) => {
            return product.savedByUsers.find(
              (u) => u.clerkUserId === user.user?.id
            );
          });
          setProducts(filteredProduct);
          break;
        }
        default: {
          const shuffledProducts = response.data.sort(
            () => Math.random() - 0.5
          );
          setProducts(shuffledProducts);
          break;
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    console.log("products: ", products);
  }, [user.user?.id, filter]);

  const handleFilterAll = () => setFilter("all");
  const handleFilterNewArrivals = () => setFilter("newArrivals");

  const handleFilterUsedItems = () => setFilter("usedItems");
  const handleFilterMyProducts = () => setFilter("my-products");
  const handleFilterSaved = () => setFilter("saved-products");

  const handleSaveProduct = async (productId: number) => {
    try {
      const foundProduct = products.find((product) => product.id === productId);
      const response = await axios.post(
        `${url}/products/save-product`,
        foundProduct
      );
      if (response.status === 201) {
        toast.success("Product is bookmarked", {
          position: "top-right",
          theme: "dark",
        });
        getProducts();
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-left",
        theme: "dark",
      });
    }
  };
  const handleRemoveSavedProduct = async (productId: number) => {
    try {
      const foundProduct = products.find((product) => product.id === productId);
      const response = await axios.post(
        `${url}/products/remove-saved-product`,
        foundProduct
      );
      if (response.status === 201) {
        toast.success("Product is not bookmarked anymore", {
          position: "top-right",
          theme: "dark",
        });
        getProducts();
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-left",
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 flex flex-col min-h-screen">
        <Headerbar />
        <section className="grid gap-6 md:gap-8 p-4 md:p-6">
          <Navbuttons
            onFilterAll={handleFilterAll}
            onFilterNewArrivals={handleFilterNewArrivals}
            onFilterUsedItems={handleFilterUsedItems}
            onFilterSaved={handleFilterSaved}
            handleFilterMyProducts={handleFilterMyProducts}
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {!isLoading ? (
              products.map((product) => (
                <Card className="p-1">
                  <CardContent className="p-4">
                    <div className="grid w-full grid-cols-1 items-start gap-4">
                      {product.images.map((image: ProductImage) =>
                        image.isLogo === true || image.isLogo === "true" ? (
                          <Image
                            key={image.id}
                            alt={product.title}
                            className="mx-auto rounded-lg aspect-[1/1] overflow-hidden object-cover object-center"
                            height={500}
                            src={image.imageUrl || "/placeholder.svg"}
                            width={500}
                          />
                        ) : null
                      )}
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
                          {product.user.username}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">${product.price}</span>
                    <div className="items-center text-center flex gap-2">
                      <Button size="sm" variant="outline">
                        <Link href={`/products/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                      {product.savedByUsers.some(
                        (u) => u.clerkUserId === user.user?.id
                      ) ? (
                        <Button
                          key={product.id}
                          onClick={() => handleRemoveSavedProduct(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          <FaBookmark />
                        </Button>
                      ) : (
                        <Button
                          key={product.id}
                          onClick={() => handleSaveProduct(product.id)}
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
              <Spinner />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
