"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useSWR from 'swr';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Order, Review } from '@client/lib/types';
import { ProductImage } from '../products/cart-products-interface';
import Image from 'next/image';
import OrdersSkeletonLoader from '@client/app/components/OrdersSkeleton';
import ReviewModal from '@client/app/components/ReviewModal';
import NoOrders from '@client/app/components/NoOrdersComponent';
import { toast } from 'react-toastify';

const Orders = () => {
  const user = useUser();
  const userId = user.user?.id;
  const [orderApiUrl, setOrderApiUrl] = useState<string>('');

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  React.useEffect(() => {
    if (userId) {
      const url = new URLSearchParams({ userId: userId.toString() });
      setOrderApiUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/payments/getOrderByUserId?${url}`);
    }
  }, [userId]);

  const { data: orders, error: orderError } = useSWR(orderApiUrl, fetcher);
  console.log("orders: ", orders)

  if (!orders && !orderError) return <div className='p-10'><OrdersSkeletonLoader /></div>;
  if (orderError || (orders && orders.length === 0)) return <NoOrders />;


  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold p-4">Orders</h1>
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
    <div className="card bg-white shadow-sm rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <div>
          <h2 className="font-bold text-sm md:text-lg">Order #{order.id}</h2>
          <p className="text-xs md:text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <ChevronDownIcon className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="mt-4">
          {order.purchasedProducts.map((product: any) => (
            <ProductReview
              key={product.id}
              product={product}
              orderId={order.id}
              reviews={order.reviews.filter((review: Review) => review.productId === product.productId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductReview = ({ product, orderId, reviews }: { product: any, orderId: number, reviews: Review[] }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const mainLogoImage = product.product.images.find((image: ProductImage) => image.isLogo === "true")?.imageUrl || 'default-image-url';

  console.log('reviews: ', reviews)

  const url = process.env.NEXT_PUBLIC_NESTJS_URL
  // Define what happens when a review is submitted
  const handleReviewSubmit = async ({ productId, orderId, rating, review }: any) => {

    const data = {
      orderId: orderId,
      productId: productId,
      cartProductId: product.id,
      rating: rating,
      reviewContent: review
    }

    const response = await fetch(`${url}/payments/createReviewForProduct`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Indicate that the request body format is JSON
      },
      body: JSON.stringify(data)
    });


    if (!response.ok) {
      return toast.error("Error occured when trying to create review for product", {
        position: "top-left",
        theme: "dark"
      })
    }

    toast.success("Successfully created review", {
      position: "top-right",
      theme: "dark"
    })
  };

  return (

    <div className="flex flex-col md:flex-row justify-between items-center my-4 md:my-6">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
        <Image src={mainLogoImage} alt={product.product.title} width={80} height={80} layout='intrinsic' className="rounded-lg shadow-sm" />
        <div className="text-center md:text-left">
          <h3 className="text-md font-semibold text-gray-800">{product.product.title}</h3>
          <p className="text-xs md:text-sm text-gray-500">{product.product.description}</p>
          <div className="text-gray-800">Price: ${product.product.price}</div>
          <div className="text-gray-800">Quantity: {product.quantity}</div>
        </div>
      </div>
      <div className='mt-4 md:mt-0'>
        <ReviewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleReviewSubmit}
          productId={product.productId}
          orderId={orderId}
          reviews={reviews}
        />
      </div>
    </div>
  )
};

export default Orders;
