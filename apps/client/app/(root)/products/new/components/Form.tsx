import React, { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as Switch from "@radix-ui/react-switch";
import Image from "next/image";
import {
  ImageIcon,
  TrashIcon,
  DrawingPinFilledIcon,
} from "@radix-ui/react-icons";
import { Images } from "../interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { parentCategories } from "./categories";
import { Button } from "@/components/ui/button";
interface Props {
  images: Images[];
  setImages: React.Dispatch<React.SetStateAction<Images[]>>;
  logoIndex: number | null;
  setLogoIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleSetLogo: (index: number) => void;
  handleRemoveImage: (index: number) => void;
  handleSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMaterialChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTextureChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStockChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleShippingInformationChange: (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCategoryTypeChange: (e: ChangeEvent<HTMLInputElement> | string) => void;
  handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handlePriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSwitchChange: (
    newCheckedState: boolean | ((prevState: boolean) => boolean),
  ) => void;
  handleImageSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleConditionChange: (
    newCheckedState: boolean | ((prevState: boolean) => boolean),
  ) => void;
  sizeError: string;
  colorError: string;
  materialError: string;
  textureError: string;
  shippingInformationError: string;
  titleError: string;
  priceError: string;
  stockError: string;
  categoryTypeError: string;
  descriptionError: string;
}

const Form: React.FC<Props> = (props) => {
  return (
    <>
      <div className="grid gap-4">
        <div>
          <Label className="text-sm" htmlFor="title">
            Title
          </Label>
          <Input
            id="title"
            className="h-10"
            placeholder="Enter the product title"
            onChange={props.handleTitleChange}
            required
          />
          {props.titleError && (
            <p className="text-red-500 text-sm mt-1">{props.titleError}</p>
          )}
        </div>
        <div>
          <Label className="text-sm" htmlFor="description">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter the product description"
            onChange={props.handleDescriptionChange}
            required
          />
          {props.descriptionError && (
            <p className="text-red-500 text-sm mt-1">
              {props.descriptionError}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm" htmlFor="category">
            Category/Type
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuContent className="bg-white p-2 text-xl w-56">
              <DropdownMenuLabel>Choose</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {parentCategories.map((category) => (
                <>
                  <DropdownMenuItem
                    className="text-base"
                    key={category}
                    onSelect={() => props.handleCategoryTypeChange(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {props.categoryTypeError && (
            <p className="text-red-500 text-sm mt-1">
              {props.categoryTypeError}
            </p>
          )}
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
              onChange={props.handleImageSelect}
            />
            <div className="grid grid-cols-2 gap-4">
              <label
                className="border border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center cursor-pointer"
                htmlFor="images"
              >
                <ImageIcon className="w-6 h-6 fill-muted mr-1" />
                <span className="text-sm text-gray-500">Upload</span>
              </label>
              {props.images.map((image, index) => (
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
                      onClick={() => props.handleSetLogo(index)}
                      className={`p-1 rounded-full ${
                        index === props.logoIndex
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <DrawingPinFilledIcon />
                    </button>
                    <button
                      onClick={() => props.handleRemoveImage(index)}
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
            onChange={props.handleSizeChange}
            required
          />
          {props.sizeError && (
            <p className="text-red-500 text-sm mt-1">{props.sizeError}</p>
          )}
        </div>
        <div>
          <Label className="text-sm" htmlFor="color">
            Color
          </Label>
          <Input
            id="color"
            className="h-10"
            placeholder="Enter the available colors"
            onChange={props.handleColorChange}
            required
          />
          {props.colorError && (
            <p className="text-red-500 text-sm mt-1">{props.colorError}</p>
          )}
        </div>
        <div>
          <Label className="text-sm" htmlFor="material">
            Material
          </Label>
          <Input
            id="material"
            className="h-10"
            onChange={props.handleMaterialChange}
            placeholder="Enter the primary material"
          />
          {props.materialError && (
            <p className="text-red-500 text-sm mt-1">{props.materialError}</p>
          )}
        </div>

        <div>
          <Label className="text-sm" htmlFor="texture">
            Texture
          </Label>
          <Input
            id="texture"
            className="h-10"
            onChange={props.handleTextureChange}
            placeholder="Enter the texture"
          />
          {props.textureError && (
            <p className="text-red-500 text-sm mt-1">{props.textureError}</p>
          )}
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
            type="number"
            placeholder="Enter the price"
            onChange={props.handlePriceChange}
            required
          />
          {props.priceError && (
            <p className="text-red-500 text-sm mt-1">{props.priceError}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label className="text-sm" htmlFor="quantity">
            Quantity/Stock
          </Label>
          <Input
            id="quantity"
            className="h-10"
            type="number"
            onChange={props.handleStockChange}
            placeholder="Enter the available quantity"
            required
          />
          {props.stockError && (
            <p className="text-red-500 text-sm mt-1">{props.stockError}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label className="text-sm" htmlFor="shipping">
            Shipping Information
          </Label>
          <Textarea
            id="shipping"
            onChange={props.handleShippingInformationChange}
            placeholder="Enter shipping information"
            required
          />
          {props.shippingInformationError && (
            <p className="text-red-500 text-sm mt-1">
              {props.shippingInformationError}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm" htmlFor="availability">
            Availability
          </Label>
          <Switch.Root
            defaultChecked
            className="w-[42px] active:none h-[25px] bg-blackA6 rounded-full relative shadow-[0_1px_5px] shadow-blackA4 focus:shadow-[0_0_0_1px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
            id="airplane-mode"
            onCheckedChange={props.handleSwitchChange}
          >
            <Switch.Thumb className="block w-[21px] active:none h-[21px] bg-white rounded-full shadow-[0_1px_3px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm" htmlFor="condition">
            Condition
          </Label>
          <Switch.Root
            className="w-[42px] active:none h-[25px] bg-blackA6 rounded-full relative shadow-[0_1px_5px] shadow-blackA4 focus:shadow-[0_0_0_1px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
            id="condition"
            onCheckedChange={props.handleConditionChange}
          >
            <Switch.Thumb className="block w-[21px] active:none h-[21px] bg-white rounded-full shadow-[0_1px_3px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>
      </div>
    </>
  );
};

export default Form;
