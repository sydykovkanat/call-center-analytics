import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/__generated__';

import { CurrentUser } from '../users/decorators/current-user.decorator';
import { LoginDto } from '../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';

import { AuthService } from './auth.service';
import { TokenAuthGuard } from './guard/token-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	async login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}

	@UseGuards(TokenAuthGuard)
	@Post('logout')
	async logout(@CurrentUser() user: User) {
		return this.authService.logout(user.id);
	}
}
