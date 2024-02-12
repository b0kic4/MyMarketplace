class ImageDto {
  isLogo: boolean | string;
  imageUrl: string;
}
export class SaveProductDto {
  id: number;
  title: string;
  productId?: number;
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
