import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import { storage } from "../firebase";
import sharp from "sharp";

interface FileProperties {
  size: number;
  type: string;
  name: string;
  lastModified: number;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log(formData);

    // Filter files with names containing 'image_'
    const imageEntries = Array.from(formData.entries()).filter(
      ([fieldName, fieldValue]) =>
        fieldName.startsWith("image_") && fieldValue instanceof File
    );

    // Array to store promises for each image upload task
    const uploadPromises: Promise<string>[] = [];

    // Process each image
    for (const [fieldName, fieldValue] of imageEntries) {
      const file = fieldValue as File;

      const fileProperties: FileProperties = {
        size: file.size,
        type: file.type,
        name: file.name,
        lastModified: file.lastModified,
      };
      console.log(`File properties for ${fieldName}: `, fileProperties);
      console.log("file: ", file);

      // Use file.arrayBuffer() to get the file content
      const buffer = await file.arrayBuffer();
      const imageBuffer = Buffer.from(buffer);
      const webpBuffer = await sharp(imageBuffer).toFormat("webp").toBuffer();

      // Generate a unique filename for each image
      const fileName = `${Date.now()}-${fieldName}-product-img.webp`;

      // Reference to the storage location
      const storageRef = ref(storage, `image/${fileName}`);

      // Upload the file and get the upload task
      const uploadTask = uploadBytesResumable(storageRef, webpBuffer);

      // Create a promise for each image upload task
      const imageUrlPromise = new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (uploadErr) => {
            console.error(uploadErr);
            reject({ error: "Error uploading file" });
          },
          async () => {
            // Upload completed successfully, get the download URL
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Download URL:", imageUrl);

            // Resolve the promise with the download URL
            resolve(imageUrl);
          }
        );
      });

      // Add the promise to the array
      uploadPromises.push(imageUrlPromise);
    }

    // Wait for all upload tasks to complete
    const imageUrls = await Promise.all(uploadPromises);

    // Respond to the frontend with the array of image URLs
    return NextResponse.json({ success: true, imageUrls });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
