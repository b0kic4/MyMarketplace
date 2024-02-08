import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_TOKEN,
      });
      request['user'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Refresh' ? token : undefined;
  }
}
