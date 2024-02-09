import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    generateFakeProducts(count: number): Prisma.ProductCreateInput[];
}
