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

      // Process and upload images to Firebase
      const processedImages = await this.processAndUploadImages(
        createProductDto.images,
      );

      // Create the new product with updated image URLs
      const newProduct = await this.prisma.product.create({
        data: {
          ...createProductDto,
          images: processedImages,
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

  private async processAndUploadImages(
    images: { file: Express.Multer.File; isLogo: boolean }[],
  ): Promise<string[]> {
    const processedImageUrls: string[] = [];

    for (const image of images) {
      if (image.file) {
        // Upload the image to Firebase and get the URL
        const imageUrl = await this.firebaseService.uploadImage(
          image.file,
          image.isLogo,
        );
        // Save the URL and isLogo information to the processedImageUrls array
        processedImageUrls.push(`${imageUrl},${image.isLogo}`);
      }
    }
    return processedImageUrls;
  }
}
