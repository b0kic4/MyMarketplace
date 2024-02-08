import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { hash } from 'bcrypt';
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

  findAll() {
    return `This action returns all users`;
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

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: {
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
