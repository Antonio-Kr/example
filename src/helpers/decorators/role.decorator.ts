import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { RolesGuard } from '../guards/roles.guard';

export const Role = role =>
  applyDecorators(UseGuards(RolesGuard), SetMetadata('role', role));
