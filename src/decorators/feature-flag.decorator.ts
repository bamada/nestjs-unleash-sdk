import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Context } from 'unleash-client';
import { FallbackFunction } from 'unleash-client/lib/helpers';
import { UNLEASH_FEAT_DECORATOR } from '../unleash.constants';
import { FeatureFlagGuard } from './feature-flag.guard';

export const IsFeatEnabled = (
  featureName: string,
  context?: Context,
  fallback?: boolean | FallbackFunction,
) => {
  return applyDecorators(
    SetMetadata(UNLEASH_FEAT_DECORATOR, {
      featureName,
      context,
      fallback,
    }),
    UseGuards(FeatureFlagGuard),
  );
};
