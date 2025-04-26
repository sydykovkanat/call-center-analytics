import { User } from '@prisma/__generated__';
import 'express';

declare module 'express' {
	export interface Request {
		user?: User;
	}
}
