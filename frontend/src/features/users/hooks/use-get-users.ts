import { useQuery } from '@tanstack/vue-query';

import { usersService } from '@/features/users/services';

export function useGetUsers() {
	const { data: users, isLoading: isUsersLoading } = useQuery({
		queryKey: ['get-users'],
		queryFn: () => usersService.getAll(),
	});

	return { users, isUsersLoading };
}
