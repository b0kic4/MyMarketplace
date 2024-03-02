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

  const cartQueryParams = new URLSearchParams({ userId });
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const apiCartUrl = `${process.env.NEXT_PUBLIC_NESTJS_URL}/cart/getCartByUserId?${cartQueryParams}`
  const { data: cart } = useSWR(apiCartUrl, fetcher)



  const handleQuantityChange = async (cartProductId: number, newQuantity: number) => {
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
      }
    }
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

  const handleRemoveFromCart = async (product: Product) => {
    console.log(product)
    await removeFromCart(product, userId);
    mutate(apiCartUrl); // Trigger revalidation
  };


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
                        onClick={() => handleRemoveFromCart(product)}
                        className="w-8 h-8"
                        size="icon"
                        variant="outline"
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
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
