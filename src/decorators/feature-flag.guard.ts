import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IOptions } from '../interfaces/metadata.interface';
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
    const { featureName, options } = this.reflector.get<{
      featureName: string;
      options: IOptions;
    }>(UNLEASH_FEAT_DECORATOR, executionContext.getHandler());

    if (options.useReq) {
      const request = executionContext.switchToHttp().getRequest();
      if (options.reqCallback) {
        options.context.userId = options.reqCallback(request);
      } else {
        options.context.userId = request.user.id;
      }
    }

    if (
      !this.unleashService.isEnabled(
        featureName,
        options.context,
        options.fallback,
      )
    ) {
      throw new NotFoundException();
    }

    return true;
  }
}
