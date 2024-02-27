import { Product } from '@prisma/client';

class ImageDto {
  isLogo: boolean | string;
  imageUrl: string;
}
export class SaveProductDto {
  foundProduct: Product;
  userID: string;
}
