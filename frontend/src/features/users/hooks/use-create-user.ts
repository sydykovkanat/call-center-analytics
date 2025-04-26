import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { isAxiosError } from 'axios';
import { isArray } from 'chart.js/helpers';
import { useToast } from 'primevue';

import { usersService } from '@/features/users/services/users.service';
import type { IUserMutation } from '@/features/users/types';

export function useCreateUser() {
	const queryClient = useQueryClient();
	const { add } = useToast();

	const { mutate: createUser, isPending: isCreateUserLoading } = useMutation({
		mutationKey: ['create-user'],
		mutationFn: (data: IUserMutation) => usersService.create(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['get-users'] });

			add({
				summary: 'Успешно',
				detail: 'Пользователь успешно создан',
				severity: 'success',
				life: 3000,
			});
		},
		onError: (err) => {
			if (isAxiosError(err) && err.response) {
				const { data } = err.response;
				if (data) {
					add({
						summary: 'Ошибка',
						detail: isArray(data) ? data[0].message : data.message,
						severity: 'error',
						life: 3000,
					});
				}
			} else {
				add({
					summary: 'Ошибка',
					detail: 'Не удалось создать пользователя',
					severity: 'error',
					life: 3000,
				});
			}
		},
	});

	return { createUser, isCreateUserLoading };
}
