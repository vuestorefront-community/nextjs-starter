import { CreateSdkOptions, createSdk } from "@vue-storefront/next";
import type { UnifiedEndpoints } from 'middleware/types';

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
  }
};

export const { getSdk } = createSdk(options,
  ({ buildModule, middlewareModule, middlewareUrl, getRequestHeaders }) => ({
    unified: buildModule(middlewareModule<UnifiedEndpoints>, {
      apiUrl: `${middlewareUrl}/commerce`,
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    }),
  }));

export type Sdk = ReturnType<typeof getSdk>;
