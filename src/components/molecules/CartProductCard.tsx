import { useEffect, useState } from "react";
import CartService from "../../services/cart";
import { Cart, CartItem, Product, User } from "../../types/main.types";
import productService from "../../services/products";

type CartProductCardProps = {
  user: User | null;
  cartInfo?: CartItem;
  refresh: () => void;
  cart: Cart | null;
};

const CartProductCard = (props: CartProductCardProps) => {
  const { user, cart, cartInfo, refresh } = props;

  const productId = cartInfo?.product_id;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) return;
    (async () => {
      const data = await productService.getProductById(productId);
      setProduct(data);
    })();
  }, [productId]);

  const removeFromCart = async () => {
    if (!cart || !cartInfo) return;
    await CartService.removeItem(cartInfo.id, cart.id);
    await refresh();
  };

  const incrementQuantity = async () => {
    if (!cart || !cartInfo) return;
    await CartService.incrementQuantity(
      cartInfo.id,
      cart.id,
      cartInfo.quantity + 1
    );
    await refresh();
  };

  const decrementQuantity = async () => {
    if (!cart || !cartInfo) return;
    await CartService.decrementQuantity(
      cartInfo.id,
      cart.id,
      cartInfo.quantity - 1
    );

    if (cartInfo.quantity === 1) {
      await removeFromCart();
    }

    await refresh();
  };

  return (
    <div className="product-card">
      {product && (
        <>
          <img src={product.image ?? ""} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description ?? "No Description"}</p>
          <p>${product.price}</p>
        </>
      )}
      {user && <button onClick={removeFromCart}>Remove From Cart</button>}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        {user && <button onClick={incrementQuantity}>+</button>}
        {user && <button onClick={decrementQuantity}>-</button>}
      </div>

      {cartInfo && <p>Currenct Quantity {cartInfo.quantity}</p>}
    </div>
  );
};

export default CartProductCard;
