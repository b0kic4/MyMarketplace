import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from './trpc/trpc.module';
import { ProductModule } from './faker-product/product.module';
@Module({
  imports: [ConfigModule.forRoot(), TrpcModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
