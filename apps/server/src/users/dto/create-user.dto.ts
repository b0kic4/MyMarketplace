export class CreateUserDto {
  clerkUserId: string;
  username: string;
  email: string;
  imageUrl: string;
  reviewId?: number | null | undefined;
  fullName?: string | null | undefined;
}
