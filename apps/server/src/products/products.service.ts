// Import necessary modules
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Cart, Product, PurchaseStatus } from '@prisma/client';
import { SaveProductDto } from './dto/save-product-dto';
import { AddProdcutToCart } from './dto/add-to-cart-product.dto';
@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      // Access the necessary properties from the DTO
      const {
        title,
        description,
        categoryType,
        images: { isLogosAndImageUrls },
        price,
        sizes,
        colors,
        material,
        texture,
        stock,
        shippingInformation,
        isChecked,
        userId,
        isUsed,
      } = createProductDto;
      const prismaUser = await this.prisma.user.findFirst({
        where: {
          clerkUserId: userId,
        },
      });
      // Create the new product with updated image URLs
      const newProduct = await this.prisma.product.create({
        data: {
          title,
          description,
          categoryType,
          price,
          sizes,
          colors,
          material,
          texture,
          stock,
          shippingInformation,
          isChecked,
          images: {
            create: isLogosAndImageUrls.map(({ isLogo, imageUrl }) => ({
              isLogo,
              imageUrl,
            })),
          },
          userId: prismaUser?.id,
          isUsed,
        },
      });

      return newProduct;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getProducts() {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          images: true,
          user: true,
          savedByUsers: true,
          cart: true,
          reviews: true,
        },
      });
      return products;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async saveProduct(saveProductDto: SaveProductDto) {
    try {
      // Find the product based on the provided id
      const product = await this.prisma.product.findUnique({
        where: {
          id: saveProductDto.id,
        },
        include: {
          savedByUsers: true,
        },
      });

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      // Find the user who saved the product
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(saveProductDto.userId),
        },
        include: {
          savedProducts: true,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // Check if the product is already saved by the user
      const isProductAlreadySaved = user.savedProducts.some(
        (savedProduct) => savedProduct.id === product.id,
      );

      if (!isProductAlreadySaved) {
        // Update the user's savedProducts relation to include the saved product
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            savedProducts: {
              connect: {
                id: product.id,
              },
            },
          },
        });
      }
      return product;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async removeSavedProduct(saveProductDto: SaveProductDto): Promise<Product> {
    try {
      const product = await this.prisma.product.update({
        where: {
          id: saveProductDto.id,
        },
        data: {
          savedByUsers: {
            disconnect: {
              id: Number(saveProductDto.userId),
            },
          },
        },
      });
      if (!product) {
        throw new ConflictException('Product not found');
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findById(id: number): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: id },
        include: {
          images: true,
          user: true,
        },
      });
      if (!product) {
        throw new ConflictException('Product not found');
      }
      return product;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async addProductToCart(addProdcutToCart: AddProdcutToCart): Promise<Cart> {
    try {
      // finding the product that is provided
      const prodcut = await this.prisma.product.findUnique({
        where: {
          id: Number(addProdcutToCart.id),
        },
      });
      if (!prodcut) throw new ConflictException('Product does not exists');
      const cart = await this.prisma.cart.findFirst({
        where: {
          userId: Number(addProdcutToCart.userId),
        },
      });

      let existingCart;

      if (cart) {
        existingCart = cart;
      } else {
        const newCart = await this.prisma.cart.create({
          data: {
            productId: prodcut.id,
            userId: Number(addProdcutToCart.userId),
          },
        });

        existingCart = newCart;
      }
      let existingCartPorduct;
      // create cart product when functionality is called
      const cartProduct = await this.prisma.cartProduct.findFirst({
        where: {
          cartId: existingCart.id,
          productId: prodcut.id,
        },
      });
      if (cartProduct) {
        const updateCartProduct = await this.prisma.cartProduct.update({
          where: {
            id: cartProduct.id,
            productId: prodcut.id,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      } else {
        const createNewCartProduct = await this.prisma.cartProduct.create({
          data: {
            cartId: existingCart.id,
            productId: prodcut.id,
          },
        });
        existingCartPorduct = createNewCartProduct;
      }
      return existingCart;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
