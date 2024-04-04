import { WithoutContext } from "@vue-storefront/middleware";
import { unifiedApiExtension } from "./middleware.config";

export type UnifiedApiExtension = typeof unifiedApiExtension;
export type UnifiedEndpoints = WithoutContext<UnifiedApiExtension["extendApiMethods"]>;