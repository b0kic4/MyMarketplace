import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Query,
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
import { Cart, Product, User } from '@prisma/client';
import { AddProductToCartDto } from './dto/add-to-cart-product.dto';
import { RemoveProductFromCartDto } from './dto/remove-from-cart.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProduct')
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

  @Get('getAll')
  getAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('getProductsWithFilter')
  getProductsWithFilter(
    @Query('filter') filter: string,
    @Query('userId') userId?: string,
  ) {
    return this.productService.findWithFiltering(filter, userId);
  }

  @Get('byId')
  async findOne(@Query('productId') productId: number) {
    return await this.productService.findById(productId);
  }

  @Get('getSimilarProducts')
  async fetchSimilarproducts(
    @Query('categoryType') categoryType: string,
    @Query('colors') colors: string,
    @Query('username') username: string,
    @Query('material') material: string,
  ) {
    return this.productService.similarProducts(
      username,
      categoryType,
      colors,
      material,
    );
  }

  @Post('save-product')
  async saveProduct(@Body() saveProductDto: SaveProductDto): Promise<Product> {
    if (!saveProductDto) {
      throw new ConflictException('Product does not exist');
    }

    return this.productService.saveProduct(saveProductDto);
  }
  @Post('remove-saved-product')
  async removeSavedProduct(
    @Body() saveProductDto: SaveProductDto,
  ): Promise<Product> {
    if (!saveProductDto) {
      throw new ConflictException('Product does not exist');
    }
    return this.productService.removeSavedProduct(saveProductDto);
  }

  @Post('add-to-cart')
  async addProdcutToCart(
    @Body() addProdcutToCart: AddProductToCartDto,
  ): Promise<Cart> {
    if (!addProdcutToCart)
      throw new ConflictException('Prodcut does not exists');
    return await this.productService.addProductToCart(addProdcutToCart);
  }
  @Post('remove-from-cart')
  async removeFromCart(@Body() removeFromCart: RemoveProductFromCartDto) {
    return this.productService.removeProductFromCart(removeFromCart);
  }
  // change prodcut quantity
  @Post('update-quantity')
  async updateQuantity(
    @Body('id') productId: number,
    @Body('quantity') quantity: number,
    @Body('userId') userId: string,
  ) {
    return this.productService.updateQuantity(productId, quantity, userId);
  }
}
