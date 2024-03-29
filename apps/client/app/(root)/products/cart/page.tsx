"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@radix-ui/react-icons";
import { CartProduct, ProductImage, Product } from "../cart-products-interface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import debounce from 'lodash.debounce';

import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import StripeCheckout from "@client/app/components/StripeCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { removeFromCart, handleCartProductQuantityChange } from "@client/lib/actions/actions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Component() {
  const user = useUser();
  const userId = user.user?.id as string

  const [productIdsInCart, setProductIdsInCart] = useState<number[]>([]);

  const [apiCartUrl, setApiCartUrl] = useState<string>("")
  useEffect(() => {
    if (userId) {
      const cartQueryParams = new URLSearchParams({ userId });
      setApiCartUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/cart/getCartByUserId?${cartQueryParams}`)
    }
  }, [userId])

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: cart } = useSWR(apiCartUrl, fetcher)

  useEffect(() => {
    if (cart && cart.products) { // Ensuring both cart and cart.products are not undefined
      const productIds = cart.products.map((product: any) => product.product.id) as number[] | undefined;
      setProductIdsInCart(productIds || []); // Use an empty array if productIds is undefined
    } else {
      setProductIdsInCart([]); // Ensuring productIdsInCart is reset/empty if cart or cart.products are undefined
    }
  }, [cart]);

  // updating ui when changing quantity
  const optimisticUpdateQuantity = (cartProductId: number, newQuantity: number) => {
    const productToUpdate = cart?.products.find((cartProduct: CartProduct) => cartProduct.id === cartProductId);
    if (productToUpdate) {
      const theProduct = productToUpdate?.product as any;
      const stock = theProduct?.stock || 0;
      if (newQuantity <= stock) {
        const updatedProducts = cart?.products.map((product: CartProduct) =>
          product.id === cartProductId ? { ...product, quantity: newQuantity } : product
        );
        mutate(apiCartUrl, { ...cart, products: updatedProducts }, false);
      }
    }
  };

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


  const debouncedHandleQuantityChange = debounce(async (cartProductId, newQuantity) => {
    const productToUpdate = cart?.products.find((cartProduct: CartProduct) => cartProduct.id === cartProductId);
    if (productToUpdate) {
      try {
        const theProduct = productToUpdate?.product as any;
        const stock = theProduct?.stock || 0;

        if (newQuantity <= stock) {
          await handleCartProductQuantityChange(cartProductId, newQuantity, userId);
          mutate(apiCartUrl);
        }
        else {
          toast.error("No more products to add", {
            position: "top-left",
            theme: "dark"
          })
        }
      } catch (error) {
        console.error("Failed to update cart quantity:", error);
        toast.error("Failed to update quantity", { position: "top-left", theme: "dark" });
        // Optionally, revert the optimistic update by re-fetching the cart data
        mutate(apiCartUrl);
      }

    }

  }, 300);

  const handleQuantityChange = (cartProductId: number, newQuantity: number) => {
    optimisticUpdateQuantity(cartProductId, newQuantity);
    debouncedHandleQuantityChange(cartProductId, newQuantity);
  };


  // handlers
  useEffect(() => {
    mutate(apiCartUrl)
  }, [userId]);

  const [totalPrice, setTotalPrice] = useState<string>("");
  const calculatePrice = () => {
    try {
      const cartProducts = cart?.products;
      if (cartProducts) {
        const totalPrice = cartProducts.reduce((acc: number, cartProduct: CartProduct) => {
          const product: any = cartProduct.product;
          const productPrice = parseFloat(product.price) || 0;
          const itemTotalPrice = productPrice * cartProduct.quantity;

          return acc + itemTotalPrice;
        }, 0);

        setTotalPrice(totalPrice.toFixed(2));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    calculatePrice();
  }, [cart]);


  return (
    <div className="flex flex-1 justify-around flex-col gap-10">
      <div>
        <div className="flex flex-col gap-2 items-start">
          <Link
            className="text-base flex font-bold items-center gap-2"
            href="/products"
          >
            <FaLongArrowAltLeft className="w-6 h-6" />
            Back to Products
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center w-full justify-start h-screen">
        <Card className="w-full max-w-3xl">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:gap-4">
            <CardTitle>Shopping Cart</CardTitle>
            <CardDescription>
              {cart?.products && cart.products.length > 0 ? (
                <span className="flex gap-2">
                  {cart.products.length}
                  {cart.products.length === 1 ? (
                    <p>item in cart</p>
                  ) : (
                    <p>items in cart</p>
                  )}{" "}
                </span>
              ) : (
                <p> No Items in Cart</p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {Array.isArray(cart?.products) && (
                cart.products.map((cartProduct: CartProduct) => {
                  const product: any = cartProduct.product;
                  return (
                    <>
                      {productIdsInCart.includes(product.id) ? (
                        <div
                          className="flex items-center gap-4 p-4"
                          key={cartProduct.id}
                        >
                          <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden">
                            {Array.isArray(product.images) &&
                              product.images.map(
                                (image: ProductImage, index: number) => {
                                  return image.isLogo === true ||
                                    image.isLogo === "true" ? (
                                    <Link href={`/products/${product.id}`}>
                                      <Image
                                        key={index}
                                        alt={product.title}
                                        className="mx-auto rounded-lg aspect-[1/1] overflow-hidden object-cover object-center"
                                        height={500}
                                        src={image.imageUrl || "/placeholder.svg"}
                                        width={500}
                                      />
                                    </Link>
                                  ) : null;
                                }
                              )}
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold line-clamp-2">
                              {product.title}
                            </h3>
                            <p className="font-medium">${product.price}</p>
                            <p className="text-xs">Stock: {product.stock}</p>
                            <div className="flex items-center gap-2">
                              <Label
                                className="m-0"
                                htmlFor={`quantity-${cartProduct.id}`}
                              >
                                Quantity:
                              </Label>
                              <Input
                                id={`quantity-${cartProduct.id}`}
                                type="number"
                                className="w-1/2 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/6"
                                value={cartProduct.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    cartProduct.id,
                                    +e.target.value
                                  )
                                }
                                min="1"
                              />
                            </div>
                          </div>
                          <Button
                            onClick={() => handleRemoveFromCartOptimistically(product)}
                            className="w-8 h-8"
                            size="icon"
                            variant="outline"
                          >
                            <TrashIcon className="w-4 h-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      ) : (<p>No products in cart</p>)}
                    </>
                  );
                })
              )}
            </div>

            {/* Additional content */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">Subtotal</p>
                <p className="font-semibold">${totalPrice}</p>
              </div>
              <Elements stripe={stripePromise}>
                <StripeCheckout cart={cart} totalPrice={totalPrice} />
              </Elements>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
