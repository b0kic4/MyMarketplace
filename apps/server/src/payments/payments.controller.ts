import { CreateProductReviewDto } from './dto/createReviewDto.dto';
import { PaymentsService } from './payments.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';


@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) { }

  @Post('store-payment-info')
  async store(@Body() requestBody: any) {
    const session = requestBody.session;
    const metadata = requestBody.metadata;
    return await this.paymentService.storePaymentInfo(session, metadata);
  }

  @Get('getOrderByUserId')
  async getByOrderByUserId(@Query('userId') userId: string) {
    return await this.paymentService.getOrderByUserId(userId);
  }

  @Post('createReviewForProduct')
  async create(@Body() createReviewProductDto: CreateProductReviewDto) {
    return await this.paymentService.createReview(createReviewProductDto)
  }

  @Post('removeReviewFromProduct')
  async removeReview() {
    return await this.paymentService.removeReviewFromProduct()
  }
}
