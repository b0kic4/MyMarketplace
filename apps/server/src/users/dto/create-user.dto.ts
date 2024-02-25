export class CreateUserDto {
  clerkUserId: string;
  username: string;
  email: string;
  imageUrl: string;
  fullName: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
}
