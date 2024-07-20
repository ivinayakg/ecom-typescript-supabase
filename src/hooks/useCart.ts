import { useEffect, useState } from "react";
import { Cart, CartItem, User } from "../types/main.types";
import CartService from "../services/cart";

type CartHookResponse = {
  cart: Cart | null;
  cartItems: CartItem[];
  refresh: () => void;
};

const useCart = (user: User | null): CartHookResponse => {
  const [cartData, setCartData] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  async function getCartItems() {
    const data = await CartService.getCartInfo(cartData?.id ?? "");
    setCartItems(data);
  }

  async function getCart() {
    const data = await CartService.getUserCart(user?.id ?? "");
    setCartData(data);
  }

  async function refreshEntireCart() {
    await getCart();
    await getCartItems();
  }

  useEffect(() => {
    if (!user) return;
    (async () => {
      await getCart();
    })();
  }, [user]);

  useEffect(() => {
    if (!cartData) return;
    (async () => {
      await getCartItems();
    })();
  }, [cartData]);

  return { cart: cartData, cartItems, refresh: refreshEntireCart };
};

export default useCart;
