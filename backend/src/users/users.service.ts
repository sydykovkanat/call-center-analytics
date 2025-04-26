import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { UserRole } from '@prisma/__generated__';
import { hash } from 'argon2';
import { randomUUID } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		return this.prismaService.user.findMany();
	}

	async getById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new NotFoundException('Пользователь с таким id не найден');
		}

		return user;
	}

	async getByEmail(email: string) {
		return this.prismaService.user.findUnique({
			where: { email },
		});
	}

	async getByToken(token: string) {
		const user = await this.prismaService.user.findUnique({
			where: { token },
		});

		if (!user) {
			throw new NotFoundException('Неверный токен, пользователь не найден');
		}

		return user;
	}

	async create(dto: RegisterDto) {
		const existingUser = await this.getByEmail(dto.email);

		if (existingUser) {
			throw new BadRequestException(
				'Пользователь с таким email уже существует',
			);
		}

		const token = randomUUID();

		const hashedPassword = await hash(dto.password);

		return this.prismaService.user.create({
			data: {
				...dto,
				password: hashedPassword,
				token,
			},
		});
	}

	async updateUserToken(userId: string) {
		const user = await this.getById(userId);

		return this.prismaService.user.update({
			where: { id: user.id },
			data: { token: randomUUID() },
		});
	}

	async delete(userId: string) {
		const user = await this.getById(userId);

		return this.prismaService.user.delete({
			where: { id: user.id },
		});
	}

	async update(userId: string, dto: UpdateUserDto) {
		const user = await this.getById(userId);
		const existingUser = await this.getByEmail(dto.email);

		if (existingUser && existingUser.id !== user.id) {
			throw new BadRequestException(
				'Пользователь с таким email уже существует',
			);
		}

		return this.prismaService.user.update({
			where: { id: user.id },
			data: { ...dto },
		});
	}

	async createUser(dto: CreateUserDto) {
		const { email, role, displayName, password } = dto;

		const existingUser = await this.getByEmail(email);

		if (existingUser) {
			throw new BadRequestException(
				'Пользователь с таким email уже существует',
			);
		}

		const hashedPassword = await hash(password);
		const token = randomUUID();
		const parsedRole =
			role === 'ADMIN'
				? UserRole.ADMIN
				: role === 'MANAGER'
					? UserRole.MANAGER
					: role === 'OPERATOR'
						? UserRole.OPERATOR
						: UserRole.USER;

		return this.prismaService.user.create({
			data: {
				email,
				displayName,
				password: hashedPassword,
				token,
				role: parsedRole,
			},
		});
	}
}
