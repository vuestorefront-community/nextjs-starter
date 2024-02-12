import { sapccModule } from '@vsf-enterprise/sapcc-sdk';
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
  }
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, middlewareUrl, getRequestHeaders }) => ({
    sapcc: buildModule(sapccModule, {
      apiUrl: middlewareUrl + "/sapcc",
    }),
  }),
);


