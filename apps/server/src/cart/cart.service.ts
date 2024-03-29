import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }
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
          isPurchased: false,
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
          User: true
        },
      });
      if (!cart) throw new Error('Cart not found');
      if (cart.isPurchased === false) {
        return cart;
      }
      return
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
