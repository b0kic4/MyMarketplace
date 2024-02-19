import { NextRequest, NextResponse } from "next/server";
import uploadMiddleware from "./uploadMiddleware";

export async function POST(req: NextRequest) {
  try {
    const isFile = (value: unknown): value is File => {
      return typeof File !== "undefined" && value instanceof File;
    };

    const formData = await req.formData();

    console.log("form data: ", formData);

    if (!formData || !formData.has("productData")) {
      throw new Error("Form data is missing or does not contain productData");
    }

    const productData = JSON.parse(formData.get("productData") as string);
    console.log("productData: ", productData);
    if (
      !productData ||
      !productData.images ||
      !Array.isArray(productData.images)
    ) {
      throw new Error("Invalid productData format");
    }

    const images = productData.images.map(
      (image: { file: File; isLogo: boolean }) => image.file
    );
    const isLogos = productData.images.map(
      (image: { file: File; isLogo: boolean }) => String(image.isLogo)
    );

    console.log("before if images: ", images);

    if (!images || images.length === 0) {
      console.log("no images: ", images);
      return NextResponse.json({ error: "No images found" });
    }

    console.log("after if images: ", images);

    // Call the uploadMiddleware to handle image uploads
    const uploadResults = await uploadMiddleware(images);

    // Handle the results as needed
    console.log("Upload Results:", uploadResults);

    if (!uploadResults || uploadResults.length !== images.length) {
      console.log("upload results failed: ", uploadResults);
      return NextResponse.json({ error: "Mismatch in upload results" });
    }

    // Create an array of isLogos and imageUrls
    const isLogosAndImageUrls = isLogos.map((isLogo: any, index: any) => ({
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
