export interface Images {
  file: File;
  isLogo: boolean | string; // Change this to boolean
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  isLogo: boolean | string;
  productId: number;
}

export interface Products {
  id: number;
  title: string;
  description: string;
  images: ProductImage[];
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
