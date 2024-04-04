import { CreateSdkOptions, createSdk } from "@vue-storefront/next";
import { Endpoints } from "@vsf-enterprise/sapcc-api";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
  }
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, middlewareUrl, middlewareModule, getRequestHeaders }) => ({
    sapcc: buildModule(middlewareModule<Endpoints>, {
      apiUrl: middlewareUrl + "/sapcc",
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    }),
  }),
);
