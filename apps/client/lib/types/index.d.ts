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

export interface ProductImage {
  id: number;
  imageUrl: string;
  isLogo: boolean | string;
  productId: number;
}

export interface Product {
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
  user: User;
}

export interface CartProduct {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  cart: Cart | null;
  product: Product[];
}

export interface Review {
  id: number;
  content: string;
  rating: number;
  productId: number;
  orderId: number;
  userId?: number; // Include this if you need to know which user left the review
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: number;
  content: string;
  rating: number;
  productId: number;
  product: Product | null;
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: string;
  cartId: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  purchasedProducts: CartProduct[];
}
