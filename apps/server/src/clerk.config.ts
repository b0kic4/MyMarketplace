// clerk.config.ts
import Clerk from '@clerk/clerk-sdk-node/esm/instance';

export const clerkConfig = {
  apiKey: process.env.CLERK_SECRET_KEY,
};

export const myClerk = Clerk({ apiKey: clerkConfig.apiKey });
