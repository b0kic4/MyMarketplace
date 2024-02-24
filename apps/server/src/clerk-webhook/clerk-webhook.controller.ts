import { Body, Controller, Post } from '@nestjs/common';

@Controller('clerk-webhook')
export class ClerkWebhookController {
  @Post('user')
  handleWebhook(@Body() event: any) {
    console.log('Received Clerk webhook event: ', event);
    return 'Webhook received successfully';
  }
}
