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
import { FaBookmark, FaRegBookmark, FaShoppingCart } from "react-icons/fa";
import Spinner from "../components/Loading";
import { toast } from "react-toastify";
import Listingtext from "./components/Listingtext";
import { CartProduct, Cart, Product } from "./cart-products-interface";
export default function Page() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const user = useUser();
  const [filter, setFilter] = useState<string>("all");
  const [countAllProducts, setCountAllProducts] = useState<number>();
  const [countUsedItems, setCountUsedItems] = useState<number>();
  const [countMyProducts, setCountMyProducts] = useState<number>();
  const [countNewArrivals, setCountNewArrivals] = useState<number>();
  const [coundSavedProducts, setCountSavedProducts] = useState<number>();
  const [countCartProducts, setCountCartProducts] = useState<number>();
  const [cart, setCart] = useState<Cart>();
  // data fetching
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/products`);
      const prod = response.data;

      // count length of all the products
      setCountAllProducts(prod.length);

      // count of new arrivals products
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const filteredNewProducts = prod.filter((product: Products) => {
        return new Date(product.createdAt) >= oneWeekAgo;
      });
      setCountNewArrivals(filteredNewProducts.length);

      // count of used products
      const filteredUsedProducts = prod.filter((product: Products) => {
        return product.isUsed === true;
      });
      setCountUsedItems(filteredUsedProducts.length);

      // count of saved Products
      const filteredBookmarkedProdcuts = prod.filter((product: Products) => {
        return product.savedByUsers.find(
          (u) => u.clerkUserId === user.user?.id
        );
      });
      setCountSavedProducts(filteredBookmarkedProdcuts.length);

      // count my products
      const filteredMyProducts = prod.filter((product: Products) => {
        return product.user.clerkUserId === user.user?.id;
      });
      setCountMyProducts(filteredMyProducts.length);

      // Apply filtering based on the current state
      applyFilter(prod);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCart = async () => {
    try {
      const response = await axios.get(`${url}/cart`, {
        params: {
          userId: user.user?.id,
        },
      });
      const responseCart: Cart = response.data;
      if (responseCart.user.clerkUserId === user.user?.id) {
        setCart(response.data);
        setCountCartProducts(cart?.products.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilter = (data: Products[]) => {
    switch (filter) {
      case "all": {
        const shuffledProducts = data.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
        break;
      }
      case "newArrivals": {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const filteredProducts = data.filter((product) => {
          return new Date(product.createdAt) >= oneWeekAgo;
        });
        setProducts(filteredProducts);
        break;
      }
      case "usedItems": {
        const filteredProducts = data.filter((product) => {
          return product.isUsed === true;
        });
        setProducts(filteredProducts);
        break;
      }
      case "my-products": {
        const filteredProducts = data.filter((product) => {
          return product.user.clerkUserId === user.user?.id;
        });
        setProducts(filteredProducts);
        break;
      }
      case "saved-products": {
        const filteredProducts = data.filter((product) => {
          return product.savedByUsers.find(
            (u) => u.clerkUserId === user.user?.id
          );
        });
        setProducts(filteredProducts);
        break;
      }
      default: {
        const shuffledProducts = data.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
        break;
      }
    }
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, [user.user?.id, filter]);

  useEffect(() => {
    setCountCartProducts(cart?.products.length);
  }, [cart]);

  const handleFilterAll = () => setFilter("all");
  const handleFilterNewArrivals = () => setFilter("newArrivals");

  const handleFilterUsedItems = () => setFilter("usedItems");
  const handleFilterMyProducts = () => setFilter("my-products");
  const handleFilterSaved = () => setFilter("saved-products");

  const handleSaveProduct = async (productId: number) => {
    try {
      const foundProduct = products.find((product) => product.id === productId);
      const response = await axios.post(
        `${url}/products/save-product`,
        foundProduct
      );
      if (response.status === 201) {
        toast.success("Product is bookmarked", {
          position: "top-right",
          theme: "dark",
        });
        getProducts();
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-left",
        theme: "dark",
      });
    }
  };
  const handleRemoveSavedProduct = async (productId: number) => {
    try {
      const foundProduct = products.find((product) => product.id === productId);
      if (!foundProduct) {
        return toast.error("Product not found", {
          position: "top-left",
          theme: "dark",
        });
      }
      const response = await axios.post(
        `${url}/products/remove-saved-product`,
        foundProduct
      );
      if (response.status === 201) {
        toast.success("Product is not bookmarked anymore", {
          position: "top-right",
          theme: "dark",
        });
        getProducts();
      }
    } catch (error: any) {
      toast.error("Removing bookmarked product failed", {
        position: "top-left",
        theme: "dark",
      });
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      const foundProduct = products.find((product) => product.id === productId);
      if (!foundProduct) {
        return toast.error("Product not found", {
          position: "top-left",
          theme: "dark",
        });
      }
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
      toast.error("Adding to cart failed", {
        theme: "dark",
        position: "top-left",
      });
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const foundProduct = products.find((product) => product.id === productId);
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
      toast.error("Error occured while removing product from cart", {
        position: "top-left",
        theme: "dark",
      });
    }
  };

  const [productIdsInCart, setProductIdsInCart] = useState<number[]>([]);

  useEffect(() => {
    const productIds = cart?.products.map((product) => product.product.id) as
      | number[]
      | undefined;
    console.log(productIds);
    setProductIdsInCart(productIds || []); // Use an empty array if productIds is undefined
  }, [cart]);

  return (
    <div className="flex flex-1 min-h-screen min-w-full">
      <div className="flex-1 flex w-full flex-col min-h-screen">
        {/* Headerbar for searching products */}
        <Headerbar />
        <section className="grid gap-6 md:gap-8 p-4 md:p-6">
          {/* All products new arriavls etc... buttons */}
          <Navbuttons
            onFilterAll={handleFilterAll}
            onFilterNewArrivals={handleFilterNewArrivals}
            onFilterUsedItems={handleFilterUsedItems}
            onFilterSaved={handleFilterSaved}
            handleFilterMyProducts={handleFilterMyProducts}
            countAllProducts={countAllProducts}
            countUsedItems={countUsedItems}
            countNewArrivals={countNewArrivals}
            countSavedProducts={coundSavedProducts}
            countMyProducts={countMyProducts}
            countCartProducts={countCartProducts}
          />
          {/* Listing products text  */}
          <Listingtext filter={filter} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6">
            {!isLoading ? (
              products.map((product) => (
                <Card className="p-1" key={product.id}>
                  <CardContent className="p-4">
                    <Link href={`/products/${product.id}`}>
                      {product.images.map(
                        (image: ProductImage, index: number) =>
                          image.isLogo === true || image.isLogo === "true" ? (
                            <Image
                              key={index}
                              alt={product.title}
                              className="mx-auto rounded-lg aspect-[1/1] overflow-hidden object-cover object-center"
                              height={500}
                              src={image.imageUrl || "/placeholder.svg"}
                              width={500}
                            />
                          ) : null
                      )}
                    </Link>
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-xl font-bold">{product.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.description}
                      </p>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Category: {product.categoryType}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <p className="text-gray-500">by:</p>
                      <p className="text-gray-700 font-semibold">
                        {product.user.username}
                      </p>
                    </div>
                    <div className="flex py-1">
                      <Link href={`/products/${product.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">${product.price}</span>
                    <div className="items-center text-center flex gap-2">
                      {productIdsInCart.includes(product.id) ? (
                        <Button
                          key={product.id}
                          onClick={() => handleRemoveFromCart(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          Remove from Cart
                        </Button>
                      ) : (
                        <Button
                          key={product.id}
                          onClick={() => handleAddToCart(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          Add to Cart
                        </Button>
                      )}

                      {product.savedByUsers.some(
                        (u) => u.clerkUserId === user.user?.id
                      ) ? (
                        <Button
                          onClick={() => handleRemoveSavedProduct(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          <FaBookmark />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleSaveProduct(product.id)}
                          size="sm"
                          variant="outline"
                        >
                          <FaRegBookmark />
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
