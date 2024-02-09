import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({
    description: 'Product created successfully',
    status: 200,
  })
  @ApiBadRequestResponse({
    description: 'Product data is missing or invalid',
    type: ConflictException,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    if (!createProductDto) {
      throw new ConflictException('Product data is missing or invalid');
    }

    return this.productService.create(createProductDto);
  }
}
