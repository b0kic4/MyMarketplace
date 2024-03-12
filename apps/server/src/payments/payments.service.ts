import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateProductReviewDto } from './dto/createReviewDto.dto';

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
        throw new Error('User not found');
      }
      const cart = await this.prisma.cart.findFirst({
        where: {
          userId: user.id
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
        throw new Error('No Cart associated with provieded user');
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
        throw new Error('No products found in cart');
      }

      console.log(cartProducts)
      // All products in productIds are found in the cartProducts

      const order = await this.prisma.order.create({
        data: {
          orderStatus: OrderStatus.Succeed,
          totalPrice: amountTotalInDollars.toString(),
          userId: user.id,
          cartId: cart.id,
        },
      });

      console.log("order: ", order)

      await Promise.all(
        cartProducts.map((cartProduct) =>
          this.prisma.cartProduct.update({
            where: {
              id: cartProduct.id,
            },
            data: {
              orderId: order.id, // Linking cart product to the newly created order
            },
          })
        )
      );

      // Mark the cart as purchased
      await this.prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          isPurchased: true,
        },
      });

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
      if (!user) throw new Error("User not found")

      const orders = await this.prisma.order.findMany(({
        where: {
          userId: user.id
        },
        include: {
          purchasedProducts: {
            include: {
              product: {
                include: {
                  images: true,
                }
              },
            }
          },
          reviews: true
        }
      }))

      if (!orders) {
        throw new Error("No Orders")
      }

      return orders

    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }
  }
  async createReview(createReviewProductDto: CreateProductReviewDto) {
    const productId = createReviewProductDto.productId
    const cartProductId = createReviewProductDto.cartProductId
    const orderId = createReviewProductDto.orderId
    const reviewContent = createReviewProductDto.reviewContent
    const rating = createReviewProductDto.rating

    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId
      }
    })

    const userId = order?.userId
    if (!userId) {
      throw new Error("userId is missing")
    }

    try {
      const review = await this.prisma.review.create({
        data: {
          productId: productId,
          userId: userId,
          rating: rating,
          content: reviewContent,
          orderId: orderId
        }
      })

      return review
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async removeReviewFromProduct() {
  }
}
