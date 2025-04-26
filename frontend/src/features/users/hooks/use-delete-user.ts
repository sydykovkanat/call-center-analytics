import { useMutation, useQueryClient } from '@tanstack/vue-query';
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
	});

	return { deleteUser, isDeleteUserLoading };
}
