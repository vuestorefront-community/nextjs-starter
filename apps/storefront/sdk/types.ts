import { InferSdkMethodReturn } from '@vsf-enterprise/unified-sdk';
import { UnifiedApiExtension } from '../../middleware/middleware.config';

export type InferSdk<TName extends keyof UnifiedApiExtension['extendApiMethods']> = InferSdkMethodReturn<
  UnifiedApiExtension,
  TName
>;
