import type { ICall } from '@/features/calls/types';

export const calculateAverageCallDuration = (calls: ICall[]) => {
	const completedCalls = calls.filter((call) => call.status === 'completed');

	if (completedCalls.length === 0) return 0;

	const totalDuration = completedCalls.reduce((sum, call) => {
		const startTime = new Date(call.start_time);
		const endTime = new Date(call.end_time);
		const durationInSeconds = (+endTime - +startTime) / 1000;
		return sum + durationInSeconds;
	}, 0);

	return totalDuration / completedCalls.length;
};
