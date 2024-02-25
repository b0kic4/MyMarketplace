import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { myClerk } from '@server/clerk.config';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: any): Promise<any> {
    try {
      console.log('User data: ', userData);
      if (!userData) throw new Error('User data invalid');
      const newUser = await this.prisma.user.create({
        data: {
          clerkUserId: userData.clerkUserId,
          username: userData.username,
          email: userData.email,
          imageUrl: userData.imageUrl,
          fullName: userData.fullName || null,
          createdAt: new Date(userData.createdAt).toISOString(),
          updatedAt: new Date(userData.updatedAt).toISOString(),
        },
      });
      console.log('New User: ', newUser);
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
  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string, username: string): Promise<any> {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
