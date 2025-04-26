<template>
	<Loader v-if="isCallsLoading" />

	<div class="space-y-6" v-if="calls">
		<CallsFilters />

		<div class="grid grid-cols-3 gap-4">
			<CallsInfoCard title="Всего звонков" :value="calls.length" />

			<CallsInfoCard
				title="Среднее время разговора"
				:value="formatDuration(calculateAverageCallDuration(calls))"
			/>

			<CallsInfoCard
				title="Пропущенные звонки"
				:value="calculateMissedCallPercentage(calls) + '%'"
			/>
		</div>

		<div class="flex gap-4">
			<CallsHourChart :calls="calls" />

			<CallsStatusChart :calls="calls" />
		</div>

		<CallsCategoryChart :calls="calls" />
	</div>
</template>

<script setup lang="ts">
import Loader from '@/shared/components/loader.vue';
import { formatDuration } from '@/shared/lib';

import CallsCategoryChart from '@/features/calls/components/calls-category-chart.vue';
import CallsFilters from '@/features/calls/components/calls-filters.vue';
import CallsHourChart from '@/features/calls/components/calls-hour-chart.vue';
import CallsInfoCard from '@/features/calls/components/calls-info-card.vue';
import CallsStatusChart from '@/features/calls/components/calls-status-chart.vue';
import { useGetCalls } from '@/features/calls/hooks';
import {
	calculateAverageCallDuration,
	calculateMissedCallPercentage,
} from '@/features/calls/lib';

const { calls, isCallsLoading } = useGetCalls();
</script>
