<template>
	<Card class="w-[520px]">
		<template #title> Распределение звонков по статусам </template>

		<template #content>
			<Chart type="pie" :data="statusChartData" :options="statusChartOptions" />
		</template>
	</Card>
</template>

<script setup>
import { computed, defineProps } from 'vue';

import { getCallsStatusDistribution } from '@/features/calls/lib/index.js';

const props = defineProps({
	calls: {
		type: Array,
		required: true,
	},
});

const statusChartData = computed(() => {
	if (!props.calls) return { labels: [], datasets: [] };

	const distribution = getCallsStatusDistribution(props.calls);

	return {
		labels: distribution.map((item) => {
			switch (item.status) {
				case 'completed':
					return 'Завершённые';
				case 'missed':
					return 'Пропущенные';
				case 'rejected':
					return 'Отклонённые';
				default:
					return item.status;
			}
		}),
		datasets: [
			{
				data: distribution.map((item) => item.percentage.toFixed(2)),
				backgroundColor: ['#db2777', '#f9a8d4', '#a3a3a3'],
				hoverOffset: 4,
			},
		],
	};
});

const statusChartOptions = {
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			callbacks: {
				label: function (context) {
					const label = context.label || '';
					const value = context.parsed || 0;
					return `${label}: ${value}%`;
				},
			},
		},
	},
};
</script>
