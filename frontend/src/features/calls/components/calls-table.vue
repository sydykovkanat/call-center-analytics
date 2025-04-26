<template>
	<p v-if="calls.length === 0" class="text-gray-400 text-center">
		Нет данных для отображения
	</p>

	<DataTable
		:value="calls"
		tableStyle="min-width: 50rem"
		v-if="calls.length > 0"
	>
		<Column field="id" header="ID" />

		<Column field="caller_number" header="Номер звонящего" />

		<Column field="start_time" header="Время начала">
			<template #body="{ data }">
				{{ format(data.start_time, 'dd.MM.yyyy hh:mm') }}
			</template>
		</Column>

		<Column field="duration" header="Длительность">
			<template #body="{ data }">
				{{ calculateDuration(data.start_time, data.end_time) }}
			</template>
		</Column>

		<Column v-if="displayStatus" field="status" header="Статус">
			<template #body="{ data }">
				<span
					:class="[
						'inline-flex px-2 py-1 text-xs font-medium rounded-full',
						data.status === 'completed'
							? 'bg-green-100 text-green-800'
							: data.status === 'missed'
								? 'bg-red-100 text-red-800'
								: 'bg-yellow-100 text-yellow-800',
					]"
				>
					{{ getStatusLabel(data.status) }}
				</span>
			</template>
		</Column>

		<Column v-if="displayCategory" field="quantity" header="Категория">
			<template #body="{ data }">
				<span
					:class="[
						'inline-flex px-2 py-1 text-xs font-medium rounded-full',
						data.category === 'billing'
							? 'bg-purple-100 text-purple-800'
							: data.category === 'technical'
								? 'bg-blue-100 text-blue-800'
								: 'bg-gray-100 text-gray-800',
					]"
				>
					{{ getCategoryLabel(data.category) }}
				</span>
			</template>
		</Column>

		<Column field="agent_id" header="Оператор" />
	</DataTable>
</template>

<script setup>
import { format } from 'date-fns';
import { defineProps } from 'vue';

import { getCategoryLabel } from '@/shared/constants/categories.constants';
import { getStatusLabel } from '@/shared/constants/status.constants';

import { calculateDuration } from '@/features/calls/lib';

const props = defineProps({
	calls: {
		type: Array,
		required: true,
	},
	displayStatus: {
		type: Boolean,
		default: true,
	},
	displayCategory: {
		type: Boolean,
		default: true,
	},
});
</script>
