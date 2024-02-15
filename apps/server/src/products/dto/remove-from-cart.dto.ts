import { User } from '@prisma/client';

class ProductDto {
  id: number;
  title: string;
  description: string;
  images: ImageDto[];
  categoryType: string;
  price: string;
  sizes: string;
  colors: string;
  material: string;
  texture: string;
  stock: number;
  user: User;
}

export class RemoveProductFromCartDto {
  foundProduct: ProductDto;
  userId: string | undefined;
}

class ImageDto {
  isLogo: boolean | string;
  imageUrl: string;
}
