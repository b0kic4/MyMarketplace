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
@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
