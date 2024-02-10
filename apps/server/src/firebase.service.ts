import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import sharp from 'sharp';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  AnonymousCredential,
} from '@azure/storage-blob';

@Injectable()
export class FirebaseService {
  private readonly storage;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGE_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(app);
  }

  async uploadImage(file: Blob, filename: string): Promise<string> {
    try {
      const fileBuffer = await this.blobToBuffer(file);

      // Convert the image to WebP format
      const webpBuffer = await sharp(fileBuffer).webp().toBuffer();

      const storageRef = ref(this.storage, `products-images/${filename}`);

      // Upload the WebP file
      await uploadBytes(storageRef, webpBuffer, { contentType: 'image/webp' });

      // Get the public URL of the uploaded file
      const url = await getDownloadURL(storageRef);

      return url;
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);

      if (error instanceof Error && error.message) {
        throw new Error(`Failed to upload image to Firebase: ${error.message}`);
      } else {
        throw new Error('Failed to upload image to Firebase');
      }
    }
  }

  private async blobToBuffer(blob: Blob): Promise<Buffer> {
    try {
      if (blob.arrayBuffer) {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer;
      } else {
        // If arrayBuffer method is not available, handle it accordingly
        throw new Error('Blob.arrayBuffer method is not supported');
      }
    } catch (error) {
      console.error('Error converting Blob to Buffer:', error);
      throw new Error('Failed to convert Blob to Buffer');
    }
  }
}
