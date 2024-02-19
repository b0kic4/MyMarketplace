import { NextRequest, NextResponse } from "next/server";
import uploadMiddleware from "./uploadMiddleware";

export async function POST(req: NextRequest) {
  try {
    const isFile = (value: unknown): value is File => {
      return typeof File !== "undefined" && value instanceof File;
    };

    const formData = await req.formData();
    console.log("form Data: ", formData);

    // Filter files with names containing 'image_' and 'isLogo_'
    const entries = Array.from(formData.entries());
    console.log("Form Data Entries: ", entries);

    formData.forEach((fieldValue, fieldName) => {
      console.log(`fieldName: ${fieldName}, fieldValue: ${fieldValue}`);
      console.log("File instance check: ", fieldValue instanceof File);
    });

    // fix not getting images in image Entries
    // Filter files with names containing 'image_' and 'isLogo_'
    const imageEntries = Array.from(formData.entries()).filter(
      ([fieldName, fieldValue]) =>
        (fieldName.startsWith("image_") || fieldName.startsWith("isLogo_")) &&
        ((isFile(fieldValue) && fieldValue instanceof File) ||
          typeof fieldValue === "string")
    );

    console.log("image entries: ", imageEntries);

    console.log("image entries: ", imageEntries);
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

    console.log("is logo entries: ", isLogoEntries);

    const imageFileEntries = imageEntries.filter(([fieldName]) =>
      fieldName.startsWith("image_")
    );

    // Convert the imageFileEntries and isLogoEntries to arrays
    const images: any = imageFileEntries.map(
      ([fieldName, fieldValue]) => fieldValue
    );
    const isLogos = isLogoEntries.map(
      ([fieldName, fieldValue]) => fieldValue as string
    );

    console.log("before if images: ", images);
    if (!images) {
      console.log("no images: ", images);
      return NextResponse.json({ error: "No images found" });
    }
    console.log("after if images: ", images);

    // Call the uploadMiddleware to handle image uploads
    const uploadResults = await uploadMiddleware(images);

    // Handle the results as needed
    console.log("Upload Results:", uploadResults);
    if (!uploadResults) {
      console.log("upload results failed: ", uploadResults);
      return NextResponse.json({ error: "No upload results" });
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
    console.log(" if Is Logos and Image: ", isLogosAndImageUrls);

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
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
