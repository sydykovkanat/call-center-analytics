import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { isAxiosError } from 'axios';
import { isArray } from 'chart.js/helpers';
import { useToast } from 'primevue';

import { usersService } from '@/features/users/services';

export function useDeleteUser() {
	const queryClient = useQueryClient();
	const { add } = useToast();

	const { mutate: deleteUser, isPending: isDeleteUserLoading } = useMutation({
		mutationKey: ['delete-user'],
		mutationFn: async (id: string) => usersService.delete(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['get-users'] });

			add({
				summary: 'Успешно',
				detail: 'Пользователь успешно удален',
				severity: 'success',
				life: 3000,
			});
		},
		onError: (err) => {
			if (isAxiosError(err) && err.response) {
				add({
					summary: 'Ошибка',
					detail: isArray(err.response.data.message)
						? err.response.data.message[0]
						: err.response.data.message,
					severity: 'error',
					life: 3000,
				});
			} else {
				add({
					summary: 'Ошибка',
					detail: 'Не удалось удалить пользователя',
					severity: 'error',
					life: 3000,
				});
			}
		},
	});

	return { deleteUser, isDeleteUserLoading };
}
