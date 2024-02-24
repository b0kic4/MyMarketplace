import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}
  async storePaymentInfo(session: any, metadata: any) {
    try {
      // extracted data from session and metadata
      console.log('session: ', session);
      console.log('metadata: ', metadata);
      if (!session) {
        throw new Error('No session found');
      }
      if (!metadata) {
        throw new Error('No products found in metadata');
      }
      const paymentStatus = session.payment_status;
      const amount = session.amount_total;
      const productIds = JSON.parse(metadata.productIds);
      console.log('product ids: ', productIds);
      const userId = metadata.userId;
      const user = await this.prisma.user.findFirst({
        where: {
          clerkUserId: userId,
        },
      });
      if (!user) {
        throw new ConflictException('User not found');
      }
      const cart = await this.prisma.cart.findFirst({
        where: {
          user: {
            id: user.id,
          },
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
      if (!cart) {
        throw new ConflictException('No Cart associated with provieded user');
      }
      console.log('cart: ', cart);
      const cartProducts = await this.prisma.cartProduct.findMany({
        where: {
          cartId: cart.id,
        },
        include: {
          product: true,
        },
      });
      if (!cartProducts) {
        throw new ConflictException('No products found in cart');
      }
      console.log('CART PRODUCTS: ', cartProducts);
      const productsNotFound = productIds.filter(
        (productId: any) =>
          !cartProducts.some((cp) => cp.product.id === productId),
      );
      if (productsNotFound.length > 0) {
        throw new ConflictException('Some products are not found in the cart');
      }
      // All products in productIds are found in the cartProducts
      console.log('All products found in the cart.');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
