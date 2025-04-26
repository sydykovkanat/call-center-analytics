import type { ICall } from '@/features/calls/types';

export const getCallsStatusDistribution = (calls: ICall[]) => {
	const totalCalls = calls.length;
	const statusCounts = {
		completed: 0,
		missed: 0,
		rejected: 0,
	};

	calls.forEach((call) => {
		if (statusCounts.hasOwnProperty(call.status)) {
			statusCounts[call.status]++;
		}
	});

	return Object.entries(statusCounts).map(([status, count]) => ({
		status,
		count,
		percentage: totalCalls > 0 ? (count / totalCalls) * 100 : 0,
	}));
};
