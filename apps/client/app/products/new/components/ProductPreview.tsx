import React from "react";
import Image from "next/image";
import { Images } from "../interfaces";
import { Button } from "@/components/ui/button";
interface Props {
  images: Images[];
  logoIndex: number | null;
  title: string;
  description: string;
  categoryType: string;
  price: string;
  sizes: string[];
  colors: string[];
  material: string;
  texture: string;
  stock: number;
  shippingInformation: string;
  isChecked: boolean;
}
const ProductPreview: React.FC<Props> = (props) => {
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
      <div className="flex flex-col min-[400px]:flex-row gap-2">
        <Button variant="ghost" className="ml-auto min-w-[100px]" type="submit">
          Save as Draft
        </Button>
        <Button className="ml-auto min-w-[100px] text-green-500" type="submit">
          Publish
        </Button>
      </div>
    </>
  );
};

export default ProductPreview;
