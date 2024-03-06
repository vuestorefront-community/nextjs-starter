import { useContext } from "react";
import { CartContext } from "../providers/CartContextProvider";
import { useSdk } from "../sdk/sdk";
import { Product } from "@vsf-enterprise/sap-commerce-webservices-sdk";

export default function useCart() {
  const { cart, updateCart } = useContext(CartContext);
  const sdk = useSdk();

  async function addToCart(product: Product, quantity: number = 1) {
    try {
      await sdk.sapcc.addCartEntry({
        cartId: cart.guid as string,
        entry: {
          quantity: quantity,
          product: {
            code: product.code as string,
          },
        }
      })

      const updatedCart = await sdk.sapcc.getCart({
        cartId: cart.guid as string
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