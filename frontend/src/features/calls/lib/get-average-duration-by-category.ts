import { formatDuration } from '@/shared/lib/format-duration';

import type { ICall } from '@/features/calls/types';

export const getAverageDurationByCategory = (calls: ICall[]) => {
	const categories: {
		[key: string]: {
			totalDuration: number;
			count: number;
		};
	} = {};

	calls.forEach((call) => {
		if (call.status !== 'completed') return;

		if (!categories[call.category]) {
			categories[call.category] = {
				totalDuration: 0,
				count: 0,
			};
		}

		const startTime = new Date(call.start_time);
		const endTime = new Date(call.end_time);
		const durationInSeconds = (+endTime - +startTime) / 1000;

		categories[call.category].totalDuration += durationInSeconds;
		categories[call.category].count++;
	});

	return Object.entries(categories).map(([category, data]) => ({
		category,
		averageDuration: data.count > 0 ? data.totalDuration / data.count : 0,
		averageDurationFormatted: formatDuration(
			data.count > 0 ? data.totalDuration / data.count : 0,
		),
	}));
};
