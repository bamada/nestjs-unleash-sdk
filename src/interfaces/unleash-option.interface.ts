import { UnleashConfig } from 'unleash-client';

export interface UnleashOptions extends UnleashConfig {
  /**
   * registers as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   *
   * @default true
   */
  global?: boolean;
}
