import { DynamicModule, Module } from '@nestjs/common';
import { initialize } from 'unleash-client';
import { UnleashOptions } from './interfaces/unleash-option.interface';
import { UnleashService } from './services/unleash.service';
import { UNLEASH_CLIENT, UNLEASH_OPTIONS } from './unleash.constants';

const unleashClientFactory = {
  provide: UNLEASH_CLIENT,
  useFactory: (options: Omit<UnleashOptions, 'global'>) => {
    const unleash = initialize(options);
    return unleash;
  },
  inject: [UNLEASH_OPTIONS],
};

@Module({})
export class UnleashModule {
  /**
   *
   * @param {UnleashOptions} options
   * @returns {DynamicModule}
   */
  static forRoot(options: UnleashOptions): DynamicModule {
    const { global, ...restOptions } = options;
    return {
      module: UnleashModule,
      global: global ?? true,
      providers: [
        UnleashService,
        unleashClientFactory,
        {
          provide: UNLEASH_OPTIONS,
          useValue: restOptions,
        },
      ],
      exports: [UnleashService],
    };
  }
}
