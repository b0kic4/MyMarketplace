"use client";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ProductImage, Products } from "../products/new/interfaces";
import Spinner from "./Loading";
import Link from "next/link";

export default function Main() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/products`);
      const shuffledProducts = response.data.sort(() => Math.random() - 0.5);
      setProducts(shuffledProducts);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [user.user?.id]);

  return (
    <main className="flex-1">
      <section className="w-full py-6 md:py-12 lg:py-16 xl:py-20">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Discover amazing products
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Shop from the best independent brands and creators.
            </p>
          </div>
          <div className="relative flex-1">
            <div className="flex items-center">
              <Input
                className="w-full h-10 rounded-l-lg"
                placeholder="Search for products..."
                type="search"
              />
              <span className="flex items-center justify-center rounded-r-lg p-2">
                <FaSearch className="text-gray-500" />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-10">
        <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
          <div className="mx-auto w-full max-w-6xl space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
              {!isLoading ? (
                products.slice(0, 4).map((product) => (
                  <Card key={product.id}>
                    <Link href={`/products/${product.id}`}>
                      <CardContent className="p-4">
                        <div className="grid w-full grid-cols-1 items-start gap-4">
                          {product.images.map((image: ProductImage) =>
                            image.isLogo === true || image.isLogo === "true" ? (
                              <Image
                                key={image.id}
                                alt={product.title}
                                className="mx-auto rounded-lg aspect-[1/1] overflow-hidden object-cover object-center"
                                height={300}
                                src={image.imageUrl || "/placeholder.svg"}
                                width={300}
                              />
                            ) : null
                          )}
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4">
                        <span className="text-xl font-bold">
                          ${product.price}
                        </span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </CardFooter>
                    </Link>
                  </Card>
                ))
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
