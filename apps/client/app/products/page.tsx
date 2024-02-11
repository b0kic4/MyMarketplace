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
export default function Page() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const user = useUser();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/products`);
      const shuffledProducts = response.data.sort(() => Math.random() - 0.5); // Shuffle the products
      setProducts(shuffledProducts);
      console.log("products: ", products);
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
    <div className="flex w-full min-h-screen">
      <div className="flex-1 flex flex-col min-h-screen">
        <Headerbar />
        <section className="grid gap-6 md:gap-8 p-4 md:p-6">
          <Navbuttons />
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="cursor-pointer p-1 transform transition-transform hover:scale-105">
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
                        <h3 className="text-xl font-bold">{product.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">${product.price}</span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
