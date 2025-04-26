import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/__generated__';

import { Auth } from '../auth/decorators/auth.decorator';
import { TokenAuthGuard } from '../auth/guard/token-auth.guard';

import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(TokenAuthGuard)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Auth()
	@Get()
	async getAll() {
		return this.usersService.getAll();
	}

	@Auth('ADMIN', 'MANAGER')
	@Get(':id')
	async getById(@Param('id') userId: string) {
		return this.usersService.getById(userId);
	}

	@Auth('ADMIN')
	@Delete(':id')
	async delete(@Param('id') userId: string, @CurrentUser() currentUser: User) {
		if (userId === currentUser.id) {
			throw new BadRequestException('Вы не можете удалить себя');
		}

		return this.usersService.delete(userId);
	}

	@Auth('ADMIN')
	@Put(':id')
	async update(@Param('id') userId: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(userId, dto);
	}

	@Post()
	async create(@Body() dto: CreateUserDto) {
		return this.usersService.createUser(dto);
	}
}
