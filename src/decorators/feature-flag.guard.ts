import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Context } from 'unleash-client';
import { FallbackFunction } from 'unleash-client/lib/helpers';
import { UnleashService } from '../services';
import { UNLEASH_FEAT_DECORATOR } from '../unleash.constants';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  /**
   * Constructor method
   *
   * @param {Reflector} reflector Handle reflections
   */
  constructor(
    private readonly reflector: Reflector,
    private readonly unleashService: UnleashService,
  ) { }

  /**
   * Determine if a request is allow or not
   *
   * @param {ExecutionContext} context Represents the query execution context
   * @returns  { boolean | Promise<boolean> | Observable<boolean>}
   */
  canActivate(
    executionContext: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { featureName, context, fallback } = this.reflector.get<{
      featureName: string;
      context?: Context;
      fallback?: boolean | FallbackFunction;
    }>(UNLEASH_FEAT_DECORATOR, executionContext.getHandler());

    if (!this.unleashService.isEnabled(featureName, context, fallback)) {
      throw new NotFoundException();
    }

    return true;
  }
}
