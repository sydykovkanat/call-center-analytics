import { instance } from '@/shared/api/instance';

import type { ILoginMutation } from '@/features/login/types';
import type { IUser } from '@/features/users/types';

class LoginService {
	async login(data: ILoginMutation) {
		return (
			await instance<IUser>({
				url: '/auth/login',
				method: 'POST',
				data,
			})
		).data;
	}
}

export const loginService = new LoginService();
