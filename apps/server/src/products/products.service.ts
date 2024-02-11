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
import { Product } from '@prisma/client';
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
          // Assuming isLogosAndImageUrls is an array of objects with isLogo and imageUrl properties
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
}
