import { useEffect, useState } from "react";
import productService from "../../services/products";
import { Cart, CartItem, Product, User } from "../../types/main.types";
import CartService from "../../services/cart";

type ProductCardProps = {
  product: Product;
  user: User | null;
  cart: Cart | null;
};

const ProductCard = (props: ProductCardProps) => {
  const { product, user, cart } = props;
  const [cartStatus, setCartStatus] = useState<CartItem | null>(null);

  const addToCartHanlder = async () => {
    if (!user) return;
    // Add product to cart
    const data = await productService.addToCart(product, user.id);
    setCartStatus(data);
  };

  useEffect(() => {
    if (!user || !cart) return;
    (async () => {
      const data = await CartService.getCartItem(cart.id, product.id);
      setCartStatus(data);
    })();
  }, [user, cart]);

  console.log(cartStatus);
  

  return (
    <div className="product-card">
      <img src={product.image ?? ""} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description ?? "No Description"}</p>
      <p>${product.price}</p>
      {user && <button onClick={addToCartHanlder}>Add to cart</button>}

      {cartStatus && cartStatus.status === "ACTIVE" && (
        <p>Added to cart {cartStatus.quantity}</p>
      )}
    </div>
  );
};

export default ProductCard;
