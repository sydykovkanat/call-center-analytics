import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	displayName: string;

	@IsEmail()
	@IsOptional()
	email: string;

	@IsOptional()
	@IsEnum(UserRole)
	role: UserRole;
}
