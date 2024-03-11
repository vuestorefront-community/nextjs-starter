import { InferSdk } from '../sdk/types';

export type SfCart = InferSdk<'getCart'>
export type SfCartLineItem = InferSdk<'getCart'>['lineItems'][0]