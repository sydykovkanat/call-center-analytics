import { instance } from '@/shared/api/instance';

import { type IUser } from '@/features/users/types';

class UsersService {
	async getAll() {
		return (
			await instance<IUser[]>({
				method: 'GET',
				url: '/users',
			})
		).data;
	}

	async delete(id: string) {
		return (
			await instance<IUser>({
				method: 'DELETE',
				url: `/users/${id}`,
			})
		).data;
	}

	async create(data: IUserMutation) {
		return (
			await instance<IUser>({
				method: 'POST',
				url: '/users',
				data,
			})
		).data;
	}

	async edit(id: string, data: IUserMutation) {
		return (
			await instance<IUser>({
				method: 'PUT',
				url: `/users/${id}`,
				data,
			})
		).data;
	}
}

export const usersService = new UsersService();
