import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { hash } from 'bcrypt';
import { myClerk } from '@server/clerk.config';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: createUserDto.email,
        },
      });

      if (user) {
        throw new ConflictException('User with this email already exists');
      }

      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await hash(createUserDto.password, 10),
        },
      });

      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      console.error('Prisma Error:', error);
      throw new Error('Internal Server Error');
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
    console.log('this is console log for the route - findByEmail');
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
