import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}
  @Post('store-payment-info')
  async store(@Body() requestBody: any) {
    const session = requestBody.session;
    const metadata = requestBody.metadata;
    return await this.paymentService.storePaymentInfo(session, metadata);
  }
  @Get('getOrderByUserId')
  async getByOrderByUserId(@Query('userId') userId: any) {
    return await this.paymentService.getOrderByUserId(userId);
  }
}
