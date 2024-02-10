import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import sharp from 'sharp';

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

  async uploadImage(
    file: Express.Multer.File,
    isLogo: boolean,
  ): Promise<string> {
    try {
      const storageRef = ref(this.storage, `images/${file.originalname}`);
      const metadata = { contentType: file.mimetype };

      // Upload the file to Firebase Cloud Storage
      await uploadBytes(storageRef, file.buffer, metadata);

      // Get the download URL
      const url = await getDownloadURL(storageRef);

      // Return the URL
      return `${url},${isLogo}`;
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);

      if (error instanceof Error && error.message) {
        throw new Error(`Failed to upload image to Firebase: ${error.message}`);
      } else {
        throw new Error('Failed to upload image to Firebase');
      }
    }
  }
}
