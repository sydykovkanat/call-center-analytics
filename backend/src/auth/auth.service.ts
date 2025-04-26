import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'argon2';

import { LoginDto } from '../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.getByEmail(email);

		if (!user) {
			throw new BadRequestException('Пользователь с таким email не найден');
		}

		const passwordCorrect = await verify(user.password, password);

		if (!passwordCorrect) {
			throw new UnauthorizedException('Неверные учетные данные');
		}

		return user;
	}

	async register(dto: RegisterDto) {
		const existingUser = await this.usersService.getByEmail(dto.email);

		if (existingUser) {
			throw new BadRequestException(
				'Пользователь с таким email уже существует',
			);
		}

		return this.usersService.create(dto);
	}

	async login(dto: LoginDto) {
		const verifiedUser = await this.validateUser(dto.email, dto.password);

		if (!verifiedUser) {
			throw new Error('Неверный пароль');
		}

		return this.usersService.updateUserToken(verifiedUser.id);
	}

	async logout(userId: string) {
		await this.usersService.updateUserToken(userId);

		return { message: 'Вы вышли из системы' };
	}
}
