import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from './trpc/trpc.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma-service/prisma.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { PaymentsService } from './payments/payments.service';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { ClerkWebhookController } from './clerk-webhook/clerk-webhook.controller';
import { UsersService } from './users/users.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    UsersModule,
    ProductsModule,
    CartModule,
    PaymentsModule,
  ],
  controllers: [AppController, PaymentsController, ClerkWebhookController],
  providers: [AppService, PrismaService, UsersService, PaymentsService],
})
export class AppModule {}
