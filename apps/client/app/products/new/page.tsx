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
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryType, setCategoryType] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [material, setMaterial] = useState<string>("");
  const [texture, setTexture] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [shippingInformation, setShippingInformation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
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
  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value;
    setSizes((prevSizes) => [...prevSizes, newSize]);
  };
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColors((prevColors) => [...prevColors, newColor]);
  };
  const handleMaterialChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaterial(e.target.value);
  };
  const handleTextureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTexture(e.target.value);
  };
  const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStock = parseInt(e.target.value, 10);
    // Check if the parsed value is a valid number
    if (!isNaN(newStock)) {
      setStock(newStock);
    } else {
      console.error("Invalid stock value");
    }
  };
  const handleShippingInformationChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setShippingInformation(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleCategoryTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryType(e.target.value);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleSwitchChange = (
    newCheckedState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsChecked(newCheckedState);
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
            onChange={handleTitleChange}
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
            onChange={handleDescriptionChange}
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
            onChange={handleCategoryTypeChange}
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
            onChange={handleSizeChange}
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
            onChange={handleColorChange}
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
            onChange={handleMaterialChange}
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
            onChange={handleTextureChange}
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
            onChange={handlePriceChange}
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
            onChange={handleStockChange}
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
            onChange={handleShippingInformationChange}
            placeholder="Enter shipping information"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm" htmlFor="availability">
            Availability
          </Label>
          <Switch.Root
            className="w-[42px] active:none h-[25px] bg-blackA6 rounded-full relative shadow-[0_1px_5px] shadow-blackA4 focus:shadow-[0_0_0_1px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
            id="airplane-mode"
            onCheckedChange={handleSwitchChange}
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
              <h3 className="font-semibold text-lg">{title}</h3>
              <p>Description: {description}</p>
              <p>Category: {categoryType}</p>
              <p>Price: {price} $</p>
              <p>Available Sizes: {sizes}</p>
              <p>Available Colors: {colors}</p>
              <p>Material: {material}</p>
              <p>Texture: {texture}</p>
              <p>Quantity in Stock: {stock}</p>
              <p>Shipping Information: {shippingInformation}</p>
              <p>Availability: {isChecked ? "Available" : "Out of Stock"}</p>
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
