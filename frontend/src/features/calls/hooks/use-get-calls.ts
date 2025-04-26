import { useQuery } from '@tanstack/vue-query';

import { callsService } from '@/features/calls/services';

export function useGetCalls() {
	const { data: calls, isPending: isCallsLoading } = useQuery({
		queryKey: ['get-calls'],
		queryFn: async () => await callsService.getAll(),
	});

	return { calls, isCallsLoading };
}
