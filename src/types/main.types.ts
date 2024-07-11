// Product Type
type Product = {
  created_at: string;
  description: string | null;
  id: string;
  image: string | null;
  price: number;
  title: string;
  updated_at: string | null;
};

enum CART_ITEM_STATUS {
  ACTIVE = "ACTIVE",
  REMOVED = "REMOVED",
}

// CartItem Type
type CartItem = {
  cart_id: string | null;
  created_at: string;
  id: string;
  product_id: string | null;
  quantity: number;
  status: CART_ITEM_STATUS; // Assuming CART_ITEM_STATUS is not accessible directly
};

// User Type
type User = {
  created_at: string;
  email: string;
  id: string;
  name: string;
  picture: string | null;
  updated_at: string | null;
};

// Cart Type
type Cart = {
  created_at: string;
  id: string;
  user_id: string | null;
};

export type { Product, User, CartItem, Cart, CART_ITEM_STATUS };
