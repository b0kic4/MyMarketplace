"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useSWR from 'swr';
import { ChevronDownIcon, StarIcon } from '@radix-ui/react-icons';
import { Order } from '@client/lib/types';
import { ProductImage } from '../products/cart-products-interface';
import Image from 'next/image';
const Orders = () => {
  const user = useUser();
  const userId = user.user?.id;
  const [orderApiUrl, setOrderApiUrl] = useState('');

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  React.useEffect(() => {
    if (userId) {
      const url = new URLSearchParams({ userId: userId.toString() });
      setOrderApiUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/payments/getOrderByUserId?${url}`);
    }
  }, [userId]);

  const { data: orders, error: orderError } = useSWR(orderApiUrl, fetcher);

  if (orderError) return <div>Failed to load orders</div>;
  if (!orders) return <div>Loading...</div>;

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-lg font-semibold">Orders</h1>
      {orders.map((order: Order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </main>
  );
};

const OrderCard = ({ order }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="card bg-white shadow-sm rounded-lg p-4">
      <div className="flex justify-between items-center" onClick={toggleOpen}>
        <div>
          <h2 className="font-bold text-lg">Order #{order.id}</h2>
          <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <ChevronDownIcon className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="mt-4">
          {order.purchasedProducts.map((product: any) => (
            <ProductReview key={product.id} product={product} orderId={order.id} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductReview = ({ product, orderId }: { product: any, orderId: number }) => {
  // Finds the main logo image based on the isLogo property being "true"
  const mainLogoImage = product.product.images.find((image: ProductImage) => image.isLogo === "true")?.imageUrl || 'default-image-url';

  const handleReview = (productId: number, stars: any) => {
    console.log(`Review for order ${orderId}, product ${productId}: ${stars} stars`);
    // Implementation for submitting the review goes here
  };

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex items-start">
        <Image src={mainLogoImage} loading='lazy' alt={product.product.title} width={100} height={100} className="w-20 h-20 object-cover mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{product.product.title}</h3>
          <p className="text-sm">{product.product.description}</p>
          <p>Price: ${product.product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      </div>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            onClick={() => handleReview(product.productId, star)}
            className="h-5 w-5 cursor-pointer text-gray-300 hover:text-yellow-500"
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
