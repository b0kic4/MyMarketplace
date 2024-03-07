"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useSWR from 'swr';
import { StarIcon } from '@radix-ui/react-icons';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@radix-ui/react-dialog';

const Orders = () => {
  const user = useUser();
  const userId = user.user?.id;
  const [orderApiUrl, setOrderApiUrl] = useState<string>('');

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  useEffect(() => {
    if (userId) {
      const url = new URLSearchParams({ userId: userId.toString() });
      setOrderApiUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/payments/getOrderByUserId?${url}`);
    }
  }, [userId]);

  const { data: orders, error: orderError } = useSWR(orderApiUrl, fetcher);
  console.log("orders: ", orders)

  if (orderError) return <div>Failed to load orders</div>;
  if (!orders) return <div>Loading...</div>;

  const handleReview = (orderId: string, productId: string, stars: number) => {
    // Implement your logic to submit the review here
    // This might involve making a POST request to your backend
    console.log(`Review for order ${orderId}, product ${productId}: ${stars} stars`);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Orders</h1>
        {/* Your existing search form */}
      </div>
      {orders.map((order: any) => (
        <div key={order.id} className="card bg-white shadow-sm rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">Order #{order.id}</h2>
              <p className="text-gray-600">Date: {order.date}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Review Products
                </button>
              </DialogTrigger>
              <DialogContent>
                <div className="flex flex-col">
                  {order.products.map((product: any) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <p>{product.name}</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            onClick={() => handleReview(order.id, product.id, star)}
                            className={`h-5 w-5 cursor-pointer ${star <= product.review ? 'text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <DialogClose asChild>
                  <button className="py-2 px-4 mt-4 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Close
                  </button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Orders;
