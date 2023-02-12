import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Unleash, UnleashEvents } from 'unleash-client';
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
}
