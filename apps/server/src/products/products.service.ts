import {
  ConflictException,
  Injectable,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { FirebaseService } from '@server/firebase.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private firebaseService: FirebaseService, // Inject FirebaseService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    Logger.log('route has been hit');
    try {
      console.log(createProductDto);
      if (!createProductDto) throw new ConflictException('No Product Data');

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
      if (error instanceof ConflictException) {
        throw error;
      } else {
        console.error(error);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  private async processAndUploadImages(images: Buffer[]): Promise<string[]> {
    const processedImageUrls: string[] = [];

    for (const [index, imageBuffer] of images.entries()) {
      const filename = `image_${index + 1}.webp`;

      // Process and upload each image
      const imageUrl = await this.firebaseService.uploadImage(
        imageBuffer,
        filename,
      );

      processedImageUrls.push(imageUrl);
    }

    return processedImageUrls;
  }
}
