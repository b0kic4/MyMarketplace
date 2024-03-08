
import React from 'react';
import Image from 'next/image';
const NoOrders = () => {
  const imageLink = "https://firebasestorage.googleapis.com/v0/b/mymarketplace-f6e5f.appspot.com/o/assets%2FEmptyOrders.webp?alt=media&token=e697566d-255b-4abc-95e9-d65ec0785ee9"
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 my-8">
      <Image src={imageLink} width={200} height={200} alt="No Orders" className="w-1/2 max-w-sm mb-8" />
      <h2 className="text-lg font-semibold mb-2">No Orders Yet</h2>
      <p className="text-gray-600">It looks like you haven’t placed any orders yet.</p>
      <p className="text-gray-600">Start shopping now!</p>
    </div>
  );
};

export default NoOrders;
