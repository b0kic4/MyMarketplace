// Import necessary modules
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { FirebaseService } from '@server/firebase.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    private prisma: PrismaService,
    private firebaseService: FirebaseService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      console.log('received data: ', createProductDto);
      // Check if the product already exists
      const existingProduct = await this.prisma.product.findFirst({
        where: {
          id: createProductDto.id,
          title: createProductDto.title,
        },
      });

      if (existingProduct) {
        throw new ConflictException('Product already exists');
      }

      // Create the new product with updated image URLs
      // const newProduct = await this.prisma.product.create({
      //   data: {
      //     createProductDto,
      //   },
      // });
      throw new Error('erorr');
      // return newProduct;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
