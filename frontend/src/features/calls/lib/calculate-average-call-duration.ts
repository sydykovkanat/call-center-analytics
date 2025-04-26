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

export const calculateDuration = (startTime: string, endTime: string) => {
	const start = new Date(startTime);
	const end = new Date(endTime);

	if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
		return '';
	}

	const durationMs = end.getTime() - start.getTime();
	const minutes = Math.floor(durationMs / 60000);
	const seconds = Math.floor((durationMs % 60000) / 1000);

	return `${minutes} мин ${seconds} сек`;
};
