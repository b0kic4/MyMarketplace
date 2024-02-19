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

  for (const file of images) {
    try {
      const buffer = await file.arrayBuffer();
      const imageBuffer = Buffer.from(buffer);
      const webpBuffer = await sharp(imageBuffer).toFormat("webp").toBuffer();
      const fileName = `${Date.now()}-${file.name}-product-img.webp`;
      console.log("before if file in for: ", file);
      console.log("before buffer: ", buffer);
      console.log("before webpbuffer: ", webpBuffer);
      console.log("before filename: ", fileName);

      if (!buffer && !imageBuffer && !webpBuffer && !fileName) {
        console.log("in if file in for: ", file);
        console.log("in buffer: ", buffer);
        console.log("in webpbuffer: ", webpBuffer);
        console.log("in filename: ", fileName);
        throw new Error("Data is missing");
      }
      console.log("after if file in for: ", file);
      console.log("after buffer: ", buffer);
      console.log("after webpbuffer: ", webpBuffer);
      console.log("after filename: ", fileName);
      const storageRef = ref(storage, `image/${fileName}`);
      const metadata = {
        contentType: "image/webp",
      };
      const uploadTask = uploadBytesResumable(storageRef, webpBuffer, metadata);
      console.log("storageRef: ", storageRef);
      console.log("uploadTask: ", uploadTask);
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
              console.log("image url: ", imageUrl);
              if (!imageUrl) {
                return NextResponse.json({ error: "Error uploading image" });
              }
              console.log("image url: ", imageUrl);
              resolve({ imageUrl });
            }
          );
        }
      );

      uploadPromises.push(imageUrlPromise);
    } catch (error: any) {
      console.log("Error: ", error);
      uploadPromises.push(Promise.resolve({ error: error.message }));
      continue;
    }
  }

  return Promise.all(uploadPromises);
};

export default uploadMiddleware;
