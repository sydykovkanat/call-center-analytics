import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useToast } from 'primevue';

import { usersService } from '@/features/users/services/users.service';
import type { IUserMutation } from '@/features/users/types';

export function useEditUser() {
	const queryClient = useQueryClient();
	const { add } = useToast();

	const { mutate: editUser, isPending: isEditUserLoading } = useMutation({
		mutationKey: ['edit-user'],
		mutationFn: ({ userId, data }: { userId: string; data: IUserMutation }) =>
			usersService.edit(userId, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['get-users'] });

			add({
				summary: 'Успешно',
				detail: 'Пользователь успешно обновлён',
				severity: 'success',
				life: 3000,
			});
		},
	});

	return { editUser, isEditUserLoading };
}
