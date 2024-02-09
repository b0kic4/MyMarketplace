"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as Switch from "@radix-ui/react-switch";
import {
  ImageIcon,
  TrashIcon,
  DrawingPinFilledIcon,
} from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

interface Image {
  file: File;
  isLogo: boolean;
}

export default function Component() {
  const [images, setImages] = useState<Image[]>([]);
  const [logoIndex, setLogoIndex] = useState<number | null>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || []);
    const newImages: Image[] = selectedImages.map((file) => ({
      file,
      isLogo: false,
    }));

    setImages([...images, ...newImages]);

    if (logoIndex === null && newImages.length > 0) {
      setLogoIndex(0);
    }
  };

  const handleSetLogo = (index: number) => {
    setLogoIndex(index);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);

    // If removed image is the logo, update the logo index
    if (index === logoIndex) {
      setLogoIndex(null);
    }

    setImages(updatedImages);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start max-w-3xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <div>
          <Label className="text-sm" htmlFor="title">
            Title
          </Label>
          <Input
            id="title"
            className="h-10"
            placeholder="Enter the product title"
            required
          />
        </div>
        <div>
          <Label className="text-sm" htmlFor="description">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter the product description"
            required
          />
        </div>
        <div>
          <Label className="text-sm" htmlFor="category">
            Category/Type
          </Label>
          <Input
            id="category"
            className="h-10"
            placeholder="Enter the category"
            required
          />
        </div>
        <div>
          <div>
            <Label className="text-sm" htmlFor="images">
              Upload Images
            </Label>
            <input
              accept="image/*"
              className="hidden"
              id="images"
              multiple
              name="images"
              type="file"
              onChange={handleImageSelect}
            />
            <div className="grid grid-cols-2 gap-4">
              <label
                className="border border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center cursor-pointer"
                htmlFor="images"
              >
                <ImageIcon className="w-6 h-6 fill-muted" />
                <span className="text-sm text-gray-500">Upload</span>
              </label>
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    height={16}
                    width={9}
                    src={URL.createObjectURL(image.file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleSetLogo(index)}
                      className={`p-1 rounded-full ${
                        index === logoIndex
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <DrawingPinFilledIcon />
                    </button>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="p-1 rounded-full bg-red-500 text-white"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Label className="text-sm" htmlFor="size">
            Size
          </Label>
          <Input
            id="size"
            className="h-10"
            placeholder="Enter the available sizes"
            required
          />
        </div>
        <div>
          <Label className="text-sm" htmlFor="color">
            Color
          </Label>
          <Input
            id="color"
            className="h-10"
            placeholder="Enter the available colors"
            required
          />
        </div>
        <div>
          <Label className="text-sm" htmlFor="material">
            Material
          </Label>
          <Input
            id="material"
            className="h-10"
            placeholder="Enter the primary material"
          />
        </div>
        <div>
          <Label className="text-sm" htmlFor="texture">
            Texture
          </Label>
          <Input
            id="texture"
            className="h-10"
            placeholder="Enter the texture"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label className="text-sm" htmlFor="price">
            Price
          </Label>
          <Input
            id="price"
            className="h-10"
            placeholder="Enter the price"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-sm" htmlFor="quantity">
            Quantity/Stock
          </Label>
          <Input
            id="quantity"
            className="h-10"
            placeholder="Enter the available quantity"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-sm" htmlFor="shipping">
            Shipping Information
          </Label>
          <Textarea
            id="shipping"
            placeholder="Enter shipping information"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm" htmlFor="availability">
            Availability
          </Label>
          <Switch.Root
            defaultChecked
            className="w-[42px] active:none h-[25px] bg-blackA6 rounded-full relative shadow-[0_1px_5px] shadow-blackA4 focus:shadow-[0_0_0_1px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
            id="airplane-mode"
          >
            <Switch.Thumb className="block w-[21px] active:none h-[21px] bg-white rounded-full shadow-[0_1px_3px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="grid gap-4">
            {logoIndex !== null && (
              <Image
                alt="Product Preview"
                className="object-cover w-full h-60"
                height={300}
                width={400}
                src={URL.createObjectURL(images[logoIndex].file)}
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">Product Name</h3>
              <p>Description of the product</p>
              <p>Category: Product Category</p>
              <p>Price: $XX.XX</p>
              <p>Available Sizes: Size1, Size2, Size3</p>
              <p>Available Colors: Color1, Color2, Color3</p>
              <p>Material: Product Material</p>
              <p>Texture: Product Texture</p>
              <p>Quantity in Stock: XX</p>
              <p>Shipping Information: Shipping Details</p>
              <p>Availability: Available/Out of Stock</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-[400px]:flex-row gap-2">
          <Button
            variant="ghost"
            className="ml-auto min-w-[100px]"
            type="submit"
          >
            Save as Draft
          </Button>
          <Button
            className="ml-auto min-w-[100px] text-green-500"
            type="submit"
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
