<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import { CATEGORIES } from '@/shared/constants/categories.constants.js';
import { STATUSES } from '@/shared/constants/status.constants.js';

const props = defineProps({
	filters: {
		type: Object,
		required: true,
	},
	resetFilters: {
		type: Function,
	},
});

const emit = defineEmits(['update:filters']);

function updateStartDateRange(dates: [Date, Date]) {
	emit('update:filters', {
		...props.filters,
		startDate: dates[0],
		endDate: dates[1],
	});
}

function updateStatuses(statusIds: string[]) {
	emit('update:filters', { ...props.filters, statuses: statusIds });
}

function updateCategories(categoryIds: string[]) {
	emit('update:filters', { ...props.filters, categories: categoryIds });
}
</script>

<template>
	<Card>
		<template #title> Фильтры </template>
		<template #content>
			<div class="grid grid-cols-4 gap-4">
				<DatePicker
					showIcon
					iconDisplay="input"
					selection-mode="range"
					placeholder="Выберите дату"
					@update:modelValue="updateStartDateRange"
				/>

				<Select
					:options="STATUSES"
					option-label="label"
					option-value="id"
					placeholder="Выберите статус"
					multiple
					@update:modelValue="updateStatuses"
				/>

				<Select
					:options="CATEGORIES"
					option-label="label"
					option-value="id"
					placeholder="Выберите категорию"
					multiple
					@update:modelValue="updateCategories"
				/>
			</div>
		</template>
	</Card>
</template>
