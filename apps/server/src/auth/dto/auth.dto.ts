import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
