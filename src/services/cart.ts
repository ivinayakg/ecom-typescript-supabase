import { Cart, CART_ITEM_STATUS, CartItem } from "../types/main.types";
import { supabase } from "../utility/supabase";

const CartService = {
  getUserCart: async (userId: string): Promise<Cart> => {
    const { data: cart } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId);

    if (cart.length) {
      return cart[0];
    } else {
      const { data } = await supabase.from("cart").insert({
        user_id: userId,
      });
      return data[0];
    }
  },

  addCartItem: async (cartId: string, productId: string): Promise<CartItem> => {
    // if cartItem already exists, increment quantity
    const { data: existingCartItem } = await supabase
      .from("cartItem")
      .select("*")
      .eq("cart_id", cartId)
      .eq("product_id", productId)
      .eq("status", "ACTIVE");

    if (existingCartItem.length) {
      const { data } = await supabase
        .from("cartItem")
        .update({ quantity: existingCartItem[0].quantity + 1 })
        .eq("id", existingCartItem[0].id)
        .select();
      return data;
    } else {
      const { data } = await supabase.from("cartItem").insert({
        cart_id: cartId,
        product_id: productId,
        quantity: 1,
        status: "ACTIVE",
      });
      return data;
    }
  },

  getCartItem: async (
    cartId: string,
    productId: string,
    status?: CART_ITEM_STATUS
  ): Promise<CartItem> => {
    if (!status) {
      const { data } = await supabase
        .from("cartItem")
        .select("*")
        .eq("cart_id", cartId)
        .eq("product_id", productId)
        .eq("status", "ACTIVE");

      return data[0];
    }

    const { data } = await supabase
      .from("cartItem")
      .select("*")
      .eq("cart_id", cartId)
      .eq("product_id", productId)
      .eq("status", status);

    return data[0];
  },

  getCartInfo: async (cartId: string): Promise<CartItem[]> => {
    const { data } = await supabase
      .from("cartItem")
      .select("*")
      .eq("cart_id", cartId)
      .eq("status", "ACTIVE");

    return data;
  },

  removeItem: async (cartItemId: string, cartId: string): Promise<void> => {
    await supabase
      .from("cartItem")
      .update({ status: "REMOVED" })
      .eq("id", cartItemId)
      .eq("cart_id", cartId);
  },

  incrementQuantity: async (
    cartItemId: string,
    cartId: string,
    quantity: number
  ): Promise<void> => {
    await supabase
      .from("cartItem")
      .update({ quantity })
      .eq("id", cartItemId)
      .eq("cart_id", cartId);
  },

  decrementQuantity: async (
    cartItemId: string,
    cartId: string,
    quantity: number
  ): Promise<void> => {
    await supabase
      .from("cartItem")
      .update({ quantity })
      .eq("id", cartItemId)
      .eq("cart_id", cartId);
  },
};

export default CartService;
