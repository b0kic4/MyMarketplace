export interface User {
  id: number;
  clerkUserId: string;
  username: string;
  email: string;
  imageUrl: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  savedProducts: Product[];
  cartId: number | null;
  cart: Cart | null;
}

export interface Image {
  id: number;
  imageUrl: string | null;
  isLogo: string | null;
  productId: number | null;
  product: Product | null;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  images: Image[];
  categoryType: string;
  price: string;
  sizes: string;
  colors: string;
  material: string;
  texture: string;
  stock: number;
  shippingInformation: string;
  isChecked: boolean;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: User | null;
  savedByUsers: User[];
  cart: CartProduct[];
  reviews: Review[];
}

export interface Cart {
  id: number;
  userId: number;
  purchasedAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  products: CartProduct[];
}

export interface CartProduct {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  purchaseStatus: "NotPurchased" | "Purchased" | "Delivering" | "Delivered";
  createdAt: string;
  updatedAt: string;
  cart: Cart | null;
  product: Product[] | null;
}

export interface Review {
  id: number;
  content: string;
  rating: number;
  productId: number;
  product: Product | null;
}
