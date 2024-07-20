import ProductCard from "../molecules/ProductCard";
import useProdcuts from "../../hooks/useProducts";
import { useGoogleSignIn } from "../../hooks/useGoogleSignIn";
import { useUser } from "../../hooks/useUser";
import useCart from "../../hooks/useCart";

const Home = () => {
  const products = useProdcuts();
  const { signIn, signOut } = useGoogleSignIn();
  const user = useUser();
  const { cart, cartItems, refresh } = useCart(user);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      {products.map((product) => (
        <ProductCard
          product={product}
          user={user}
          cart={cart}
          cartInfo={cartItems.find((item) => item.product_id === product.id)}
          refresh={refresh}
        />
      ))}
      {!user ? (
        <button onClick={signIn}>Sign in with Google</button>
      ) : (
        <button onClick={signOut}>Sign Out</button>
      )}
    </div>
  );
};

export default Home;
