"use client"
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { ProductImage } from "../products/new/interfaces";
import Link from "next/link";
import SkeletonLoader from "./MainProductsSkeletonLoader";
import useSWR from "swr";
export default function Main() {

  const apiUrl = `${process.env.NEXT_PUBLIC_NESTJS_URL}/products/getAll`;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: products, error } = useSWR(apiUrl, fetcher);

  if (!products && !error) {
    return (
      <div className="flex flex-1 min-h-screen min-w-full">
        <div className="flex-1 flex w-full flex-col min-h-screen">
          <section className="grid gap-6 md:gap-8 p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
              {/* Render multiple skeleton loaders based on an estimated number of products */}
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    );

  } if (error) return <div>Failed to load products.</div>;



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
              {products.slice(0, 4).map((product: any) => (
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
