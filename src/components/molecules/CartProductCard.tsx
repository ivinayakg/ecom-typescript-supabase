import { useEffect, useState } from "react";
import CartService from "../../services/cart";
import { Cart, CartItem, Product, User } from "../../types/main.types";
import productService from "../../services/products";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import productQueryKeys from "@/helpers/queryKeys/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import cartQueryKeys from "@/helpers/queryKeys/cart";

type CartProductCardProps = {
  user?: User;
  cartInfo?: CartItem;
  cart?: Cart;
};

const CartProductCard = (props: CartProductCardProps) => {
  const { cart, cartInfo } = props;
  const queryClient = useQueryClient();

  const productId = cartInfo?.product_id;

  const { data: product } = useQuery({
    queryKey: productQueryKeys.product(productId ?? ""),
    queryFn: async () => {
      const data = await productService.getProductById(productId ?? "");
      return data;
    },
    enabled: !!productId,
  });

  const removeFromCart = async () => {
    if (!cart || !cartInfo) return;
    await CartService.removeItem(cartInfo.id, cart.id);
    queryClient.invalidateQueries({
      queryKey: cartQueryKeys.cartItems,
    });
  };

  const incrementQuantity = async () => {
    if (!cart || !cartInfo) return;
    await CartService.incrementQuantity(
      cartInfo.id,
      cart.id,
      cartInfo.quantity + 1
    );
    queryClient.invalidateQueries({
      queryKey: cartQueryKeys.cartItems,
    });
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
            <CardContent className="p-0 flex flex-col items-start">
              <p>${product.price}</p>
              {cartInfo && <p>Currenct Quantity {cartInfo.quantity}</p>}
            </CardContent>
          </>
        )}
      </CardHeader>
      <CardFooter className="justify-start p-4 gap-8">
        <Button onClick={removeFromCart}>Remove From Cart</Button>
        <Button onClick={incrementQuantity}>+</Button>
        <Button onClick={decrementQuantity}>-</Button>
      </CardFooter>
    </Card>
  );
};

export default CartProductCard;
