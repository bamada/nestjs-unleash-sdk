import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Unleash, UnleashEvents, Context } from 'unleash-client';
import { FallbackFunction } from 'unleash-client/lib/helpers';
import { UNLEASH_CLIENT } from '../unleash.constants';

@Injectable()
export class UnleashService implements OnModuleInit {
  logger = new Logger(UnleashService.name);

  constructor(
    @Inject(UNLEASH_CLIENT)
    private readonly unleashClient: Unleash,
  ) { }

  public get client() {
    return this.unleashClient;
  }

  onModuleInit() {
    Object.values(UnleashEvents).forEach((key) => {
      if (key === UnleashEvents.Error) {
        this.unleashClient.on(key, (error) => {
          this.logger.error(error);
        });
        return;
      }

      if (key === UnleashEvents.Warn) {
        this.unleashClient.on(key, (error) => {
          this.logger.warn(error);
        });
        return;
      }

      this.unleashClient.on(key, (payload) => {
        this.logger.debug(`${key} ${payload ? JSON.stringify(payload) : ''}`);
      });
    });
  }

  isEnabled(
    featureName: string,
    context?: Context,
    fallback?: boolean | FallbackFunction,
  ): boolean {
    if (fallback instanceof Function) {
      return this.unleashClient.isEnabled(featureName, context, fallback);
    }

    return this.unleashClient.isEnabled(featureName, context, fallback);
  }
}
