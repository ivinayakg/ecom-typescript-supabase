// import { useNavigate } from "react-router";
import productService from "../../services/products";
import { Cart, CartItem, Product, User } from "../../types/main.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import productQueryKeys from "@/helpers/queryKeys/product";
import cartQueryKeys from "@/helpers/queryKeys/cart";

type ProductCardProps = {
  product: Product;
  user: User | undefined;
  cart?: Cart;
  cartInfo?: CartItem;
};

const ProductCard = (props: ProductCardProps) => {
  const { product, user, cartInfo } = props;
  // const navigate = useNavigate();

  const queryClient = useQueryClient();

  const addToCartHanlder = async () => {
    if (!user) return;
    await productService.addToCart(product, user.id);

    queryClient.invalidateQueries({
      queryKey: productQueryKeys.products,
    });
    queryClient.invalidateQueries({
      queryKey: cartQueryKeys.cartItems,
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="items-start p-4 gap-4">
        {product && (
          <>
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="w-full object-cover h-[250px] rounded-[6px]"
              />
            )}
            <CardTitle>
              {product.title.charAt(0).toUpperCase() +
                product.title.substring(1).toLowerCase()}
            </CardTitle>
            {product.description && product.description.length && (
              <CardDescription>{product.description}</CardDescription>
            )}
            <CardContent className="p-0">
              <p>${product.price}</p>
            </CardContent>
          </>
        )}
      </CardHeader>
      <CardFooter className="justify-start p-4 gap-8">
        <Button variant="outline">Know More</Button>
        <Button onClick={addToCartHanlder} disabled={!!cartInfo}>
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
