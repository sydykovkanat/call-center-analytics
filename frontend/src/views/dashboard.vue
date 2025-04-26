<template>
	<Loader v-if="isCallsLoading" />

	<div class="space-y-6" v-if="filteredCalls">
		<CallsFilters v-model:filters="filters" />

		<div class="grid grid-cols-3 gap-4">
			<CallsInfoCard title="Всего звонков" :value="filteredCalls.length" />

			<CallsInfoCard
				title="Среднее время разговора"
				:value="formatDuration(calculateAverageCallDuration(filteredCalls))"
			/>

			<CallsInfoCard
				title="Пропущенные звонки"
				:value="calculateMissedCallPercentage(filteredCalls).toFixed() + '%'"
			/>
		</div>

		<div class="flex gap-4">
			<CallsHourChart :calls="filteredCalls" />

			<CallsStatusChart :calls="filteredCalls" />
		</div>

		<CallsCategoryChart :calls="filteredCalls" />
	</div>
</template>

<script setup lang="ts">
import { computed, type Ref, ref } from 'vue';

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
import type { ICall, ICallsFilters } from '@/features/calls/types';

const { calls, isCallsLoading } = useGetCalls();

const filters: Ref<ICallsFilters> = ref({
	startDate: null,
	endDate: null,
	statuses: [],
	categories: [],
});

function applyFilters(calls: ICall[], filters: ICallsFilters) {
	return calls.filter((call) => {
		if (filters.startDate && filters.endDate) {
			const callDate = new Date(call.start_time);
			if (callDate < filters.startDate || callDate > filters.endDate) {
				return false;
			}
		}

		if (filters.statuses.length > 0) {
			if (!filters.statuses.includes(call.status)) {
				return false;
			}
		}

		if (filters.categories.length > 0) {
			if (!filters.categories.includes(call.category)) {
				return false;
			}
		}

		if (filters.agentId) {
			if (call.agent_id !== filters.agentId) {
				return false;
			}
		}

		return true;
	});
}

const filteredCalls = computed(() => {
	if (!calls.value) return [];
	return applyFilters(calls.value, filters.value);
});
</script>
