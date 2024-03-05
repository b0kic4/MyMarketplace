import React from 'react';
import Image from 'next/image';
import { ProductImage } from '../(root)/products/cart-products-interface';

interface GalleryModalProps {
  isOpen: boolean;
  images: ProductImage[];
  initialIndex: number;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  if (!isOpen) return null;

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-2 rounded-lg max-w-3xl max-h-full overflow-auto">
        <Image
          src={images[currentIndex].imageUrl}
          alt="Zoomed in"
          width={600}
          height={600}
          layout="responsive"
          objectFit="contain"
        />
        <div className="flex justify-between mt-2">
          <button onClick={goToPrevious} className="p-2 bg-gray-200 rounded">Prev</button>
          <button onClick={onClose} className="p-2 bg-red-500 text-white rounded">Close</button>
          <button onClick={goToNext} className="p-2 bg-gray-200 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal
