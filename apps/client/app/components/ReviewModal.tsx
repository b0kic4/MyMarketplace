"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { StarIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';

const ReviewModal = ({ isOpen, onClose, onSubmit, productId, orderId }: any) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const submitReview = () => {
    onSubmit({ productId, orderId, rating, review });
    onClose(); // Close the modal after submitting
  };

  const handleReviewChange = (event: any) => {
    setReview(event.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review For Product</DialogTitle>
          <DialogDescription>
            Add review for product here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Add Comment
            </Label>
            <Textarea
              id="review_comment"
              value={review}
              onChange={handleReviewChange}
              placeholder="Very Nice Product..."
              className="col-span-3"
            />
          </div>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                onClick={() => setRating(star)}
                className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                aria-label={`${star} Stars`}
              />
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onSubmit={submitReview}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
