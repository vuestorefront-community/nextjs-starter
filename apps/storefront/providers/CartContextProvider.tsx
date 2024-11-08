"use client";

import { useSdk } from "@/hooks/useSdk";
import { Cart } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<{
  cart: Cart;
  updateCart: (cart: Cart) => void;
}>({
  cart: {} as Cart,
  updateCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart>({} as Cart);
  const sdk = useSdk();

  useEffect(() => {
    async function getCart() {
      let cartId = localStorage.getItem("cartId") ?? "";
      let cart: Cart;
      if (!cartId) {
        const { data } = await sdk.sapcc.createCart({});
        cart = data;
      } else {
        try {
          const { data } = await sdk.sapcc.getCart({ cartId: cartId });
          cart = data;
        } catch {
          const { data } = await sdk.sapcc.createCart({});
          cart = data;
        }
      }
      localStorage.setItem("cartId", cart.guid ?? "");

      setCart(cart);
    }

    getCart();
  }, []);

  function updateCart(updatedCart: Cart) {
    setCart(updatedCart);
  }

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
