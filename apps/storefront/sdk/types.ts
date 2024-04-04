import { UnifiedEndpoints } from 'middleware/types';

export type InferSdk<TName extends keyof UnifiedEndpoints> = Awaited<ReturnType<UnifiedEndpoints[TName]>>;

export type InferSdkArgs<TName extends keyof UnifiedEndpoints> = Parameters<UnifiedEndpoints[TName]>[0];