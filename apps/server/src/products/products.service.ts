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
      console.log('received data: ', createProductDto);

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
      } = createProductDto;

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
          userId: 1,
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
}
