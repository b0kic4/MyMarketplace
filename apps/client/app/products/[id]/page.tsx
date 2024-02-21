"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Products } from "../new/interfaces";
import { toast } from "react-toastify";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import { StarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Spinner from "@client/app/components/Loading";
import { Cart, Product, ProductImage } from "../cart-products-interface";
import { useUser } from "@clerk/nextjs";
interface ServierSideProps {
  params: any;
}
// products that are similar to current one
const UniqueProductPage: React.FC<ServierSideProps> = ({ params }) => {
  const productId = Number(params.id);
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const [product, setProduct] = useState<Products>();
  const [visibleImages, setVisibleImages] = useState<number>(3);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart>();
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/products/byId/${productId}`);
      setProduct(response.data);
    } catch (error: any) {
      setLoading(false);
      toast.error("Error has occured, please try again", {
        position: "top-left",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  // TODO: implement caching
  const fetchMatchingProducts = async () => {
    try {
      if (product) {
        const response = await axios.get(`${url}/products/getSimilarProducts`, {
          params: {
            categoryType: product.categoryType,
            colors: product.colors,
            username: product.user.username,
            material: product.material,
          },
        });
        setSimilarProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // getting matching product from displayed product
  useEffect(() => {
    if (product) {
      fetchMatchingProducts();
      getCart();
    }
  }, [product]);

  const getCart = async () => {
    try {
      const response = await axios.get(`${url}/cart`, {
        params: {
          userId: user.user?.id,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const foundProduct = product;
      const data = {
        foundProduct,
        userId: user.user?.id,
      };
      const response = await axios.post(`${url}/products/add-to-cart`, data);
      if (response.status === 201) {
        toast.success("Product added to cart successfully", {
          position: "top-right",
          theme: "dark",
        });
        getCart();
      }
    } catch (error) {
      setLoading(false);
      toast.error("Adding to cart failed", {
        theme: "dark",
        position: "top-left",
      });
    } finally {
      setLoading(false);
    }
  };

  const [productIdsInCart, setProductIdsInCart] = useState<number[]>([]);

  useEffect(() => {
    const productIds = cart?.products.map(
      (product: any) => product.product.id
    ) as number[] | undefined;
    setProductIdsInCart(productIds || []); // Use an empty array if productIds is undefined
  }, [cart]);

  const currentProductId = product?.id;

  const handleRemoveFromCart = async () => {
    try {
      setLoading(true);
      const foundProduct = product;
      const data = {
        foundProduct,
        userId: user.user?.id,
      };
      const response = await axios.post(
        `${url}/products/remove-from-cart`,
        data
      );
      if (response.status === 201) {
        toast.success("Product removed from cart successfully", {
          position: "top-right",
          theme: "dark",
        });
        getCart();
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error occured while removing product from cart", {
        position: "top-left",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="flex flex-col gap-2 items-start">
        <Link
          className="text-base flex font-bold items-center gap-2"
          href="/products"
        >
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

          {/* customer reviews */}
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
            {productIdsInCart.includes(product.id) && !loading ? (
              <Button
                key={product.id}
                size="default"
                variant="outline"
                onClick={handleRemoveFromCart}
              >
                Remove from Cart
              </Button>
            ) : loading ? (
              <Spinner />
            ) : !loading ? (
              <Button
                size="default"
                variant="outline"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            ) : loading ? (
              <Spinner />
            ) : null}
          </div>

          {/* RELATED PRODUCTS:::::: */}

          <div className="grid gap-4">
            <h2 className="font-semibold text-lg">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts
                .filter(
                  (similarProduct) => similarProduct.id !== currentProductId
                )
                .map((product) => (
                  <div className="flex flex-col items-start" key={product.id}>
                    <Link
                      className="aspect-image overflow-hidden rounded-lg"
                      href={`/products/${product.id}`}
                    >
                      {product &&
                        product.images.map(
                          (image: ProductImage, imgIndex: number) =>
                            image.isLogo === true || image.isLogo === "true" ? (
                              <Image
                                key={imgIndex}
                                alt="Related Product"
                                className="aspect-image object-cover w-full transition-transform scale-110"
                                height={200}
                                src={image.imageUrl || "/placeholder.svg"}
                                width={200}
                              />
                            ) : null
                        )}
                    </Link>
                    <div className="grid gap-1 w-full">
                      <Link
                        className="font-semibold hover:underline-variant-1 underline-variant-1"
                        href="#"
                      >
                        {product.title}
                      </Link>
                      <div className="flex items-center gap-0.5 text-muted-foreground-variant-1 dark:text-muted-foreground-variant-1">
                        {/* Assuming you have a rating property in your product object */}
                        {/* {Array.from({ length: product.rating }).map(
                        (_, index) => (
                          <StarIcon
                            key={index}
                            className="w-4 h-4 fill-primary"
                          />
                        )
                      )} */}
                      </div>
                      <div className="font-semibold">${product.price}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : loading ? (
        <Spinner />
      ) : null}
    </div>
  );
};

export default UniqueProductPage;
