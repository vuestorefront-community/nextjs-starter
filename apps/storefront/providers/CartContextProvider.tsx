"use client";

import { Cart } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { createContext, useEffect, useState } from "react";
import { useSdk } from "../sdk/sdk";

export const CartContext = createContext<{
  cart: Cart;
  updateCart: (cart: Cart) => void;
}>({
  cart: {} as Cart,
  updateCart: () => { },
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({} as Cart);
  const sdk = useSdk();

  useEffect(() => {
    async function getCart() {
      let cart = JSON.parse(localStorage.getItem("cart") as string);

      if (!cart) {
        cart = await sdk.sapcc.createCart();

        localStorage.setItem("cart", JSON.stringify(cart));
      }
      setCart(cart);
    }

    getCart();
  }, []);

  function updateCart(updatedCart: Cart) {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return <CartContext.Provider value={{ cart, updateCart }} > {children} </CartContext.Provider>;
}

