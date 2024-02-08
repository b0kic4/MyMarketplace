import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '@server/users/users.service';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtService],
})
export class AuthModule {}
