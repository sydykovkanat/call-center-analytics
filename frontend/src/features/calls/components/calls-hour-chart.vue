<template>
	<Card class="flex-1">
		<template #title> Распределение звонков по часам </template>

		<template #content>
			<Chart type="line" :data="lineChartData" :options="lineChartOptions" />
		</template>
	</Card>
</template>

<script setup>
import { computed, defineProps } from 'vue';

import { getCallsDistributionByHour } from '@/features/calls/lib/index.js';

const props = defineProps({
	calls: {
		type: Array,
		required: true,
	},
});

const lineChartData = computed(() => {
	if (!props.calls) return { labels: [], datasets: [] };

	const distribution = getCallsDistributionByHour(props.calls);

	return {
		labels: distribution.map((item) => `${item.hour}:00`),
		datasets: [
			{
				data: distribution.map((item) => item.count),
				backgroundColor: '#F0047F',
				borderColor: '#F0047F',
				fill: false,
			},
		],
	};
});

const lineChartOptions = {
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};
</script>
