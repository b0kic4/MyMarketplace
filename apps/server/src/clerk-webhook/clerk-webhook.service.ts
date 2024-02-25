import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateUserDto } from '@server/users/dto/create-user.dto';

@Injectable()
export class ClerkWebhookService {
  constructor(private prisma: PrismaService) {}

  async createUser(clerkEvent: any): Promise<string> {
    try {
      if (clerkEvent.type === 'user.created') {
        const clerkUser = clerkEvent.data;
        const userData: CreateUserDto = {
          clerkUserId: clerkUser.id,
          username: clerkUser.username,
          email: clerkUser.email_addresses[0]?.email_address,
          imageUrl: clerkUser.image_url || null,
          fullName:
            `${clerkUser.first_name} ${clerkUser.last_name}`.trim() || null,
        };

        const newUser = await this.prisma.user.create({
          data: userData,
        });

        console.log('New user in handle webhook service: ', newUser);

        return 'User created successfully';
      } else {
        console.log('Unsupported Clerk webhook type:', clerkEvent.type);
        throw new Error('Unsupported webhook type');
      }
    } catch (error) {
      console.log('Error creating user:', error);
      throw new Error('Error handling webhook');
    }
  }
}
