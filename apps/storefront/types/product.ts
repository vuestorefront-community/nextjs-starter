import { InferSdk } from '../sdk/types';

export type SfProductCatalogItem = InferSdk<'searchProducts'>['products'][number];
export type SfProduct = InferSdk<'getProductDetails'>['product'];