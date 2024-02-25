// clerk-webhook.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateUserDto } from '@server/users/dto/create-user.dto';

@Injectable()
export class ClerkWebhookService {
  constructor(private prisma: PrismaService) {}

  async createUser(clerkEvent: any): Promise<User> {
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
        try {
          const newUser = await this.prisma.user.create({
            data: userData,
          });
          console.log('New user in handle webhook service: ', newUser);
          return newUser;
        } catch (error: any) {
          console.log('Error creating user:', error);

          if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            throw new Error('Email address is already in use.');
          }
          throw new Error('Error saving user to database');
        }
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
