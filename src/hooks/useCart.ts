import { Cart, CartItem, User } from "../types/main.types";
import CartService from "../services/cart";
import { useQuery } from "@tanstack/react-query";
import cartQueryKeys from "@/helpers/queryKeys/cart";

type CartHookResponse = {
  cart?: Cart;
  cartItems?: CartItem[];
};

const useCart = (user: User | undefined): CartHookResponse => {
  const { data: cart } = useQuery({
    queryKey: cartQueryKeys.cart,
    queryFn: async () => {
      const data = await CartService.getUserCart(user?.id ?? "");
      return data;
    },
    enabled: !!user,
  });

  const { data: cartItems } = useQuery({
    queryKey: cartQueryKeys.cartItems,
    queryFn: async () => {
      const data = await CartService.getCartInfo(cart?.id ?? "");
      return data;
    },
    enabled: !!cart,
  });

  return { cart, cartItems };
};

export default useCart;
