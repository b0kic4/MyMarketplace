import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
  @Get(':id')
  // param when providing in the link
  async findOne(@Param('id') id: number) {
    return await this.productService.findById(id);
  }
  @Post('add-to-cart')
  async addProdcutToCart(
    @Body() addProdcutToCart: AddProductToCartDto,
  ): Promise<Cart> {
    if (!addProdcutToCart)
      throw new ConflictException('Prodcut does not exists');
    return await this.productService.addProductToCart(addProdcutToCart);
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
  @Post('remove-from-cart')
  async removeFromCart(@Body() removeFromCart: RemoveProductFromCartDto) {
    return this.productService.removeProductFromCart(removeFromCart);
  }
  @Get('similar-products')
  async fetchSimilarproducts(
    @Query('categoryType') categoryType: string,
    @Query('colors') colors: string,
    @Query('username') username: string,
    @Query('material') material: string,
    @Query('title') title: string,
  ) {
    console.log('route has been hit');
    console.log('Params:', { categoryType, colors, username, material, title });
    return this.productService.similarProducts(
      username,
      categoryType,
      colors,
      material,
      title,
    );
  }
}
