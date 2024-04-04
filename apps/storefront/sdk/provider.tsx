"use client";

import { ReactNode } from "react";
import { SdkProvider } from "./sdk";
import CartContextProvider from "../providers/CartContextProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SdkProvider>
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </SdkProvider>
  );
}