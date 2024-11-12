import { Product } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { useContext } from "react";
import { CartContext } from "../providers/CartContextProvider";
import { useSdk } from "./useSdk";

export default function useCart() {
  const { cart, updateCart } = useContext(CartContext);
  const sdk = useSdk();

  async function addToCart(product: Product, quantity: number = 1) {
    try {
      await sdk.unified.addCartLineItem({
        cartId: cart.guid as string,
        productId: product.code ?? "",
        sku: product.code ?? "",
        quantity: 1,
      });

      const data = await sdk.unified.getCart({
        cartId: cart.guid as string,
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
