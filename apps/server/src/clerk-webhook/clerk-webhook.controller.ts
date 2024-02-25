import { Body, Controller, Post } from '@nestjs/common';
import { ClerkWebhookService } from './clerk-webhook.service';

@Controller('clerk-webhook')
export class ClerkWebhookController {
  constructor(private readonly webhookService: ClerkWebhookService) {}

  @Post('user')
  async handleWebhook(@Body() clerkEvent: any) {
    try {
      const result = await this.webhookService.createUser(clerkEvent);
      console.log(result);
      return result;
    } catch (error) {
      console.log('Error in webhook handling:', error.message);
      return 'Error handling webhook';
    }
  }
}
