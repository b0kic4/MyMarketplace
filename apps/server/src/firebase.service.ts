import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

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

  async uploadImage(fileBuffer: Buffer, filename: string): Promise<string> {
    try {
      const storageRef = ref(this.storage, `your-storage-path/${filename}`);

      // Upload the file in WebP format
      await uploadBytes(storageRef, fileBuffer, { contentType: 'image/webp' });

      // Get the public URL of the uploaded file
      const url = await getDownloadURL(storageRef);

      return url;
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
      throw new Error('Failed to upload image to Firebase');
    }
  }
}
