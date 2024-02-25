// CreateUserDto.ts
class EmailAddress {
  pathRoot: string;
  emailAddress: string;
  linkedTo: any[];
  id: string;
  verification: any;
}

export class CreateUserDto {
  clerkUserId: string;
  username: string;
  imageUrl: string;
  emailAddress: string;
  emailAddresses: EmailAddress[];
  fullName: string | null;
  updatedAt: string;
  createdAt: string;
}
