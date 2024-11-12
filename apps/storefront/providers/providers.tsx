"use client";

import { ReactNode } from "react";

import { SdkProvider } from "@/sdk/alokai-context";
import { getSdk } from "@/sdk/sdk";
import CartContextProvider from "../providers/CartContextProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SdkProvider sdk={getSdk()}>
      <CartContextProvider>{children}</CartContextProvider>
    </SdkProvider>
  );
}
