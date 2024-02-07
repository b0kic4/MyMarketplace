import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  generateFakeProduct(): Prisma.ProductCreateInput {
    Logger.log('generateFakeProduct called');
    const categoryImageMap: Record<string, string> = {
      Jewelry: 'Fashion',
      Clothing: 'Fashion',
      Shoes: 'Fashion',
      Outdoors: 'Nature',
      Beauty: 'People',
      Animal: 'Cats',
      Music: 'Technics',
      Movies: 'Nightlife',
      Electronics: 'Techics',
      Computers: 'Techics',
      Industrial: 'Technics',
    };

    const category = faker.commerce.department();
    const imageUrlCategory = categoryImageMap[category] || 'Fashion';
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 10, symbol: '$' }),
      category: faker.commerce.department(),
      material: faker.commerce.productMaterial(),
      adjective: faker.commerce.productAdjective(),
      isbn: faker.commerce.isbn(),
      imageUrl: faker.image.urlLoremFlickr({
        category: imageUrlCategory,
        width: 1920,
        height: 1080,
      }) as string,
    };
  }

  generateFakeProducts(count: number): Prisma.ProductCreateInput[] {
    return Array(count)
      .fill(null)
      .map(() => this.generateFakeProduct());
  }

  async generateAndStoreFakeProducts(count: number): Promise<void> {
    const fakeProducts = this.generateFakeProducts(count);
    try {
      await this.prisma.product.createMany({
        data: fakeProducts,
      });
      // console.log('Data stored successfully');
    } catch (error: any) {
      // console.log('Error storing data', error);
    }
  }
}
