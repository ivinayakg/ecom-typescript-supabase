import { useUser } from "../../hooks/useUser";
import useCart from "../../hooks/useCart";
import CartProductCard from "../molecules/CartProductCard";

const Cart = () => {
  const user = useUser();
  const { cartItems, cart } = useCart(user);

  return (
    <div className="flex flex-col justify-start items-center w-[90vw] min-h-[100vh]">
      <div className="flex justify-start items-start flex-wrap gap-8 w-full p-4">
        {cartItems?.map((cartItem) => (
          <CartProductCard user={user} cartInfo={cartItem} cart={cart} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
