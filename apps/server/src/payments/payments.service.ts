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
  constructor(private prisma: PrismaService) { }
  async storePaymentInfo(session: any, metadata: any) {
    try {
      // extracted data from session and metadata
      if (!session) {
        throw new Error('No session found');
      }
      if (!metadata) {
        throw new Error('No products found in metadata');
      }
      const paymentStatus = session.payment_status;
      const amountTotalInPennies = session.amount_total;
      const amountTotalInDollars = amountTotalInPennies / 100;
      const productIds = JSON.parse(metadata.productIds);

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
      const productsNotFound = productIds.filter(
        (productId: any) =>
          !cartProducts.some((cp) => cp.product.id === productId),
      );
      if (productsNotFound.length > 0) {
        throw new ConflictException('Some products are not found in the cart');
      }
      // All products in productIds are found in the cartProducts
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
          totalPrice: amountTotalInDollars.toString(),
          userId: user.id,
          cartId: cart.id,
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
      const deleteCartProducts = await this.prisma.cartProduct.deleteMany({
        where: {
          cartId: cart.id
        }
      })
      if (!deleteCartProducts) {
        throw new ConflictException("No Cart Products")
      }
      console.log("deleted Cart Products: ", deleteCartProducts)
      const deletedCart = await this.prisma.cart.delete({
        where: {
          id: cart.id,
        },
      });

      console.log("deleted cart: ", deletedCart)

      return order;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getOrderByUserId(userId: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          clerkUserId: userId
        }
      })
      if (!user) throw new ConflictException("User not found")
      const orders = await this.prisma.order.findMany(({
        where: {
          userId: user.id
        }
      }))
      console.log("orders: ", orders)

      if (!orders) {
        throw new ConflictException("No Orders")
      }

    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }

  }
}
