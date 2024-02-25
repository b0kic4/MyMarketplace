import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto): Promise<any> {
    try {
      console.log('user data in user service: ', userData);
      if (!userData) throw new Error('User data invalid');
      const newUser = await this.prisma.user.create({
        data: {
          clerkUserId: userData.clerkUserId,
          email: userData.email,
          imageUrl: userData.imageUrl,
          username: userData.username,
          fullName: userData.fullName,
        },
      });
      console.log('New User: ', newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      // Handle unique constraint violation (e.g., duplicate email)
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('Email address is already in use.');
      }
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
