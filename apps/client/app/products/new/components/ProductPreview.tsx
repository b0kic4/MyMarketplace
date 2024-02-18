"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Images } from "../interfaces";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@client/app/components/Loading";
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
  isUsed: boolean;
  hasErrors: boolean;
}

interface IsLogoAndImageUrl {
  isLogo: boolean;
  imageUrl: string;
}

const ProductPreview: React.FC<Props> = (props) => {
  const user = useUser();
  const router = useRouter();
  const [logoAndImageUrls, setLogoAndImageUrls] = useState<IsLogoAndImageUrl>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // if (props.hasErrors) return;
  const handlePublish = async () => {
    try {
      setIsLoading(true);
      if (
        props.title === "" ||
        props.description === "" ||
        props.categoryType === "" ||
        props.price === "" ||
        props.sizes === "" ||
        props.colors === "" ||
        props.material === "" ||
        props.texture === "" ||
        props.shippingInformation === ""
      ) {
        return toast.error("Please provide valid form values!", {
          position: "top-left",
          theme: "dark",
        });
      }
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
      // Send data to the backend using FormData
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLogoAndImageUrls(response.data);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response Error:", error.response.data);
        console.error("Status Code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request Error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
      }

      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
        isUsed: props.isUsed,
      };

      if (logoAndImageUrls && !props.hasErrors) {
        try {
          setIsLoading(true);
          const response = await axios.post(
            `${url}/products`,
            finalProductData
          );
          if (response.status === 201) {
            toast.success("Product has been successfully created!", {
              position: "top-right",
              theme: "dark",
            });
            router.push("/products");
          } else {
            toast.error("Image property is missing!", {
              position: "top-left",
              theme: "dark",
            });
          }
        } catch (error: any) {
          toast.error(error.message, {
            position: "top-left",
            theme: "dark",
          });
          setIsLoading(false);
        } finally {
          setIsLoading(false);
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
              src={URL.createObjectURL(props?.images[props.logoIndex].file)}
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
            <p>Condition: {props.isUsed ? "Used" : "New"}</p>
          </div>
        </div>
      </div>
      <div className="flex mt-2 flex-col min-[400px]:flex-row gap-2">
        {!isLoading ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="ml-auto min-w-[100px]"
              type="submit"
            >
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
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default ProductPreview;
