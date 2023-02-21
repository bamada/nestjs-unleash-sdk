import { Context } from 'unleash-client';
import { FallbackFunction } from 'unleash-client/lib/helpers';

export interface IOptions {
  useReq?: boolean;
  reqCallback: (req: any) => string;
  fallback?: boolean | FallbackFunction;
  context?: Context;
}
