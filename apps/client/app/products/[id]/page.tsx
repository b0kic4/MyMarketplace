"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Products } from "../new/interfaces";
import { toast } from "react-toastify";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import { StarIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Spinner from "@client/app/components/Loading";
interface ServierSideProps {
  params: any;
}

// add some kind of ai to help users create their products
// ai should read the image and then from the image to generate
// some kind of description for the product and addtioional information
// and there can be for user to chose if the generated data is good
// and if the user doesnt like that one, it can make ai generate more

// products that are similar to current one
const UniqueProductPage: React.FC<ServierSideProps> = ({ params }) => {
  const productId = Number(params.id);
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Products>();
  const [visibleImages, setVisibleImages] = useState<number>(3);
  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}/products/${productId}`);
      setProduct(response.data);
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Error has occured, please try again", {
        position: "top-left",
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // const fetchMatchingProducts = async () => {};
  useEffect(() => {
    fetchProduct();
  }, [productId]);
  // implement rating product functionality final functionality
  // only if its purchased
  return (
    <div className="grid gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="flex flex-col gap-2 items-start">
        <Link className="text-base flex items-center gap-2" href="/products">
          <FaLongArrowAltLeft className="w-6 h-6" />
          Back to Products
        </Link>
      </div>
      {product ? (
        <>
          <div className="grid gap-4 md:gap-8 items-start">
            <h1 className="font-bold text-3xl tracking-tight">
              {product?.title}
            </h1>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.images &&
                product.images
                  .slice(0, visibleImages)
                  .map((image) => (
                    <Image
                      key={image.id}
                      alt={product.title}
                      className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                      height={600}
                      src={image.imageUrl}
                      width={600}
                    />
                  ))}
            </div>
            {product.images && product.images.length > visibleImages && (
              <div className="flex justify-center mt-4">
                <Button
                  size="sm"
                  onClick={() => setVisibleImages((prev) => prev + 3)}
                >
                  Load More Images
                </Button>
              </div>
            )}
            <div className="grid gap-2 text-sm leading-loose bg-gray-100 p-6 rounded-md">
              <h2 className="font-semibold text-lg mb-4">
                Product Information
              </h2>
              <div className="flex">
                <p className="font-semibold mb-2 text-base">
                  {product.description}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-base text-gray-700">Texture: </p>
                <p className="text-base font-semibold">{product.texture}</p>
              </div>{" "}
              <div className="flex gap-2">
                <p className="text-base text-gray-700">Mateiral: </p>
                <p className="text-base font-semibold">{product.material}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-base text-gray-700">Category:</p>
                <p className="text-base font-semibold">
                  {product.categoryType}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-base text-gray-700">Price:</p>
                <p className="font-bold text-base">{product.price}$</p>
              </div>
              <div className="flex gap-2">
                <p className="text-base text-gray-700">Sizes:</p>
                <p className="font-bold text-base">{product.sizes}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-700 text-base">Colors:</p>
                <p className="text-base font-bold">{product.colors}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-base text-gray-700">Stock:</p>
                <p className="text-base font-bold">{product.stock}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <h2 className="font-semibold text-lg">Features</h2>
            <ul className="list-disc pl-4 grid gap-2 text-sm">
              <li>Stylish and comfortable design</li>
              <li>Heart rate monitoring</li>
              <li>Step tracking and activity monitoring</li>
              <li>Customizable watch faces</li>
              <li>Waterproof up to 50 meters</li>
            </ul>
            <h2 className="font-semibold text-lg">Specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td>Display</td>
                  <td>1.4-inch AMOLED</td>
                </tr>
                <tr>
                  <td>Battery Life</td>
                  <td>Up to 7 days</td>
                </tr>
                <tr>
                  <td>Connectivity</td>
                  <td>Bluetooth 5.0</td>
                </tr>
                <tr>
                  <td>Compatibility</td>
                  <td>iOS, Android</td>
                </tr>
                <tr>
                  <td>Water Resistance</td>
                  <td>Up to 50 meters</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-4">
            <h2 className="font-semibold text-lg">Customer Reviews</h2>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Average rating: 3.0/5.0
                  </h3>
                  <p className="text-sm">
                    The watch is great, but the battery life could be better. I
                    love the design and the features, but I wish it lasted
                    longer between charges.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Average rating: 3.0/5.0
                  </h3>
                  <p className="text-sm">
                    The watch is great, but the battery life could be better. I
                    love the design and the features, but I wish it lasted
                    longer between charges.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Average rating: 3.0/5.0
                  </h3>
                  <p className="text-sm">
                    The watch is great, but the battery life could be better. I
                    love the design and the features, but I wish it lasted
                    longer between charges.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="grid gap-2">
              <div className="flex flex-row items-center gap-2">
                <Label className="text-base" htmlFor="quantity">
                  Quantity
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="w-24 bg-white">
                    <SelectItem className="text-base" value="1">
                      1
                    </SelectItem>
                    <SelectItem className="text-base" value="2">
                      2
                    </SelectItem>
                    <SelectItem className="text-base" value="3">
                      3
                    </SelectItem>
                    <SelectItem className="text-base" value="4">
                      4
                    </SelectItem>
                    <SelectItem className="text-base" value="5">
                      5
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button size="lg">Add to cart</Button>
          </div>
          <div className="grid gap-4">
            <h2 className="font-semibold text-lg">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col items-start">
                <Link
                  className="aspect-image overflow-hidden rounded-lg"
                  href="#"
                >
                  <img
                    alt="Related Product"
                    className="aspect-image object-cover w-full transition-transform scale-110"
                    height={250}
                    src="/placeholder.svg"
                    width={250}
                  />
                  <div className="aspect-legend p-2 text-center">
                    View Product
                  </div>
                </Link>
                <div className="grid gap-1 w-full">
                  <Link
                    className="font-semibold hover:underline-variant-1 underline-variant-1"
                    href="#"
                  >
                    Acme Prism T-Shirt
                  </Link>
                  <div className="flex items-center gap-0.5 text-muted-foreground-variant-1 dark:text-muted-foreground-variant-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  </div>
                  <div className="font-semibold">$99</div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <Link
                  className="aspect-image overflow-hidden rounded-lg"
                  href="#"
                >
                  <img
                    alt="Related Product"
                    className="aspect-image object-cover w-full transition-transform scale-110"
                    height={250}
                    src="/placeholder.svg"
                    width={250}
                  />
                  <div className="aspect-legend p-2 text-center">
                    View Product
                  </div>
                </Link>
                <div className="grid gap-1 w-full">
                  <Link
                    className="font-semibold hover:underline-variant-1 underline-variant-1"
                    href="#"
                  >
                    Acme Prism T-Shirt
                  </Link>
                  <div className="flex items-center gap-0.5 text-muted-foreground-variant-1 dark:text-muted-foreground-variant-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  </div>
                  <div className="font-semibold">$99</div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <Link
                  className="aspect-image overflow-hidden rounded-lg"
                  href="#"
                >
                  <img
                    alt="Related Product"
                    className="aspect-image object-cover w-full transition-transform scale-110"
                    height={250}
                    src="/placeholder.svg"
                    width={250}
                  />
                  <div className="aspect-legend p-2 text-center">
                    View Product
                  </div>
                </Link>
                <div className="grid gap-1 w-full">
                  <Link
                    className="font-semibold hover:underline-variant-1 underline-variant-1"
                    href="#"
                  >
                    Acme Prism T-Shirt
                  </Link>
                  <div className="flex items-center gap-0.5 text-muted-foreground-variant-1 dark:text-muted-foreground-variant-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  </div>
                  <div className="font-semibold">$99</div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <Link
                  className="aspect-image overflow-hidden rounded-lg"
                  href="#"
                >
                  <img
                    alt="Related Product"
                    className="aspect-image object-cover w-full transition-transform scale-110"
                    height={250}
                    src="/placeholder.svg"
                    width={250}
                  />
                  <div className="aspect-legend p-2 text-center">
                    View Product
                  </div>
                </Link>
                <div className="grid gap-1 w-full">
                  <Link
                    className="font-semibold hover:underline-variant-1 underline-variant-1"
                    href="#"
                  >
                    Acme Prism T-Shirt
                  </Link>
                  <div className="flex items-center gap-0.5 text-muted-foreground-variant-1 dark:text-muted-foreground-variant-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  </div>
                  <div className="font-semibold">$99</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : isLoading ? (
        <Spinner />
      ) : null}
    </div>
  );
};

export default UniqueProductPage;
