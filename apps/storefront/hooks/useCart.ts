import { Product } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { useContext } from "react";
import { CartContext } from "../providers/CartContextProvider";
import { useSdk } from "./useSdk";

export default function useCart() {
  const { cart, updateCart } = useContext(CartContext);
  const sdk = useSdk();

  async function addToCart(product: Product, quantity: number = 1) {
    try {
      await sdk.sapcc.createCartEntry({
        cartId: cart.guid as string,
        orderEntry: {
          quantity: quantity,
          product: {
            code: product.code as string,
          },
        },
      });

      const { data } = await sdk.sapcc.getCart({
        cartId: cart.guid as string,
      });

      updateCart(data);
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  }

  return {
    cart,
    addToCart,
  };
}
