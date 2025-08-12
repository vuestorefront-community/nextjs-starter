import { sapccModule } from "@vsf-enterprise/sapcc-sdk";
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
    ssrApiUrl: "http://localhost:8181",
  },
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, config, getRequestHeaders }) => ({
    sapcc: buildModule(sapccModule, {
      apiUrl: `${config.apiUrl}/sapcc`,
      cdnCacheBustingId: config.cdnCacheBustingId,
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
      ssrApiUrl: `${config.ssrApiUrl}/sapcc`,
    }),
  })
);
