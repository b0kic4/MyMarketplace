import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: any): Promise<any> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          clerkUserId: userData.clerkUserId,
          username: userData.username || null,
          email: userData.email || null,
          imageUrl: userData.imageUrl || null,
          fullName: userData.fullName || null,
          createdAt: new Date(userData.createdAt).toISOString(),
          updatedAt: new Date(userData.updatedAt).toISOString(),
        },
      });

      return newUser;
    } catch (error) {
      // Handle unique constraint violation (e.g., duplicate email)
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('Email address is already in use.');
      }

      // Handle other errors as needed
      throw error;
    }
  }
}
