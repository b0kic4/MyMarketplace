"use client";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Images } from "./interfaces";
import Form from "./components/From";
import ProductPreview from "./components/ProductPreview";
import imageCompression from "browser-image-compression";

export default function Component() {
  const [images, setImages] = useState<Images[]>([]);
  const [logoIndex, setLogoIndex] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryType, setCategoryType] = useState<string>("");
  const [sizes, setSizes] = useState<string>("");
  const [colors, setColors] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [texture, setTexture] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [shippingInformation, setShippingInformation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(true);

  // FIX COLOR CHANGE - ADD MENU OPTIONS FOR CHOSING COLORS

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || []);

    try {
      const compressedImages: Images[] = await Promise.all(
        selectedImages.map(async (file, index) => {
          // Set compression options
          const options = {
            maxSizeMB: 0.35,
            maxWidthOrHeight: 1920,
          };

          // Compress the image
          const compressedFile = await imageCompression(file, options);

          return {
            file: compressedFile,
            isLogo: logoIndex === null && index === 0,
          };
        })
      );

      setImages([...images, ...compressedImages]);

      if (logoIndex === null && compressedImages.length > 0) {
        setLogoIndex(0);
      }
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  const handleSetLogo = (index: number) => {
    setImages((prevImages) =>
      prevImages.map((image, i) => ({
        ...image,
        isLogo: i === index,
      }))
    );
    setLogoIndex(index);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);

    // If removed image is the logo, update the logo index
    if (index === logoIndex) {
      setLogoIndex(null);
    }

    setImages(updatedImages);
  };
  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value;
    setSizes(newSize);
  };
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColors(newColor); // Replace the entire array with the new color
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
      <div className="md:col-span-1">
        <Form
          images={images}
          setImages={setImages}
          logoIndex={logoIndex}
          setLogoIndex={setLogoIndex}
          handleSetLogo={handleSetLogo}
          handleRemoveImage={handleRemoveImage}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
          handleMaterialChange={handleMaterialChange}
          handleTextureChange={handleTextureChange}
          handleShippingInformationChange={handleShippingInformationChange}
          handleTitleChange={handleTitleChange}
          handleCategoryTypeChange={handleCategoryTypeChange}
          handlePriceChange={handlePriceChange}
          handleDescriptionChange={handleDescriptionChange}
          handleStockChange={handleStockChange}
          handleSwitchChange={handleSwitchChange}
          handleImageSelect={handleImageSelect}
        />
      </div>
      <div className="md:col-span-1">
        <ProductPreview
          images={images}
          logoIndex={logoIndex}
          title={title}
          description={description}
          categoryType={categoryType}
          price={price}
          sizes={sizes}
          colors={colors}
          material={material}
          texture={texture}
          stock={stock}
          shippingInformation={shippingInformation}
          isChecked={isChecked}
        />
      </div>
    </div>
  );
}
