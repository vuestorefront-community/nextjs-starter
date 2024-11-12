import { SdkContext } from "@/sdk/alokai-context";
import { useContext } from "react";

export const useSdk = () => {
  const contextSdk = useContext(SdkContext);
  if (!contextSdk) {
    throw new Error("useSdk must be used within a SdkProvider");
  }
  return contextSdk;
};
