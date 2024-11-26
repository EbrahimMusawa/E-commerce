export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  id: number;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface WishlistItem {
  id: number;
  productId: number;
  userId: number;
  addedAt: string;
}

export interface Order {
  id: number;
  userId: number;
  products: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}