import ProductCard from "../molecules/ProductCard";
import useProdcuts from "../../hooks/useProducts";
import { useUser } from "../../hooks/useUser";
import useCart from "../../hooks/useCart";

const Home = () => {
  const products = useProdcuts();
  const user = useUser();
  const { cart, cartItems } = useCart(user);

  return (
    <div className="flex flex-col justify-start items-center w-[90vw] min-h-[100vh]">
      <div className="flex justify-start items-start flex-wrap gap-8 w-full p-4">
        {products?.map((product) => (
          <ProductCard
            product={product}
            user={user}
            cart={cart}
            cartInfo={cartItems?.find((item) => item.product_id === product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
