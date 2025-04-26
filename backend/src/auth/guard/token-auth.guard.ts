import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';

import { UsersService } from '../../users/users.service';

@Injectable()
export class TokenAuthGuard implements CanActivate {
	constructor(private readonly usersService: UsersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const headerValue = request.get('Authorization');

		if (!headerValue) {
			return false;
		}

		const [, token] = headerValue.split(' ');

		if (!token) {
			return false;
		}

		const user = await this.usersService.getByToken(token);

		if (!user) {
			return false;
		}

		request.user = user;

		return true;
	}
}
