import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { UsersService } from '@server/users/users.service';
import { ClerkWebhookService } from './clerk-webhook.service';
@Controller('clerk-webhook')
export class ClerkWebhookController {
  constructor(private readonly webhookService: ClerkWebhookService) {}
  @Post('user')
  async handleWebhook(@Body() clerkEvent: any) {
    try {
      return this.webhookService.createUser(clerkEvent);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
