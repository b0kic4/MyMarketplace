"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { DialogTrigger } from '@radix-ui/react-dialog';

const ReviewModal = ({ isOpen, onClose, onSubmit, productId, orderId }: any) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const submitReview = () => {
    onSubmit({ productId, orderId, rating, review });
    onClose(); // Close the modal after submitting
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>
        <Button>
          Submit your Review
        </Button>
      </DialogTrigger>
      <DialogTitle>Review the product</DialogTitle>
      <DialogContent className="space-y-4">
        <div className="text-center">How would you rate this product?</div>
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
        <Label htmlFor='review'>Your review</Label>
        <Input
          id='review'
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          className="w-full"
        />
      </DialogContent>
      <div className="flex justify-end space-x-2 p-4">
        <Button onClick={onClose} variant="destructive">Cancel</Button>
        <Button onClick={submitReview} variant="outline">Submit Review</Button>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
