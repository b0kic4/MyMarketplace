class ImageDto {
  isLogo: boolean | string;
  imageUrl: string;
}
export class AddProdcutToCart {
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
  quantity: number;
  shippingInformation: string;
  isChecked: boolean;
  userId: string;
  isUsed: boolean;
}
