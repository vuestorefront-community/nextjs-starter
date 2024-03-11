import { useContext } from "react";
import { CartContext } from "../providers/CartContextProvider";
import { useSdk } from "../sdk/sdk";
import { SfProduct } from "../types/product";

export default function useCart() {
  const { cart, updateCart } = useContext(CartContext);
  const sdk = useSdk();

  async function addToCart(product: SfProduct, quantity: number = 1) {
    try {
      await sdk.unified.addCartLineItem({
        cartId: cart.id,
        productId: product.id,
        sku: product.sku,
        quantity
      })

      const updatedCart = await sdk.unified.getCart({
        cartId: cart.id as string
      });

      updateCart(updatedCart)
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  }

  return {
    cart,
    addToCart
  }
}