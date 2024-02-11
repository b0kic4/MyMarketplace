import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { UsersService } from '@server/users/users.service';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}
  async login(): Promise<any> {}
}
