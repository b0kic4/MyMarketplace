// clerk.config.ts
import { Clerk } from '@clerk/backend';
export const clerkConfig = {
  secreyKey: process.env.CLERK_SECRET_KEY,
};

export const myClerk = Clerk({ secretKey: clerkConfig.secreyKey });
