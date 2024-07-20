import { useUser } from "../../hooks/useUser";
import useCart from "../../hooks/useCart";
import CartProductCard from "../molecules/CartProductCard";

const Cart = () => {
  const user = useUser();
  const { cartItems, cart, refresh } = useCart(user);

  return (
    <div>
      <h1>Cart</h1>
      <p>Welcome to the Cart page!</p>
      {cartItems.map((cartItem) => (
        <CartProductCard
          user={user}
          cartInfo={cartItem}
          refresh={refresh}
          cart={cart}
        />
      ))}
    </div>
  );
};

export default Cart;
