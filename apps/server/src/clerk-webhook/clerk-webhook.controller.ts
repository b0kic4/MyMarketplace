import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { UsersService } from '@server/users/users.service';
@Controller('clerk-webhook')
export class ClerkWebhookController {
  constructor(
    // private readonly usersService: UsersService,
    private prisma: PrismaService,
  ) {}

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
        try {
          const newUser = await this.prisma.user.create({
            data: userData,
          });
          console.log('New user in handle webhook: ', newUser);
          return 'User created successfully';
        } catch (error) {
          console.log(error);
        }
        throw new Error('Error saving user to database');
        // Create the user in the database
        // await this.usersService.create(userData);
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
