// Import necessary modules
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Cart, Product } from '@prisma/client';
import { SaveProductDto } from './dto/save-product-dto';
import { AddProductToCartDto } from './dto/add-to-cart-product.dto';
import { RemoveProductFromCartDto } from './dto/remove-from-cart.dto';
@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private prisma: PrismaService) {}

  // creating product
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

  // getting products

  async findAll() {
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
  }

  async findWithFiltering(filter: string, userId?: string): Promise<Product[]> {
    const user = await this.prisma.user.findFirst({
      where: {
        clerkUserId: userId,
      },
    });

    switch (filter) {
      case 'all' || null:
        // Assuming you want to fetch all products without a specific filter
        const allProducts = await this.prisma.product.findMany({
          include: {
            images: true,
            user: true,
            savedByUsers: true,
            cart: true,
            reviews: true,
          },
        });
        return allProducts;

      case 'newArrivals':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const products = await this.prisma.product.findMany({
          where: {
            createdAt: {
              gt: oneWeekAgo,
            },
          },
          include: {
            images: true,
            user: true,
            savedByUsers: true,
            cart: true,
            reviews: true,
          },
        });
        return products;

      case 'usedItems':
        const product = await this.prisma.product.findMany({
          where: {
            isUsed: true,
          },
          include: {
            images: true,
            user: true,
            savedByUsers: true,
            cart: true,
            reviews: true,
          },
        });
        return product;

      case 'myProducts':
        // Optionally check if user exists in the database for additional validation
        const usersProducts = await this.prisma.product.findMany({
          where: {
            user: {
              id: user!.id,
            },
          },
          include: {
            images: true,
            user: true,
            savedByUsers: true,
            cart: true,
            reviews: true,
          },
        });
        return usersProducts;

      case 'savedProducts':
        const savedProducts = await this.prisma.product.findMany({
          where: {
            savedByUsers: {
              some: {
                id: user?.id,
              },
            },
          },
          include: {
            images: true,
            user: true,
            savedByUsers: true,
            cart: true,
            reviews: true,
          },
        });
        return savedProducts;
    }
    throw new Error('Invalid parameters');
  }

  // bookmarking product
  async saveProduct(saveProductDto: SaveProductDto) {
    try {
      // userId -> is id of the user that holds the product
      // userID -> is id of the user that requested the method
      const product = await this.prisma.product.findUnique({
        where: {
          id: saveProductDto.foundProduct.id,
        },
        include: {
          savedByUsers: true,
        },
      });

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      // Find the user who saved the product
      const user = await this.prisma.user.findFirst({
        where: {
          clerkUserId: saveProductDto.userID,
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

  // bookmarking product from bookmarked
  async removeSavedProduct(saveProductDto: SaveProductDto): Promise<Product> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          clerkUserId: saveProductDto.userID,
        },
      });
      if (!user) throw new Error('User not found');
      const product = await this.prisma.product.update({
        where: {
          id: saveProductDto.foundProduct.id,
        },
        data: {
          savedByUsers: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });
      if (!product) {
        throw new Error('Product not found');
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

  // finding product by provided id
  async findById(productId: number): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
        include: {
          images: true,
          user: true,
          reviews: {
            include: {
              User: true,
            },
          },
        },
      });
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // adding product to cart
  async addProductToCart(addProdcutToCart: AddProductToCartDto): Promise<Cart> {
    try {
      // finding the product that is provided
      const prodcut = await this.prisma.product.findUnique({
        where: {
          id: Number(addProdcutToCart.foundProduct.id),
        },
      });

      if (!prodcut) throw new Error('Product does not exists');
      const user = await this.prisma.user.findFirst({
        where: {
          clerkUserId: addProdcutToCart.userID,
        },
      });
      if (!user) throw new Error('User not found');
      console.log('user: ', user);
      const cart = await this.prisma.cart.findFirst({
        where: {
          userId: Number(user.id),
          isPurchased: false,
        },
      });
      let existingCart;
      if (cart) {
        existingCart = cart;
      } else {
        const newCart = await this.prisma.cart.create({
          data: {
            productId: prodcut.id,
            userId: user.id,
            isPurchased: false,
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
      console.log('cart: ', existingCart);
      if (cartProduct) {
        await this.prisma.cartProduct.update({
          where: {
            id: cartProduct.id,
            productId: prodcut.id,
            cartId: existingCart.id,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      } else if (!cartProduct) {
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

  // increment or decrementing quantity of cart product
  async updateQuantity(productId: number, quantity: number, userId: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          clerkUserId: userId,
        },
      });
      const foundCart = await this.prisma.cart.findFirst({
        where: {
          userId: user?.id,
          isPurchased: false,
        },
      });
      if (!foundCart) {
        throw new Error('Cart does not exist');
      }
      const findProdcut = await this.prisma.cartProduct.findUnique({
        where: {
          id: productId,
        },
      });

      if (!findProdcut) {
        throw new Error('Cart Prodcut not found');
      }
      let quantityValue;
      if (findProdcut?.quantity < quantity) {
        quantityValue = quantity - findProdcut.quantity;
        const updateProduct = await this.prisma.cartProduct.update({
          where: {
            id: productId,
            cartId: foundCart.id,
          },
          data: {
            quantity: {
              increment: quantityValue,
            },
          },
        });
        return updateProduct;
      } else if (findProdcut.quantity > quantity) {
        quantityValue = findProdcut.quantity - quantity;
        const updateProduct = await this.prisma.cartProduct.update({
          where: {
            id: productId,
            cartId: foundCart.id,
          },
          data: {
            quantity: {
              decrement: quantityValue,
            },
          },
        });
        return updateProduct;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // removing product form cart
  async removeProductFromCart(removeFromCart: RemoveProductFromCartDto) {
    try {
      if (!removeFromCart.foundProduct) {
        throw new BadRequestException('Found product is missing');
      }

      const user = await this.prisma.user.findFirst({
        where: {
          clerkUserId: removeFromCart.userID,
        },
        include: {
          Cart: true,
        },
      });
      if (!user) throw new Error('user not found');

      const product = await this.prisma.product.findUnique({
        where: {
          id: removeFromCart.foundProduct.id,
        },
      });
      if (!product) {
        throw new Error('Product not found in db');
      }

      const cart = await this.prisma.cart.findFirst({
        where: {
          userId: Number(user.id),
          isPurchased: false,
        },
      });

      if (!cart) {
        throw new Error('Cart not found for user');
      }

      const foundCartProduct = await this.prisma.cartProduct.findFirst({
        where: {
          productId: product.id,
          cartId: cart.id,
        },
      });

      if (!foundCartProduct) throw new Error('Product not in cart');

      const removedCartProduct = await this.prisma.cartProduct.delete({
        where: {
          cartId: cart.id,
          productId: product.id,
          id: foundCartProduct?.id,
        },
      });

      return removedCartProduct;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async similarProducts(
    username: string,
    categoryType: string,
    colors: string,
    material: string,
  ) {
    try {
      if (!username && !categoryType && !colors && !material) {
        throw new Error('There is no product');
      }
      const product = await this.prisma.product.findMany({
        where: {
          user: {
            username: username,
          },
          categoryType: categoryType,
          colors: colors,
          material: material,
        },
        include: {
          reviews: true,
          images: true,
          user: true,
        },
      });
      if (!product) {
        throw new Error('There is no products');
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
}
