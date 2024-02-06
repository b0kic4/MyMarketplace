import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':count')
  generateFakeProducts(
    @Param('count', ParseIntPipe) count: number,
  ): Prisma.ProductCreateInput[] {
    return this.productService.generateFakeProducts(count);
  }
  // this is for appending data to the database
  // async generateFakeProducts(
  //   @Param('count', ParseIntPipe) count: number,
  // ): Promise<void> {
  //   await this.productService.generateAndStoreFakeProducts(count);
  // }
}
