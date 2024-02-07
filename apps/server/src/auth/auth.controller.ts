import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { UsersService } from '@server/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}
  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
  //   @Get()
  //   async getAuth(){
  //     return this.
  //   }
}
