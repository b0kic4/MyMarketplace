"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import { StarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product, ProductImage } from "../cart-products-interface";
import { removeFromCart, addToCart } from "@client/lib/actions/actions";
import GalleryModal from "@client/app/components/GalleryModal";
import { useUser } from "@clerk/nextjs";
interface ServierSideProps {
  params: any;
}
// products that are similar to current one
const UniqueProductPage: React.FC<ServierSideProps> = ({ params }) => {
  const [productApiUrl, setProductApiUrl] = useState<string>("")
  const [apiCartUrl, setApiCartUrl] = useState<string>("")
  const [similarProductsApiUrl, setSimilarProductsApiUrl] = useState<string>('')

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const productId = params.id

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const user = useUser();
  const userId = user.user?.id as string


  useEffect(() => {
    if (productId) {
      const productFetchParams = new URLSearchParams({ productId });
      setProductApiUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/products/byid/?${productFetchParams}`)
    }
  }, [productId])

  useEffect(() => {
    if (userId) {
      const cartQueryParams = new URLSearchParams({ userId });
      setApiCartUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/cart/getCartByUserId?${cartQueryParams}`);
    }
  }, [userId])

  const { data: product, error: productError } = useSWR(productApiUrl, fetcher);
  const { data: cart } = useSWR(apiCartUrl, fetcher)

  // similar products setting params
  useEffect(() => {
    if (product) {
      console.log(product)
      const queryParams = new URLSearchParams({
        categoryType: product.categoryType,
        colors: product.colors,
        username: product.user.username,
        material: product.material,
      }).toString();
      setSimilarProductsApiUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/products/getSimilarProducts?${queryParams}`);
    }
  }, [product]);


  // images
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[selectedImageIndex]);
    }
  }, [selectedImageIndex, product]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  useEffect(() => {
    // Automatically select the first image with isLogo set to true, or default to the first image
    const logoIndex = product?.images.findIndex((img: ProductImage) => img.isLogo === 'true');
    setSelectedImageIndex(logoIndex >= 0 ? logoIndex : 0);
  }, [product]);

  const handleMainImageClick = () => {
    setShowModal(true);
  };

  // Use SWR to fetch similar products
  const { data: similarProducts, error: similarProductsError } = useSWR(similarProductsApiUrl, fetcher);

  const handleAddToCartOptimistically = async (product: Product) => {
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

  const [productIdsInCart, setProductIdsInCart] = useState<number[]>([]);

  useEffect(() => {
    if (cart?.products) {
      const productIds = cart?.products.map(
        (product: any) => product.product.id
      ) as number[] | undefined;
      setProductIdsInCart(productIds || []); // Use an empty array if productIds is undefined
    }

  }, [cart]);

  const currentProductId = product?.id;

  const handleRemoveFromCartOptimistically = async (product: Product) => {
    // Optimistically update UI: Remove product ID from productIdsInCart
    setProductIdsInCart(currentIds => currentIds.filter(id => id !== product.id));

    // Optimistically update the cart data to remove the product
    const updatedCart = {
      ...cart,
      products: cart.products.filter((cartProduct: any) => cartProduct.product.id !== product.id)
    };

    mutate(apiCartUrl, updatedCart, false); // Update SWR cache without revalidation

    try {
      await removeFromCart(product, userId);
      // Optionally, you can revalidate the cart data from the server after the product is successfully removed:
      mutate(apiCartUrl);
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
      // Revert UI on error: Add product ID back to productIdsInCart
      setProductIdsInCart(currentIds => [...currentIds, product.id]);

      // Revert the optimistic update of the cart data
      mutate(apiCartUrl, cart, false); // You might need to fetch the latest cart data if this approach doesn't work as expected

      // Handle error (e.g., show a notification)
      toast.error("Failed to remove product from cart", { position: "top-left", theme: "dark" });
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
      {product && (
        <>
          <div className="grid gap-4 md:gap-8 items-start">
            <h1 className="font-bold text-3xl tracking-tight">
              {product?.title}
            </h1>
            <div className="relative cursor-pointer" onClick={handleMainImageClick}>
              {selectedImage && (
                <Image
                  src={selectedImage.imageUrl}
                  alt="Selected product image"
                  width={200} // Adjust width as needed
                  height={200} // Adjust height as needed
                  layout="responsive"
                  loading="lazy"
                  objectFit="cover"
                  className="rounded-md w-50 h-50"
                />
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {product?.images.map((image: ProductImage, index: number) => (
                <Image
                  key={image.id}
                  src={image.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(index)}
                  height={100}
                  width={100}
                  className={`w-24 h-24 object-cover cursor-pointer rounded-lg ${index === selectedImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                />
              ))}
            </div>

            {showModal && (
              <GalleryModal
                isOpen={showModal}
                images={product?.images || []}
                initialIndex={selectedImageIndex}
                onClose={() => setShowModal(false)}
              />
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
            {productIdsInCart.includes(product.id) ? (
              <Button
                key={product.id}
                size="default"
                variant="outline"
                onClick={() => handleRemoveFromCartOptimistically(product)}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                size="default"
                variant="outline"
                onClick={() => handleAddToCartOptimistically(product)}
              >
                Add to cart
              </Button>
            )}
          </div>
          {/* RELATED PRODUCTS:::::: */}
          <div className="grid gap-4">
            <h2 className="font-semibold text-lg">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts && similarProducts
                .filter(
                  (similarProduct: Product) => similarProduct.id !== currentProductId
                )
                .map((product: Product) => (
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
      )}
    </div>
  );
};

export default UniqueProductPage;
