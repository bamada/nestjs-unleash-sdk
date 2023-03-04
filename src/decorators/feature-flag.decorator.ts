import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { IOptions } from '../interfaces/metadata.interface';
import { UNLEASH_FEAT_DECORATOR } from '../unleash.constants';
import { FeatureFlagGuard } from './feature-flag.guard';

export const IsFeatEnabled = (featureName: string, options: IOptions) => {
  return applyDecorators(
    SetMetadata(UNLEASH_FEAT_DECORATOR, { featureName, options }),
    UseGuards(FeatureFlagGuard),
  );
};
