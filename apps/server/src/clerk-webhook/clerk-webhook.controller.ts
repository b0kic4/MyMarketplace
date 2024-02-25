import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { UsersService } from '@server/users/users.service';
@Controller('clerk-webhook')
export class ClerkWebhookController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  async handleWebhook(@Body() clerkEvent: any) {
    try {
      if (clerkEvent.type === 'user.created') {
        const clerkUser = clerkEvent.data;
        // console.log('clerk user: ', clerkUser);
        const userData: CreateUserDto = {
          clerkUserId: clerkUser.id,
          username: clerkUser.username,
          email: clerkUser.email_addresses[0]?.email_address,
          imageUrl: clerkUser.image_url || null,
          fullName:
            `${clerkUser.first_name} ${clerkUser.last_name}`.trim() || null,
        };

        // Create the user in the database
        await this.usersService.create(userData);

        return 'User created successfully';
      } else {
        console.log('Unsupported Clerk webhook type:', clerkEvent.type);
        return 'Unsupported webhook type';
      }
    } catch (error) {
      console.log(error);
      console.error('Error handling Clerk webhook:', error.message);
      return 'Error handling webhook';
    }
  }
}
