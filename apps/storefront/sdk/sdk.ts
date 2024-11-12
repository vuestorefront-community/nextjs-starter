import { CreateSdkOptions, createSdk } from "@vue-storefront/next";
import type { UnifiedEndpoints } from "middleware/types";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
  },
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, config, middlewareModule, getRequestHeaders }) => ({
    unified: buildModule(middlewareModule<UnifiedEndpoints>, {
      apiUrl: config.middlewareUrl + "/commerce",
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    }),
  })
);

export type Sdk = ReturnType<typeof getSdk>;
