import { defineStore } from 'pinia';
import { ref } from 'vue';

import { loginService } from '@/features/login/services';
import type { ILoginMutation } from '@/features/login/types';
import type { IUser } from '@/features/users/types';

export const useLoginStore = defineStore(
	'login',
	() => {
		const user = ref<IUser | null>(null);

		async function login(data: ILoginMutation) {
			try {
				user.value = await loginService.login(data);
			} catch (err) {
				user.value = null;
				throw err;
			}
		}

		function logout() {
			user.value = null;
		}

		return {
			user,
			login,
			logout,
		};
	},
	{
		persist: {
			storage: localStorage,
			pick: ['user'],
		},
	},
);
