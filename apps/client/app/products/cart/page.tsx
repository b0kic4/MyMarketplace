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
export default function Component() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const cart = data ? JSON.parse(data) : null;
  console.log("cart: ", cart);
  //   const { data } = router.query;

  //   // Check if data exists and convert it to a string if it's an array
  //   const cartData = data ? (Array.isArray(data) ? data[0] : data) : null;

  //   console.log(cartData);

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:gap-4">
        <CardTitle>Shopping Cart</CardTitle>
        <CardDescription>2 items added</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          <div className="flex items-center gap-4 p-4">
            <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden">
              <img
                alt="Thumbnail"
                className="aspect-square object-cover rounded-lg"
                height="75"
                src="/placeholder.svg"
                width="75"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold line-clamp-2">
                Product Name that is really long and should be truncated
              </h3>
              <p className="font-medium">$49.99</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Quantity: 1
              </p>
            </div>
            <Button className="w-8 h-8" size="icon" variant="outline">
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
          <div className="flex items-center gap-4 p-4">
            <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden">
              <img
                alt="Thumbnail"
                className="aspect-square object-cover rounded-lg"
                height="75"
                src="/placeholder.svg"
                width="75"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold line-clamp-2">
                Second Product Name
              </h3>
              <p className="font-medium">$29.99</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Quantity: 1
              </p>
            </div>
            <Button className="w-8 h-8" size="icon" variant="outline">
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label className="m-0" htmlFor="coupon">
              Coupon code
            </Label>
            <Input id="coupon" placeholder="Enter coupon code" />
            <Button size="sm">Apply</Button>
          </div>
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
  );
}
