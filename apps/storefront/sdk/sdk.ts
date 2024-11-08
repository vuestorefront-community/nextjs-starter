import { Endpoints } from "@vsf-enterprise/sapcc-api";
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
  },
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, config, middlewareModule, getRequestHeaders }) => ({
    sapcc: buildModule(middlewareModule<Endpoints>, {
      apiUrl: config.middlewareUrl + "/sapcc",
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    }),
  })
);

export type Sdk = ReturnType<typeof getSdk>;
