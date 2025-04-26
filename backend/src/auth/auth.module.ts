import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, PrismaService, UsersService],
})
export class AuthModule {}
