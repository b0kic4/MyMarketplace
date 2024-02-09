import { Prisma } from '@prisma/client';
import { PrismaService } from '@server/prisma-service/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    generateFakeProduct(): Prisma.ProductCreateInput;
    generateFakeProducts(count: number): Prisma.ProductCreateInput[];
    generateAndStoreFakeProducts(count: number): Promise<void>;
}
