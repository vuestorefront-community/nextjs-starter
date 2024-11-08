"use client";

import { createContext } from "react";
import { Sdk } from "./sdk";

export const SdkContext = createContext<Sdk | null>(null);

export function SdkProvider({
  children,
  sdk,
}: {
  children: React.ReactNode;
  sdk: Sdk;
}) {
  return <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
}
