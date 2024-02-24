import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { OrderStatus, PurchaseStatus } from '@prisma/client';
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
      const cartProducts = await this.prisma.cartProduct.findMany({
        where: {
          cartId: cart.id,
        },
        include: {
          product: true,
          cart: true,
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
      const uniqueCartProductsHolder = await this.prisma.cartProduct.findFirst({
        where: {
          cartId: cart.id,
        },
      });
      const updatedCartProducts = await this.prisma.cartProduct.update({
        where: {
          id: uniqueCartProductsHolder!.id,
        },
        data: {
          purchaseStatus: PurchaseStatus.Purchased,
        },
      });
      const order = await this.prisma.order.create({
        data: {
          orderStatus: OrderStatus.Succeed,
          totalPrice: amount,
          userId: user.id,
          purchasedProducts: {
            create: cartProducts.map((cartProduct) => ({
              cartId: cartProduct.cart.id,
              productId: cartProduct.product.id,
              quantity: cartProduct.quantity,
              purchaseStatus: updatedCartProducts.purchaseStatus,
            })),
          },
        },
      });
      console.log('order: ', order);
      return order;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
