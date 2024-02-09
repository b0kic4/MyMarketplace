// products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { PrismaService } from '@server/prisma-service/prisma.service';
import { FirebaseService } from '@server/firebase.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, FirebaseService],
})
export class ProductsModule {}
