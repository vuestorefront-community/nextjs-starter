import { unifiedModule } from '@vsf-enterprise/unified-sdk';
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";
import { UnifiedApiExtension } from '../../middleware/middleware.config';

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:8181",
  }
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, middlewareUrl, getRequestHeaders }) => ({
    unified: buildModule(unifiedModule<UnifiedApiExtension>, {
      apiUrl: middlewareUrl + "/commerce",
      requestOptions: {
        headers: () => getRequestHeaders() as Record<string, string>,
      },
    }),
  }),
);


