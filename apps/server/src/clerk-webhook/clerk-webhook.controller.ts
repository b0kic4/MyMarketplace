// clerk-webhook.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ClerkWebhookService } from './clerk-webhook.service';
import { User } from '@prisma/client';

@Controller('clerk-webhook')
export class ClerkWebhookController {
  constructor(private readonly webhookService: ClerkWebhookService) {}

  @Post('user')
  async handleWebhook(@Body() clerkEvent: any): Promise<User> {
    try {
      return await this.webhookService.createUser(clerkEvent);
    } catch (error) {
      console.log('Error in webhook handling:', error.message);
      throw new Error('Error handling webhook'); // Adjusted return type to User
    }
  }
}
