// product.module.ts

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '@server/prisma-service/prisma.service'; // Adjust the path

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService], // Include PrismaService in the providers array
})
export class ProductModule {}
