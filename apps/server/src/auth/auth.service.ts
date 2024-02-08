import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { UsersService } from '@server/users/users.service';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(dto: LoginDto): Promise<any> {
    const user: User = await this.validateUser(dto);
    const payload = {
      username: user.username,
      email: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      user,
      tokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET_LOGIN,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN,
        }),
      },
    };
  }
  async validateUser(dto: LoginDto): Promise<any> {
    const user: User = await this.userService.findByEmail(
      dto.email,
      dto.username,
    );
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Username or password are not correct');
  }
  async refreshToken(user: any): Promise<any> {
    try {
      const payload = {
        username: user.username,
        sub: user.sub,
      };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET_LOGIN,
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN,
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Not authorized');
    }
  }
}
