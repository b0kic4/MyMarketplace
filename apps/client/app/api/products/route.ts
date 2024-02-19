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
      throw new Error("From data is missing");
    }
    // Filter files with names containing 'image_' and 'isLogo_'
    const imageEntries = Array.from(formData.entries()).filter(
      ([fieldName, fieldValue]) =>
        (fieldName.startsWith("image_") || fieldName.startsWith("isLogo_")) &&
        (isFile(fieldValue) || typeof fieldValue === "string")
    );

    console.log("image entries: ", imageEntries);

    if (!imageEntries) {
      console.error("No image entries found: ", imageEntries);
      return NextResponse.json({ error: "no image entries" });
    }

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
    // Convert the imageFileEntries and isLogoEntries to arrays
    const images = imageFileEntries.map(
      ([fieldName, fieldValue]) => fieldValue as File
    );
    const isLogos = isLogoEntries.map(
      ([fieldName, fieldValue]) => fieldValue as string
    );
    if (!images) {
      return NextResponse.json({ error: "No images found" });
    }
    // Call the uploadMiddleware to handle image uploads
    const uploadResults = await uploadMiddleware(images);

    // Handle the results as needed
    if (!uploadResults) {
      return NextResponse.json({ error: "No upload results" });
    }
    // Create an array of isLogos and imageUrls
    const isLogosAndImageUrls = isLogos.map((isLogo, index) => ({
      isLogo,
      imageUrl: uploadResults[index]?.imageUrl,
    }));
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
