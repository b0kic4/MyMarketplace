import { Product } from '@prisma/client';

export class SaveProductDto {
  foundProduct: Product;
  userID: string;
}
