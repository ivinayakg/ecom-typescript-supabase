import { CartItem, Product } from "../types/main.types";
import CartService from "./cart";

const productService = {
  addToCart: async (product: Product, userId: string): Promise<CartItem> => {
    const cart = await CartService.getUserCart(userId);

    const data = await CartService.addCartItem(cart.id, product.id);
    return data;
  },
};

export default productService;
