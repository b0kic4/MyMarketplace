import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import sharp from "sharp";

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
      console.log("buffer: ", buffer);
      const imageBuffer = Buffer.from(buffer);
      console.log("imageBuffer: ", imageBuffer);
      const webpBuffer = await sharp(imageBuffer).toFormat("webp").toBuffer();
      const fileName = `${Date.now()}-${file.name}-product-img.webp`;

      const storageRef = ref(storage, `image/${fileName}`);
      const metadata = {
        contentType: "image/webp",
      };
      console.log("storage: ", storageRef);
      const uploadTask = uploadBytesResumable(storageRef, webpBuffer, metadata);

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
              console.log("imageUrl: ", imageUrl);
              resolve({ imageUrl });
            }
          );
        }
      );

      uploadPromises.push(imageUrlPromise);
    } catch (error: any) {
      console.error("Error:", error);
      throw new Error(error.message);
    }
  }

  return Promise.all(uploadPromises);
};

export default uploadMiddleware;
