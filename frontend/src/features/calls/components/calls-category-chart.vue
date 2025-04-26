<template>
	<Card>
		<template #title> Средняя длительность звонков по категориям </template>

		<template #content>
			<Chart type="bar" :data="barChartData" :options="barChartOptions" />
		</template>
	</Card>
</template>

<script setup>
import { computed, defineProps } from 'vue';

import { getAverageDurationByCategory } from '@/features/calls/lib/index.js';

const props = defineProps({
	calls: {
		type: Array,
		required: true,
	},
});

const barChartData = computed(() => {
	if (!props.calls) return { labels: [], datasets: [] };

	const distribution = getAverageDurationByCategory(props.calls);

	return {
		labels: distribution.map((item) => item.category),
		datasets: [
			{
				label: 'Средняя длительность (мин)',
				data: distribution.map((item) =>
					parseFloat(
						item.averageDurationFormatted.replace(' мин', '').replace(',', '.'),
					),
				),
				backgroundColor: '#F0047F',
			},
		],
	};
});

const barChartOptions = {
	indexAxis: 'x',
	scales: {
		x: {
			beginAtZero: true,
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: {
				text: 'Среднее время по категориям',
			},
		},
	},
};
</script>
