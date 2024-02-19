import { NextRequest, NextResponse } from "next/server";
import uploadMiddleware from "./uploadMiddleware";

export async function POST(req: NextRequest) {
  try {
    const isFile = (value: unknown): value is File => {
      return typeof File !== "undefined" && value instanceof File;
    };

    const formData = await req.formData();

    console.log("form data: ", formData);
    if (!formData) {
      throw new Error("Form data is missing");
    }

    // Filter files with names containing 'image_' and 'isLogo_'
    const imageEntries = Array.from(formData.entries()).filter(
      ([fieldName, fieldValue]) => {
        console.log("Field Name:", fieldName);
        console.log("Field Value:", fieldValue);

        return (
          (fieldName.startsWith("image_") || fieldName.startsWith("isLogo_")) &&
          (isFile(fieldValue) || typeof fieldValue === "string")
        );
      }
    );

    console.log("Image Entries:", imageEntries);

    if (imageEntries.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No images or isLogo values found in the request",
      });
    }

    // Separate image entries and isLogo entries
    const isLogoEntries = imageEntries.filter(([fieldName]) =>
      fieldName.startsWith("isLogo_")
    );
    const imageFileEntries = imageEntries.filter(([fieldName]) =>
      fieldName.startsWith("image_")
    );

    console.log("LOGO ENTRIES: ", isLogoEntries);
    console.log("IMAGE FILE ENTRIES: ", imageFileEntries);

    // Convert the imageFileEntries and isLogoEntries to arrays
    const images = imageFileEntries.map(
      ([fieldName, fieldValue]) => fieldValue as File
    );
    const isLogos = isLogoEntries.map(
      ([fieldName, fieldValue]) => fieldValue as string
    );

    console.log("before if images: ", images);
    console.log("is logos: ", isLogos);

    if (!images || images.length === 0) {
      console.log("no images: ", images);
      console.log("no is logos: ", isLogos);
      return NextResponse.json({ error: "No images found" });
    }

    console.log("after if images: ", images);
    console.log("after if is logos: ", isLogos);

    // Call the uploadMiddleware to handle image uploads
    const uploadResults = await uploadMiddleware(images);

    // Handle the results as needed
    console.log("Upload Results:", uploadResults);

    if (!uploadResults || uploadResults.length !== images.length) {
      console.log("upload results failed: ", uploadResults);
      return NextResponse.json({ error: "Mismatch in upload results" });
    }

    // Create an array of isLogos and imageUrls
    const isLogosAndImageUrls = isLogos.map((isLogo, index) => ({
      isLogo,
      imageUrl: uploadResults[index]?.imageUrl,
    }));

    console.log("before if Is Logos and Image: ", isLogosAndImageUrls);

    if (!isLogosAndImageUrls) {
      console.log("No Logos and Image");
    }

    console.log("after if Is Logos and Image: ", isLogosAndImageUrls);

    // Respond to the frontend based on the upload results, isLogos, and imageUrls
    const success = uploadResults.every((result) => !!result.imageUrl);
    const imageUrls = uploadResults.map((result) => result.imageUrl);
    const errors = uploadResults.map((result) => result.error).filter(Boolean);

    console.log("image urls: ", imageUrls);

    if (success) {
      return NextResponse.json({
        success: true,
        isLogosAndImageUrls,
      });
    } else {
      return NextResponse.json({
        success: false,
        errors: errors.length > 0 ? errors : ["Unknown error during upload"],
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
