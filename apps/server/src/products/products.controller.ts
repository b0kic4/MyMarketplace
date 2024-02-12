import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SaveProductDto } from './dto/save-product-dto';
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

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Post('/save-product')
  @ApiResponse({
    description: 'Product saved successfully',
    status: 200,
  })
  @ApiBadRequestResponse({
    description: 'Product data is missing or invalid',
    type: ConflictException,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async saveProduct(@Body() saveProductDto: SaveProductDto): Promise<Product> {
    if (!saveProductDto) {
      throw new ConflictException('Product does not exist');
    }

    return this.productService.saveProduct(saveProductDto);
  }
  @Post('/remove-saved-product')
  async removeSavedProduct(
    @Body() saveProductDto: SaveProductDto,
  ): Promise<Product> {
    if (!saveProductDto) {
      throw new ConflictException('Product does not exist');
    }
    return this.productService.removeSavedProduct(saveProductDto);
  }
}
