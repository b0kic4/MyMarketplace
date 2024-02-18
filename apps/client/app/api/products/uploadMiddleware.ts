import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import sharp from "sharp";
import { NextResponse } from "next/server";

interface FileProperties {
  size: number;
  type: string;
  name: string;
  lastModified: number;
}

export interface UploadMiddlewareResult {
  imageUrl?: string;
  error?: string;
}

const uploadMiddleware = async (
  images: File[]
): Promise<UploadMiddlewareResult[]> => {
  const uploadPromises: Promise<UploadMiddlewareResult>[] = [];

  console.log("images: ", images);

  for (const file of images) {
    try {
      console.log("file: ", file);
      const buffer = await file.arrayBuffer();
      const imageBuffer = Buffer.from(buffer);
      const webpBuffer = await sharp(imageBuffer).toFormat("webp").toBuffer();

      const fileName = `${Date.now()}-${file.name}-product-img.webp`;

      const storageRef = ref(storage, `image/${fileName}`);
      const metadata = {
        contentType: "image/webp",
      };

      const uploadTask = uploadBytesResumable(storageRef, webpBuffer, metadata);
      console.log("storage ref: ", storageRef);
      const imageUrlPromise = new Promise<UploadMiddlewareResult>(
        (resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (uploadErr) => {
              console.error(uploadErr);
              reject({ error: "Error uploading file" });
            },
            async () => {
              const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve({ imageUrl });
            }
          );
        }
      );

      uploadPromises.push(imageUrlPromise);
    } catch (error) {
      console.error("Error:", error);
      NextResponse.json({ error: error });
    }
  }

  return Promise.all(uploadPromises);
};

export default uploadMiddleware;
