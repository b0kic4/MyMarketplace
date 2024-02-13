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

export interface User {
  id: number;
  clerkUserId: string;
  username: string;
  email: string;
  imageUrl: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: number;
  userId: number;
  productId: number;
  purchasedAt: Date;
  deliveredAt: Date;
  quantity: number;
  user: User;
  product: Products[];
  purchaseStatus: "NotPurchased" | "Purchased" | "Delivering" | "Delivered";
  createdAt: Date;
  updatedAt: Date;
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
  user: User;
  userId: string;
  isUsed: boolean;
  savedByUsers: User[];
  Cart: Cart;
  createdAt: Date;
  updatedAt: Date;
}
