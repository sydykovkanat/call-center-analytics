import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';

import { Roles } from '../../users/decorators/roles.decorator';
import { RolesGuard } from '../../users/guard/roles.guard';
import { TokenAuthGuard } from '../guard/token-auth.guard';

export function Auth(...roles: UserRole[]) {
	return applyDecorators(
		UseGuards(TokenAuthGuard, RolesGuard),
		Roles(...roles),
	);
}
