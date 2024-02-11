"use client";
import { ChangeEvent, useState } from "react";
import { Images } from "./interfaces";
import Form from "./components/Form";
import ProductPreview from "./components/ProductPreview";
import imageCompression from "browser-image-compression";
export default function Component() {
  // State Hooks
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
  const [isUsed, setIsUsed] = useState<boolean>(false);

  // Error States
  const [sizeError, setSizeError] = useState<string>("");
  const [colorError, setColorError] = useState<string>("");
  const [materialError, setMaterialError] = useState<string>("");
  const [textureError, setTextureError] = useState<string>("");
  const [shippingInformationError, setShippingInformationError] =
    useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [stockError, setStockError] = useState<string>("");
  const [categoryTypeError, setCategoryTypeError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || []);

    // Event Handlers

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
    let sizeError = "";

    if ((newSize.length > 0 && newSize.length < 20) || newSize === "") {
      setSizes(newSize);
    } else {
      sizeError = "Provide a valid input for sizes (max 20 characters)";
    }

    setSizeError(sizeError);
    setHasErrors(true);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    let colorError = "";

    if ((newColor.length >= 2 && newColor.length < 100) || newColor === "") {
      setColors(newColor);
    } else {
      colorError = "Provide a valid colors input";
    }

    setColorError(colorError);
    setHasErrors(true);
  };

  const handleMaterialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMaterial = e.target.value;
    let materialError = "";

    if (
      (newMaterial.length >= 2 && newMaterial.length < 30) ||
      newMaterial === ""
    ) {
      setMaterial(newMaterial);
    } else {
      materialError =
        "Material must be at least 2 characters long and less than 30 characters";
    }

    setMaterialError(materialError);
    setHasErrors(true);
  };

  const handleTextureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTextureText = e.target.value;
    let textureError = "";

    if (
      (newTextureText.length > 0 && newTextureText.length < 30) ||
      newTextureText === ""
    ) {
      setTexture(newTextureText);
    } else {
      textureError = "Provide a valid texture input (max 30 characters)";
    }

    setTextureError(textureError);
    setHasErrors(true);
  };

  const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStock = parseInt(e.target.value, 10);
    let stockError = "";

    if (!isNaN(newStock)) {
      setStock(newStock);
    } else {
      stockError = "Please provide a valid stock value";
    }

    setStockError(stockError);
    setHasErrors(true);
  };
  const handleShippingInformationChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const shippingInformation = e.target.value;
    let shippingInformationError = "";

    if (
      (shippingInformation.length >= 3 && shippingInformation.length < 100) ||
      shippingInformation === ""
    ) {
      setShippingInformation(shippingInformation);
    } else {
      shippingInformationError =
        "Shipping information must be at least 10 characters long and less than 100 characters";
    }

    setShippingInformationError(shippingInformationError);
    setHasErrors(true);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    let titleError = "";

    if (newTitle.length >= 3 || newTitle === "") {
      setTitle(newTitle);
    } else {
      titleError = "Title must be at least 3 characters long";
    }

    setTitleError(titleError);
    setHasErrors(true);
  };
  const handleCategoryTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCategoryType = e.target.value;
    let categoryTypeError = "";

    if (
      (newCategoryType.length >= 3 && newCategoryType.length < 30) ||
      newCategoryType === ""
    ) {
      setCategoryType(newCategoryType);
    } else {
      categoryTypeError =
        "Category must be at least 3 characters long and less than 30 characters";
    }

    // Pass the error to the state
    setCategoryTypeError(categoryTypeError);
    setHasErrors(true);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    let descriptionError = "";

    if (
      (newDescription.length >= 10 && newDescription.length < 500) || // Adjust the character limit as needed
      newDescription === ""
    ) {
      setDescription(newDescription);
    } else {
      descriptionError =
        "Description must be at least 10 characters long and less than 500 characters";
    }

    // Pass the error to the state
    setDescriptionError(descriptionError);
    setHasErrors(true);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value, 10);
    let priceErrorProvided = "";
    if (!isNaN(newPrice)) {
      setStock(newPrice);
      setPrice(e.target.value);
    } else {
      priceErrorProvided = "Please provide a valid stock value";
    }
    setPriceError(priceErrorProvided);
    setHasErrors(true);
  };
  const handleSwitchChange = (
    newCheckedState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsChecked(newCheckedState);
  };
  const handleConditionChange = (
    newCheckedState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsUsed(newCheckedState);
  };

  // Check for errors

  const [hasErrors, setHasErrors] = useState<boolean>(false);

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
          handleConditionChange={handleConditionChange}
          handleImageSelect={handleImageSelect}
          colorError={colorError}
          materialError={materialError}
          priceError={priceError}
          shippingInformationError={shippingInformationError}
          sizeError={sizeError}
          stockError={stockError}
          textureError={textureError}
          titleError={titleError}
          categoryTypeError={categoryTypeError}
          descriptionError={descriptionError}
        />
      </div>
      <div className="md:col-span-1">
        <ProductPreview
          isUsed={isUsed}
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
          hasErrors={hasErrors}
        />
      </div>
    </div>
  );
}
