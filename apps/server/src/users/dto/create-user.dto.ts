// CreateUserDto.ts
import { IsEmail, IsString } from 'class-validator';
class EmailAddress {
  emailAddress: string;
  // You can add other properties if needed
}

export class CreateUserDto {
  id: string;
  username: string;
  imageUrl: string;

  emailAddress: string;

  emailAddresses: EmailAddress[];

  fullName: string;
}
