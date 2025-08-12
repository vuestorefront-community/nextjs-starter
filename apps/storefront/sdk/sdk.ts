<<<<<<< HEAD
=======
import { sapccModule } from "@vsf-enterprise/sapcc-sdk";
>>>>>>> add-to-cart
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";
import type { UnifiedEndpoints } from "middleware/types";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
    ssrApiUrl: "http://localhost:8181",
  },
};

export const { getSdk } = createSdk(
  options,
<<<<<<< HEAD
  ({ buildModule, config, middlewareModule, getRequestHeaders }) => ({
    unified: buildModule(middlewareModule<UnifiedEndpoints>, {
      apiUrl: config.middlewareUrl + "/commerce",
=======
  ({ buildModule, config, getRequestHeaders }) => ({
    sapcc: buildModule(sapccModule, {
      apiUrl: `${config.apiUrl}/sapcc`,
      cdnCacheBustingId: config.cdnCacheBustingId,
>>>>>>> add-to-cart
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
      ssrApiUrl: `${config.ssrApiUrl}/sapcc`,
    }),
  })
);

export type Sdk = ReturnType<typeof getSdk>;
