"use client";

import { useSdk } from "@/hooks/useSdk";
import { SfCart } from "middleware/types";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<{
  cart: SfCart;
  updateCart: (cart: SfCart) => void;
}>({
  cart: {} as SfCart,
  updateCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<SfCart>({} as SfCart);
  const sdk = useSdk();

  useEffect(() => {
    async function getCart() {
      const cartId = localStorage.getItem("cartId") ?? "";
      const cart = await sdk.unified.getCart({ cartId });
      localStorage.setItem("cartId", cart.id ?? "");
      setCart(cart);
    }

    getCart();
  }, []);

  function updateCart(updatedCart: SfCart) {
    setCart(updatedCart);
  }

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
