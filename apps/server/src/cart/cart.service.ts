import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async getCartByUserId(userId: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          clerkUserId: userId,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const cart = await this.prisma.cart.findFirst({
        where: {
          userId: user.id,
        },
        include: {
          products: {
            include: {
              cart: true,
              product: {
                include: {
                  images: true,
                  user: true,
                  reviews: true,
                },
              },
            },
          },
          user: true,
        },
      });
      if (!cart) throw new ConflictException('Cart not found');
      return cart;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
