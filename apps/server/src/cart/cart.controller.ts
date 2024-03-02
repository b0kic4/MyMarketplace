import { Controller, Get, Param, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '@prisma/client';

@Controller('cart') export class CartController {
  constructor(private cartService: CartService) { }
  @Get('getCartByUserId')
  async findById(@Query('userId') userId: string): Promise<Cart> {
    return await this.cartService.getCartByUserId(userId);
  }
}
