import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
	@IsEmail(undefined, {
		message: 'Некорректный email',
	})
	email: string;

	@MinLength(6, {
		message: 'Пароль должен содержать минимум 6 символов',
	})
	password: string;

	@MinLength(2, {
		message: 'Имя должно содержать минимум 2 символа',
	})
	displayName: string;
}
