import { CartItem, Product } from "../types/main.types";
import { supabase } from "../utility/supabase";
import CartService from "./cart";

const productService = {
  addToCart: async (product: Product, userId: string): Promise<CartItem> => {
    const cart = await CartService.getUserCart(userId);

    const data = await CartService.addCartItem(cart.id, product.id);
    return data;
  },

  getProductById: async (productId: string): Promise<Product> => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId);
    return data[0];
  },
};

export default productService;
