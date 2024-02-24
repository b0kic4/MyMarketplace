import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '@server/users/users.service';
@Controller('clerk-webhook')
export class ClerkWebhookController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  async handleWebhook(@Body() clerkEvent: any) {
    try {
      console.log('clerk event: ', clerkEvent);
      if (clerkEvent.type === 'user.created') {
        const clerkUser = clerkEvent.data;
        const userData = {
          clerkUserId: clerkUser.id,
          username: clerkUser.username || null,
          email: clerkUser.email_addresses[0]?.email_address || null,
          imageUrl: clerkUser.image_url || null,
          fullName:
            `${clerkUser.first_name} ${clerkUser.last_name}`.trim() || null,
          createdAt: new Date(clerkUser.created_at).toISOString(),
          updatedAt: new Date(clerkUser.updated_at).toISOString(),
        };

        // Create the user in the database
        const newUser = await this.usersService.create(userData);

        console.log('User created:', newUser);

        return 'User created successfully';
      } else {
        console.log('Unsupported Clerk webhook type:', clerkEvent.type);
        return 'Unsupported webhook type';
      }
    } catch (error) {
      console.error('Error handling Clerk webhook:', error.message);
      return 'Error handling webhook';
    }
  }
}
