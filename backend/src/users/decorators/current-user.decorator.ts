import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/__generated__';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): User => {
		const request = ctx.switchToHttp().getRequest<Request & { user: User }>();
		return request.user;
	},
);
