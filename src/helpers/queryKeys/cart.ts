const cartQueryKeys = {
  cart: ["CARTS"],
  cartItems: ["CART_ITEM"],
  cartItem: (id: string) => ["CART_ITEM", id],
};

export default cartQueryKeys;
