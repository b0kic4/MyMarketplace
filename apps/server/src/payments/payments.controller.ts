import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}
  @Post('store-payment-info')
  async store(@Body() requestBody: any) {
    console.log('request body: ', requestBody);
    const session = requestBody.session;
    return await this.paymentService.storePaymentInfo(session);
  }
}
