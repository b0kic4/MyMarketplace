"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Images } from "../interfaces";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
interface Props {
  images: Images[];
  logoIndex: number | null;
  title: string;
  description: string;
  categoryType: string;
  price: string;
  sizes: string;
  colors: string;
  material: string;
  texture: string;
  stock: number;
  shippingInformation: string;
  isChecked: boolean;
}

interface IsLogoAndImageUrl {
  isLogo: boolean;
  imageUrl: string;
}

const ProductPreview: React.FC<Props> = (props) => {
  const user = useUser();
  const [logoAndImageUrls, setLogoAndImageUrls] = useState<IsLogoAndImageUrl>();
  const handlePublish = async () => {
    try {
      // Upload images to Firebase Cloud Storage
      const formData = new FormData();

      // Append product data
      const productData = {
        images: props.images.map((image, index) => ({
          file: image.file,
          isLogo: !!(index === props.logoIndex),
        })),
      };

      formData.append("productData", JSON.stringify(productData));

      // Append isLogo property separately
      props.images.forEach((image, index) => {
        formData.append(
          `isLogo_${index}`,
          index === props.logoIndex ? "true" : "false"
        );
      });

      // Append each image file
      props.images.forEach((image, index) => {
        formData.append(`image_${index}`, image.file);
      });

      console.log("data that is being sent from fontend: ", formData);

      // Send data to the backend using FormData
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLogoAndImageUrls(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const sendProductData = async () => {
      const url = process.env.NEXT_PUBLIC_NESTJS_URL;
      const finalProductData = {
        title: props.title,
        description: props.description,
        categoryType: props.categoryType,
        images: logoAndImageUrls,
        price: props.price,
        sizes: props.sizes,
        colors: props.colors,
        material: props.material,
        texture: props.texture,
        stock: props.stock,
        shippingInformation: props.shippingInformation,
        isChecked: props.isChecked,
        userId: user.user?.id,
      };

      if (logoAndImageUrls) {
        try {
          const response = await axios.post(
            `${url}/products`,
            finalProductData
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    };

    // Call the asynchronous function immediately
    sendProductData();
  }, [logoAndImageUrls]);
  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="grid gap-4">
          {props.logoIndex !== null && (
            <Image
              alt="Product Preview"
              className="object-cover w-full h-60"
              height={300}
              width={400}
              src={URL.createObjectURL(props.images[props.logoIndex].file)}
            />
          )}
          <div>
            <h3 className="font-semibold text-lg">{props.title}</h3>
            <p>Description: {props.description}</p>
            <p>Category: {props.categoryType}</p>
            <p>Price: {props.price} $</p>
            <p>Available Sizes: {props.sizes}</p>
            <p>Available Colors: {props.colors}</p>
            <p>Material: {props.material}</p>
            <p>Texture: {props.texture}</p>
            <p>Quantity in Stock: {props.stock}</p>
            <p>Shipping Information: {props.shippingInformation}</p>
            <p>
              Availability: {props.isChecked ? "Available" : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-2 flex-col min-[400px]:flex-row gap-2">
        <Button variant="ghost" className="ml-auto min-w-[100px]" type="submit">
          Save as Draft
        </Button>
        <Button
          onClick={handlePublish}
          className="ml-auto min-w-[100px] text-green-500"
          type="submit"
        >
          Publish
        </Button>
      </div>
    </>
  );
};

export default ProductPreview;
