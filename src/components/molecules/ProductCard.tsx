import productService from "../../services/products";
import { Cart, CartItem, Product, User } from "../../types/main.types";

type ProductCardProps = {
  product: Product;
  user: User | null;
  cart: Cart | null;
  cartInfo?: CartItem;
  refresh: () => void;
};

const ProductCard = (props: ProductCardProps) => {
  const { product, user, cartInfo, refresh } = props;

  const addToCartHanlder = async () => {
    if (!user) return;
    await productService.addToCart(product, user.id);
    await refresh();
  };

  return (
    <div className="product-card">
      <img src={product.image ?? ""} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description ?? "No Description"}</p>
      <p>${product.price}</p>
      {user && <button onClick={addToCartHanlder}>Add to cart</button>}

      {cartInfo && <p>Added to cart {cartInfo.quantity}</p>}
    </div>
  );
};

export default ProductCard;
