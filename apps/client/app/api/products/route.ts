import { NextRequest, NextResponse } from "next/server";
import uploadMiddleware from "./uploadMiddleware";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const imageEntries = Array.from(formData.entries()).filter(
      ([fieldName, fieldValue]) =>
        (fieldName.startsWith("image_") || fieldName.startsWith("isLogo_")) &&
        ((fieldValue && fieldValue) || typeof fieldValue === "string")
    );

    if (!imageEntries) {
      return NextResponse.json({ error: "no image entries" });
    }

    if (imageEntries.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No images or isLogo values found in the request",
      });
    }

    // this is taking all the entries and finding the one that is true
    const isLogoEntries = imageEntries.filter(([fieldName]) =>
      fieldName.startsWith("isLogo_")
    );
    const imageFileEntries = imageEntries.filter(([fieldName]) =>
      fieldName.startsWith("image_")
    );
    const images: any = imageFileEntries.map(
      ([fieldName, fieldValue]) => fieldValue as any
    );
    const isLogos = isLogoEntries.map(
      ([fieldName, fieldValue]) => fieldValue as string
    );
    if (!images) {
      return NextResponse.json({ error: "No images found" });
    }
    // Call the uploadMiddleware to handle image uploads
    const uploadResults = await uploadMiddleware(images as any);

    if (!uploadResults) {
      console.log("upload results failed: ", uploadResults);
      return NextResponse.json({ error: "No upload results" });
    }
    // Create an array of isLogos and imageUrls
    const isLogosAndImageUrls = isLogos.map((isLogo, index) => ({
      isLogo,
      imageUrl: uploadResults[index]?.imageUrl,
    }));
    // Respond to the frontend based on the upload results, isLogos, and imageUrls
    const success = uploadResults.every((result) => !!result.imageUrl);
    const imageUrls = uploadResults.map((result) => result.imageUrl);
    const errors = uploadResults.map((result) => result.error).filter(Boolean);

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
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
