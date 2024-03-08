"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useSWR from 'swr';
import { ChevronDownIcon, StarIcon } from '@radix-ui/react-icons';
import { Order } from '@client/lib/types';
import { ProductImage } from '../products/cart-products-interface';
import Image from 'next/image';
import OrdersSkeletonLoader from '@client/app/components/OrdersSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import ReviewModal from '@client/app/components/ReviewModal';

import NoOrders from '@client/app/components/NoOrdersComponent';
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

  if (orderError) return <div>Error loading orders</div>;
  if (!orders) return <div className='p-10'><NoOrders /></div>;
  if (!orders && !orderError) <div><OrdersSkeletonLoader /></div>

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
    <div className="card bg-white shadow-sm rounded-lg px-20">
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
  const [modalOpen, setModalOpen] = useState(false);

  const mainLogoImage = product.product.images.find((image: ProductImage) => image.isLogo === "true")?.imageUrl || 'default-image-url';


  // Define what happens when a review is submitted
  const handleReviewSubmit = ({ productId, orderId, rating, review }: any) => {
    console.log("called")
    console.log(`Review submitted for order ${orderId}, product ${productId}: ${rating} stars, review: ${review}`);
    // Here you should implement the logic to actually submit the review to your backend
  };

  return (

    <div className="flex justify-between items-center my-6">
      <div className="flex space-x-4">
        <Image src={mainLogoImage} alt={product.product.title} width={100} height={100} className="rounded-lg shadow-sm" />
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{product.product.title}</h3>
          <p className="text-sm text-gray-500">{product.product.description}</p>
          <div className="text-gray-800">Price: ${product.product.price}</div>
          <div className="text-gray-800">Quantity: {product.quantity}</div>
        </div>
      </div>
      <div>
        <ReviewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleReviewSubmit}
          productId={product.productId}
          orderId={orderId}
        />
      </div >
    </div >
  )
};

export default Orders;
