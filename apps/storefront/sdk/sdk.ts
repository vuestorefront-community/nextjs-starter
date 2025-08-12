import type { UnifiedEndpoints } from "middleware/types";
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
    ssrApiUrl: "http://localhost:8181",
  },
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, config, getRequestHeaders, middlewareModule }) => ({
    unified: buildModule(middlewareModule<UnifiedEndpoints>, {
      apiUrl: `${config.apiUrl}/commerce`,
      cdnCacheBustingId: config.cdnCacheBustingId,
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
      ssrApiUrl: `${config.ssrApiUrl}/commerce`,
    }),
  })
);

export type Sdk = ReturnType<typeof getSdk>;
