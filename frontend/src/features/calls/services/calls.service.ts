import { localInstance } from '@/shared/api/instance';

import type { ICall } from '@/features/calls/types';

class CallsService {
	async getAll() {
		return (
			await localInstance<ICall[]>({
				method: 'GET',
				url: '/mock_data.json',
			})
		).data;
	}
}

export const callsService = new CallsService();
