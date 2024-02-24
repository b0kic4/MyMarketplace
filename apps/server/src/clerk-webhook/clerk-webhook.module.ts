import { Module } from '@nestjs/common';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { UsersService } from '@server/users/users.service';
import { PrismaService } from '@server/prisma-service/prisma.service';

@Module({
  controllers: [ClerkWebhookController],
  providers: [PrismaService, UsersService],
})
export class ClerkWebhookModule {}
