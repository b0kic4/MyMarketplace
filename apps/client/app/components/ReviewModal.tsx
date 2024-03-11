// At the top of your component file, ensure client-side execution
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { StarIcon } from '@radix-ui/react-icons';
import { Review } from '@client/lib/types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewData: { productId: string | number; orderId: string | number; rating: number; review: string }) => void;
  productId: string | number;
  orderId: string | number;
  reviews: Review[]
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit, productId, orderId, reviews }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const submitReview = () => {
    onSubmit({ productId, orderId, rating, review });
    onClose(); // Close the modal after submitting
  };
  const receivedReviews = reviews.filter((review) => review.productId === productId);

  console.log("productIds: ", receivedReviews)

  const hasReviews = receivedReviews.length > 0;

  const removeReview = (reviewId: number) => {
    // Here you'd call a function to handle the deletion of the review
    console.log(`Removing review with ID: ${reviewId}`);
    // Update your state accordingly
  };

  return (
    <Dialog>
      {hasReviews ? (
        receivedReviews.map((review) => (
          <div key={review.id}>
            <Button variant="outline" onClick={() => removeReview(review.id)}>Remove Review</Button>
          </div>
        ))
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setRating(0)}>Add Review</Button>
        </DialogTrigger>
      )}
      <DialogContent className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="grid gap-4 py-4 bg-white rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>Add Review For Product</DialogTitle>
            <DialogDescription>
              Share your experience with us.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            id="review_comment"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you think of the product?"
            className="col-span-3"
          />
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                onClick={() => setRating(star)}
                className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                aria-label={`${star} Stars`}
                strokeWidth={2} // Makes the stars a bit bolder
              />
            ))}
          </div>
          <DialogFooter className="flex justify-end gap-4">
            <DialogClose>
              <Button variant="ghost" onClick={onClose}>Close</Button>
              <Button variant="outline" onClick={submitReview}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog >
  );
};

export default ReviewModal;
