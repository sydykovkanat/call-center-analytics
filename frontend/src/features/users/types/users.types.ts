export interface IUser {
	id: string;
	email: string;
	token: string;
	displayName: string;
	role: UserRole;
	createdAt: string;
	updatedAt: string;
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
	MANAGER = 'manager',
	OPERATOR = 'operator',
}

export interface IUserMutation {
	email: string;
	password: string;
	displayName: string;
	role: string;
}
