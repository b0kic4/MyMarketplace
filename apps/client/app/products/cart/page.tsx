// Import statements
"use client";
import { useSearchParams } from "next/navigation";
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
import {
  Cart,
  CartProduct,
  Product,
  ProductImage,
} from "../cart-products-interface";
import Image from "next/image";
import { useState } from "react";

// Component
export default function Component() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [cart, setCart] = useState<Cart | null>(data ? JSON.parse(data) : null);

  const handleQuantityChange = (cartProductId: number, newQuantity: number) => {
    if (cart) {
      const updatedCart = {
        ...cart,
        products: cart.products.map((cartProduct) =>
          cartProduct.id === cartProductId
            ? { ...cartProduct, quantity: newQuantity }
            : cartProduct
        ),
      };

      setCart(updatedCart);
      // You might want to update your backend or storage with the new cart information
      // (e.g., using an API call or other appropriate method)
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-start h-screen">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:gap-4">
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>2 items added</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {Array.isArray(cart?.products) &&
              cart.products.map((cartProduct: CartProduct) => {
                const product = cartProduct.product;

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
                              <Image
                                key={index}
                                alt={product.title}
                                className="mx-auto rounded-lg aspect-[1/1] overflow-hidden object-cover object-center"
                                height={500}
                                src={image.imageUrl || "/placeholder.svg"}
                                width={500}
                              />
                            ) : null;
                          }
                        )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="font-medium">${product.price}</p>
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
                    <Button className="w-8 h-8" size="icon" variant="outline">
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                );
              })}
          </div>

          {/* Additional content */}
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">Subtotal</p>
              <p className="font-semibold">$79.98</p>
            </div>
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
