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
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";

// Component
export default function Component() {
  // params
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [cart, setCart] = useState<Cart | null>(data ? JSON.parse(data) : null);

  // data fetching loading states
  const [cartProductIds, setCartProductIds] = useState<
    { productId: number; quantity: number }[]
  >([]);

  // unsaved changes for cart prodcuts
  const [unSavedChanges, setUnSavedChages] = useState<number[]>([]);
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  // backend url
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;

  // handlers
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

  const handleQuantityChange = (cartProductId: number, newQuantity: number) => {
    // Find the product that needs to be updated based on cartProductId
    const productToUpdate = cart?.products.find(
      (cartProduct) => cartProduct.id === cartProductId
    );

    if (productToUpdate) {
      const theProduct = productToUpdate?.product;
      const stock = theProduct?.stock || 0;

      if (newQuantity < stock) {
        // Check if the cartProductId is already in unSavedChanges
        const isAlreadyUnsaved = unSavedChanges.includes(cartProductId);

        // If it's not in unSavedChanges, add it
        if (!isAlreadyUnsaved) {
          setUnSavedChages((prevUnsavedChanges) => [
            ...prevUnsavedChanges,
            cartProductId,
          ]);
        }

        const updatedCartProductIds = cartProductIds.map((item) =>
          item.productId === cartProductId
            ? { ...item, quantity: newQuantity }
            : item
        );
        setCartProductIds(updatedCartProductIds);

        const updatedCart = {
          ...cart,
          products: cart?.products.map((cartProduct) =>
            cartProduct.id === cartProductId
              ? { ...cartProduct, quantity: newQuantity }
              : cartProduct
          ),
        };
        setCart(updatedCart as any);

        calculatePrice();
      } else {
        // If the new quantity is not less than stock, remove from unSavedChanges
        setUnSavedChages((prevUnsavedChanges) =>
          prevUnsavedChanges.filter((id) => id !== cartProductId)
        );
      }
    }
  };

  // updating the quantity of the cart items
  const saveChanges = async (productId: number, quantity: number) => {
    // product id is cart product id, not actual product id
    try {
      setLoading(true);
      const response = await axios.post(`${url}/products/update-quantity`, {
        id: productId,
        quantity: quantity,
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("Quantity updated successfully", {
          position: "top-right",
          theme: "dark",
        });
        getCart();
      }
      // Remove the cartProductId from unSavedChanges after saving changes
      setUnSavedChages((prevUnsavedChanges) =>
        prevUnsavedChanges.filter((id) => id !== productId)
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // its string bc price is saved as string because of float value
  const [totalPrice, setTotalPrice] = useState<string>("");
  const calculatePrice = () => {
    try {
      // getting cart products
      const cartProducts = cart?.products;
      if (cartProducts) {
        // Use reduce to sum up the prices of all products
        const totalPrice = cartProducts.reduce((acc, cartProduct) => {
          const product: Product = cartProduct.product;

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

  // {unSavedChanges ? (
  //   <>
  //     <Button  onClick={saveChanges}>Apply</Button>
  //     <Button disabled>
  //       <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
  //     </Button>
  //   </>
  // ) : null}
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
            <CardDescription>2 items added</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {Array.isArray(cart?.products) &&
                cart.products.map((cartProduct: CartProduct) => {
                  const product: Product = cartProduct.product;

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
                      {unSavedChanges.includes(cartProduct.id) && (
                        <Button
                          className="w-8 h-8"
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            saveChanges(cartProduct.id, cartProduct.quantity)
                          }
                        >
                          <MdDone className="w-4 h-4" />
                          <span className="sr-only">Apply Changes</span>
                        </Button>
                      )}
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
                <p className="font-semibold">${totalPrice}</p>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
