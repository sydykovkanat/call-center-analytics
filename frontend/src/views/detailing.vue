<template>
	<Loader v-if="isCallsLoading" />

	<div class="space-y-6">
		<CallsFilters v-model:filters="filters" :agent-search="true" />

		<CallsTable
			:calls="filteredCalls"
			:display-category="filters.categories.length === 0"
			:display-status="filters.statuses.length === 0"
		/>
	</div>
</template>
<script setup lang="ts">
import { computed, type Ref, ref } from 'vue';

import Loader from '@/shared/components/loader.vue';

import CallsFilters from '@/features/calls/components/calls-filters.vue';
import CallsTable from '@/features/calls/components/calls-table.vue';
import { useGetCalls } from '@/features/calls/hooks';
import type { ICall, ICallsFilters } from '@/features/calls/types';

const { calls, isCallsLoading } = useGetCalls();

const filters: Ref<ICallsFilters> = ref({
	startDate: null,
	endDate: null,
	statuses: [],
	categories: [],
	agentId: '',
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
			const lowerCaseAgentId = filters.agentId.toLowerCase();

			if (!call.agent_id.toLowerCase().includes(lowerCaseAgentId)) {
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
