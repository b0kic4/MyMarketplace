import { Module } from '@nestjs/common';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { UsersService } from '@server/users/users.service';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { UsersModule } from '@server/users/users.module';
import { UsersController } from '@server/users/users.controller';
import { ClerkWebhookService } from './clerk-webhook.service';

@Module({
  controllers: [ClerkWebhookController],
  providers: [PrismaService, ClerkWebhookService],
})
export class ClerkWebhookModule {}
