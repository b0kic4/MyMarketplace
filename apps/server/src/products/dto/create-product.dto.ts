import { IsBoolean, IsString } from 'class-validator';

class ImageDto {
  isLogo: boolean | string;
  imageUrl: string;
}
export class CreateProductDto {
  id: number;
  title: string;
  description: string;
  images: { isLogosAndImageUrls: ImageDto[] };
  categoryType: string;
  price: string;
  sizes: string;
  colors: string;
  material: string;
  texture: string;
  stock: number;
  shippingInformation: string;
  isChecked: boolean;
  userId: string;
  isUsed: boolean;
}
