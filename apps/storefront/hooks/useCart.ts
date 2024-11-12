import { SfProduct } from "middleware/types";
import { useContext } from "react";
import { CartContext } from "../providers/CartContextProvider";
import { useSdk } from "./useSdk";

export default function useCart() {
  const { cart, updateCart } = useContext(CartContext);
  const sdk = useSdk();

  async function addToCart(product: SfProduct, quantity: number = 1) {
    try {
      await sdk.unified.addCartLineItem({
        cartId: cart.id,
        productId: product.id ?? "",
        sku: product.id ?? "",
        quantity: quantity,
      });

      const data = await sdk.unified.getCart({
        cartId: cart.id as string,
      });

      updateCart(data as any);
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  }

  return {
    cart,
    addToCart,
  };
}
