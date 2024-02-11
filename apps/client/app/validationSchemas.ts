import { z } from "zod";

export const CreateUser = z.object({
  email: z.string().email("Invalid email format").min(5, "Email is too short"),
  username: z.string().min(3, "Username is too short"),
  password: z.string().min(6, "Password is too short"),
  confirmPassword: z.string(),
});

// Add custom validation for confirmPassword
CreateUser.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
