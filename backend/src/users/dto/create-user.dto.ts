import { UserRole } from '@prisma/__generated__';
import { IsEmail, IsEnum, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	email: string;

	@MinLength(6, {
		message: 'Пароль должен содержать минимум 6 символов',
	})
	password: string;

	@MinLength(2, {
		message: 'Имя должно содержать минимум 2 символа',
	})
	displayName: string;

	@IsEnum(UserRole, {
		message: 'Роль должна быть ADMIN, MANAGER, OPERATOR или USER',
	})
	role: string;
}
