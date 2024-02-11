import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { myClerk } from '@server/clerk.config';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          clerkUserId: createUserDto.id,
        },
      });
      if (existingUser) return;
      const primaryEmailAddress =
        createUserDto.emailAddresses?.[0]?.emailAddress || '';
      const appendedUser = await this.prisma.user.create({
        data: {
          email: primaryEmailAddress,
          clerkUserId: createUserDto.id,
          fullName: createUserDto.fullName,
          imageUrl: createUserDto.imageUrl,
          username: createUserDto.username,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const userList = await myClerk.users.getUserList();
    return userList;
  }
  async findById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });
      if (!user) throw new ConflictException('User does not exists');
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  }

  async findByEmail(email: string, username: string): Promise<any> {
    if (email && !username)
      return await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

    if (!email && username)
      return await this.prisma.user.findFirst({
        where: {
          username: username,
        },
      });
    return await this.prisma.user.findFirst({
      where: {
        username: username,
        email: email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
