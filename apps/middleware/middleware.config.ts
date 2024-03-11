require('dotenv').config();
import {
  Config,
  Context,
  createUnifiedExtension,
  methods,
  normalizers
} from "@vsf-enterprise/unified-api-sapcc";
import { ApiClientExtension } from "@vue-storefront/middleware";

const apiMethods = methods<typeof normalizers>();
const unifiedApiExtension = createUnifiedExtension<Context, Config>()({
  normalizers,
  apiMethods
});

export const integrations = {
  commerce: {
    location: '@vsf-enterprise/sapcc-api/server',
    configuration: {
      OAuth: {
        uri: process.env.SAPCC_OAUTH_URI,
        clientId: process.env.SAPCC_OAUTH_CLIENT_ID,
        clientSecret: process.env.SAPCC_OAUTH_CLIENT_SECRET,
        tokenEndpoint: process.env.SAPCC_OAUTH_TOKEN_ENDPOINT,
        tokenRevokeEndpoint: process.env.SAPCC_OAUTH_TOKEN_REVOKE_ENDPOINT,
        cookieOptions: {
          'vsf-sap-token': { secure: process.env.NODE_ENV !== 'development' }
        }
      },
      api: {
        uri: process.env.SAPCC_API_URI,
        baseSiteId: process.env.DEFAULT_BASE_SITE_ID,
        catalogId: process.env.DEFAULT_CATALOG_ID,
        catalogVersion: process.env.DEFAULT_CATALOG_VERSION,
        defaultLanguage: process.env.DEFAULT_LANGUAGE,
        defaultCurrency: process.env.DEFAULT_CURRENCY
      }
    },
    extensions: (extensions: ApiClientExtension[]) => [...extensions, unifiedApiExtension]
  }
};

export type UnifiedApiExtension = typeof unifiedApiExtension;