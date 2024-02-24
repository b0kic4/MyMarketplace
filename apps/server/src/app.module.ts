import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from './trpc/trpc.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma-service/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { PaymentsService } from './payments/payments.service';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { ClerkWebhookController } from './clerk-webhook/clerk-webhook.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CartModule,
    PaymentsModule,
  ],
  controllers: [AppController, PaymentsController, ClerkWebhookController],
  providers: [AppService, PrismaService, PaymentsService],
})
export class AppModule {}
