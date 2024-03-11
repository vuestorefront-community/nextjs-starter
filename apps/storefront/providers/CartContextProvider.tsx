"use client";

import { createContext, useEffect, useState } from "react";
import { useSdk } from "../sdk/sdk";
import { SfCart } from "../types/cart";

export const CartContext = createContext<{
  cart: SfCart;
  updateCart: (cart: SfCart) => void;
}>({
  cart: {} as SfCart,
  updateCart: () => { },
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<SfCart>({} as SfCart);
  const sdk = useSdk();

  useEffect(() => {
    async function getCart() {
      let cart = JSON.parse(localStorage.getItem("cart") as string);

      if (!cart) {
        cart = await sdk.unified.getCart({});

        localStorage.setItem("cart", JSON.stringify(cart));
      }
      setCart(cart);
    }

    getCart();
  }, []);

  function updateCart(updatedCart: SfCart) {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return <CartContext.Provider value={{ cart, updateCart }} > {children} </CartContext.Provider>;
}

