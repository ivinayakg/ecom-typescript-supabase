import { useEffect, useState } from "react";
import { Cart, User } from "../types/main.types";
import CartService from "../services/cart";

const useCart = (user: User | null) => {
  const [cartData, setCartData] = useState<Cart | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await CartService.getUserCart(user.id);
      setCartData(data);
    })();
  }, []);

  return cartData;
};

export default useCart;
