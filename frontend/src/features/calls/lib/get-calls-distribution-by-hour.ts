import type { ICall } from '@/features/calls/types';

export const getCallsDistributionByHour = (calls: ICall[]) => {
	const hourlyDistribution = Array(24).fill(0);

	calls.forEach((call) => {
		const hour = new Date(call.start_time).getHours();
		hourlyDistribution[hour]++;
	});

	return hourlyDistribution.map((count, hour) => ({
		hour,
		count,
	}));
};
