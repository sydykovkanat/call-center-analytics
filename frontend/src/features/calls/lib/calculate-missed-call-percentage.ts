import type { ICall } from '@/features/calls/types';

export const calculateMissedCallPercentage = (calls: ICall[]) => {
	const totalCalls = calls.length;

	if (totalCalls === 0) return 0;

	const missedCalls = calls.filter((call) => call.status === 'missed').length;
	return (missedCalls / totalCalls) * 100;
};
