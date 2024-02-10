export class CreateProductDto {
  id: number;
  title: string;
  description: string;
  images: { file: File; isLogo: boolean }[];
  categoryType: string;
  price: string;
  sizes: string;
  colors: string;
  material: string;
  texture: string;
  stock: number;
  shippingInformation: string;
  isChecked: boolean;
}
